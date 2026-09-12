/**
 * 块级 prompt 翻译合并。
 *
 * 上游英文模板按"空行分块"拆分,每块以规范化(trimmed + 压缩空白)后的 EN
 * 内容为键,在 translations.json 编译的映射中查找中文译文:
 *   - 命中 → 整块替换为中文;
 *   - 未命中(上游新增/重写的块)→ 原样保留英文。
 * 因此上游新增内容自动保留(英文兜底),重写的旧内容不会错译(旧块键
 * 失效后原样保留),漂移块由 `scripts/sync-check.ts` 检出并报告。
 *
 * 结构保持:合并结果与上游模板共享完全相同的块布局与空行分隔——块内
 * 内容被整块替换,块数、空行、文件尾部换行状态均以上游模板为准。
 */

/** translations.json 的条目形状:`id -> [[enKey, zhLines], ...]`。 */
export type TranslationEntries = Record<string, Array<[string, string[]]>>;

/**
 * 把 block 行数组规范化为映射键:逐行 trim + 压缩连续空白,再按行连接。
 * 与构建映射(`scripts/sync-check.ts build`)使用同一算法。
 */
export function blockKey(lines: string[]): string {
	return lines.map((l) => l.trim().replace(/\s+/g, " ")).join("\n");
}

/**
 * 把模板文本拆分为块。返回每块的原始行与前置空行数(首个块的前置空行
 * 不参与重建)。空行分隔的结构被完整记录,以便原样重建。
 */
export function splitBlocks(text: string): Array<{ lines: string[]; sepBefore: number }> {
	const out: Array<{ lines: string[]; sepBefore: number }> = [];
	let cur: string[] = [];
	let sep = 0;
	let started = false;
	for (const line of text.split("\n")) {
		if (line.trim()) {
			if (cur.length === 0 && out.length > 0) {
				// previous block already closed; sep counted so far applies
			}
			cur.push(line);
			started = true;
		} else {
			if (started && cur.length > 0) {
				out.push({ lines: cur, sepBefore: sep });
				cur = [];
				sep = 1;
			} else if (started) {
				sep += 1;
			}
		}
	}
	if (cur.length > 0) out.push({ lines: cur, sepBefore: sep });
	return out;
}

/**
 * 从 translations.json 条目编译每 id 的键 -> 中文块文本映射。
 * 重复键(同键多次出现)在构建时已带 `#N` 后缀,直接入库。
 */
export function buildBlockMaps(entries: TranslationEntries): Record<string, ReadonlyMap<string, string>> {
	const maps: Record<string, Map<string, string>> = {};
	for (const [id, rows] of Object.entries(entries)) {
		const map = new Map<string, string>();
		for (const [key, zhLines] of rows) {
			map.set(key, zhLines.join("\n"));
		}
		maps[id] = map;
	}
	return maps;
}

/**
 * 用块级映射合并上游英文模板,返回中文合并结果。
 * 未命中的块保留英文原文(上游新内容兜底)。
 */
export function mergeTemplateWithMap(source: string, map: ReadonlyMap<string, string>): string {
	const blocks = splitBlocks(source);
	// 统计每键出现次数,用于重复键的 `#N` 后缀查找
	const counts = new Map<string, number>();
	for (const b of blocks) {
		const k = blockKey(b.lines);
		counts.set(k, (counts.get(k) ?? 0) + 1);
	}
	const seen = new Map<string, number>();
	const segs: string[] = [];
	blocks.forEach((b, i) => {
		const k = blockKey(b.lines);
		const n = (seen.get(k) ?? 0) + 1;
		seen.set(k, n);
		const lookup = (counts.get(k) ?? 0) > 1 ? `${k}#${n}` : k;
		const zh = map.get(lookup);
		const body = zh ?? b.lines.join("\n");
		const prefix = i > 0 ? "\n".repeat(b.sepBefore + 1) : "";
		segs.push(prefix + body);
	});
	let result = segs.join("");
	// 尾换行状态以上游模板为准
	if (source.endsWith("\n") && !result.endsWith("\n")) result += "\n";
	else if (!source.endsWith("\n")) result = result.replace(/\n+$/, "").replace(/\n$/, "");
	return result;
}
