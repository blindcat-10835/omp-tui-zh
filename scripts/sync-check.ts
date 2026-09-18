/**
 * Prompt 翻译同步/漂移检查。
 *
 * 两种模式:
 *
 *   bun scripts/sync-check.ts check [--en-dir <upstream prompts dir>]
 *     用 `src/translations.json` 逐块检查当前上游英文模板的覆盖情况。
 *     每个未命中的块(上游新增/重写)都带行号与上下文报出,即"漂移报告"。
 *     无漂移 exit 0,有漂移 exit 1。`--en-dir` 默认解析到主仓库
 *     `omp-source/packages/coding-agent/src/prompts`。
 *
 *   bun scripts/sync-check.ts build --en-dir <EN 基线快照 dir>
 *     从 (EN 基线, `prompts/*.md` 冻结中文) 重建 `src/translations.json`。
 *     断言两侧块数一致、Handlebars 结构对齐;失败即中止。
 *     EN 基线可用任意历史快照(如 `git show <tag>:packages/coding-agent/src/prompts/...`)。
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { blockKey, splitBlocks } from "../src/prompt-map";
import type { TranslationEntries } from "../src/prompt-map";

/** id -> [上游 EN 模板相对路径, 插件冻结 ZH 模板相对路径(仓库根)]. */
const IDS: Array<[id: string, enRel: string, zhRel: string]> = [
	["system", "system/system-prompt.md", "prompts/system-prompt.md"],
	["subagent.system", "system/subagent-system-prompt.md", "prompts/subagent-system-prompt.md"],
	["subagent.yieldReminder", "system/subagent-yield-reminder.md", "prompts/subagent-yield-reminder.md"],
	["subagent.asyncPending", "system/subagent-async-pending.md", "prompts/subagent-async-pending.md"],
	["agent.task", "agents/task.md", "prompts/agent-task.md"],
	["agent.scout", "agents/scout.md", "prompts/agent-scout.md"],
	["agent.reviewer", "agents/reviewer.md", "prompts/agent-reviewer.md"],
	["agent.security-reviewer", "agents/security-reviewer.md", "prompts/agent-security-reviewer.md"],
	["workflow-notice", "system/workflow-notice.md", "prompts/workflow-notice.md"],
	["plan-mode-compact-instructions", "system/plan-mode-compact-instructions.md", "prompts/plan-mode-compact-instructions.md"],
	["plan-mode-reference", "system/plan-mode-reference.md", "prompts/plan-mode-reference.md"],
];

const ROOT = path.resolve(import.meta.dir, "..");
const TRANSLATIONS = path.join(ROOT, "src", "translations.json");

function readText(p: string): string {
	return fs.readFileSync(p, "utf8");
}

/** 每块在源文本中的起始行号(1-indexed),与 splitBlocks 同一遍历。 */
function blockLineStarts(text: string): number[] {
	const starts: number[] = [];
	let cur: string[] = [];
	let line = 1;
	let started = false;
	for (const l of text.split("\n")) {
		if (l.trim()) {
			if (cur.length === 0 && started) starts.push(line);
			cur.push(l);
			started = true;
		} else {
			if (cur.length > 0) cur = [];
		}
		line++;
	}
	return starts;
}

function hbsSig(lines: string[]): string {
	return lines
		.map((l) => (l.match(/\{\{#\w+|\{\{\/\w+|\{\{else(\s+if)?\}\}/g) ?? []).join("|"))
		.filter(Boolean)
		.join(",");
}

/** 漂移检查。 */
function check(enDir: string): number {
	const translations: TranslationEntries = JSON.parse(readText(TRANSLATIONS));
	let drift = 0;
	const report: string[] = [];
	for (const [id, enRel] of IDS) {
		const en = readText(path.join(enDir, enRel));
		const map = new Map<string, string>();
		for (const [k, v] of translations[id] ?? []) map.set(k, v.join("\n"));
		const blocks = splitBlocks(en);
		const starts = blockLineStarts(en);
		const counts = new Map<string, number>();
		for (const b of blocks) {
			const k = blockKey(b.lines);
			counts.set(k, (counts.get(k) ?? 0) + 1);
		}
		const seen = new Map<string, number>();
		blocks.forEach((b, i) => {
			const k = blockKey(b.lines);
			const n = (seen.get(k) ?? 0) + 1;
			seen.set(k, n);
			const lookup = (counts.get(k) ?? 0) > 1 ? `${k}#${n}` : k;
			if (map.has(lookup)) return;
			drift++;
			const start = starts[i] ?? 0;
			report.push(`### ${id} — EN 第 ${start} 行起(块 #${i + 1}/${blocks.length})\n\n\`\`\`\n${b.lines.join("\n")}\n\`\`\``);
		});
	}
	console.log(drift === 0 ? "OK: 所有块均已翻译,无漂移。" : `DRIFT: ${drift} 个块未覆盖(上游已变更):`);
	for (const r of report) {
		console.log(r);
		console.log("");
	}
	if (drift > 0) {
		console.log("处理:翻译上述块后更新 `src/translations.json`(键=规范化 EN 块,值=中文行数组),");
		console.log("或把 ZH 冻结文件 `prompts/*.md` 更新后重跑 `bun scripts/sync-check.ts build`。");
	}
	return drift === 0 ? 0 : 1;
}

/** 重建 translations.json。 */
function build(enDir: string): void {
	const entries: TranslationEntries = {};
	for (const [id, enRel, zhRel] of IDS) {
		const enText = readText(path.join(enDir, enRel));
		const zhText = readText(path.join(ROOT, zhRel));
		const enBlocks = splitBlocks(enText);
		const zhBlocks = splitBlocks(zhText);
		if (enBlocks.length !== zhBlocks.length) {
			throw new Error(`${id}: 块数不一致 EN=${enBlocks.length} ZH=${zhBlocks.length}(需先对齐 ZH 冻结文件)`);
		}
		const counts = new Map<string, number>();
		for (const b of enBlocks) {
			const k = blockKey(b.lines);
			counts.set(k, (counts.get(k) ?? 0) + 1);
		}
		const seen = new Map<string, number>();
		const rows: Array<[string, string[]]> = [];
		enBlocks.forEach((enB, i) => {
			const zhB = zhBlocks[i];
			const sigE = hbsSig(enB.lines);
			const sigZ = hbsSig(zhB.lines);
			if (sigE !== sigZ) {
				throw new Error(`${id}: 块 ${i + 1} Handlebars 结构不一致\n  EN: ${sigE}\n  ZH: ${sigZ}`);
			}
			const k = blockKey(enB.lines);
			const n = (seen.get(k) ?? 0) + 1;
			rows.push([(counts.get(k) ?? 0) > 1 ? `${k}#${n}` : k, zhB.lines]);
		});
		entries[id] = rows;
	}
	fs.mkdirSync(path.dirname(TRANSLATIONS), { recursive: true });
	fs.writeFileSync(TRANSLATIONS, JSON.stringify(entries, null, 1) + "\n");
	console.log(`已重建 ${path.relative(ROOT, TRANSLATIONS)}(${IDS.length} 个 id,${Object.values(entries).reduce((a, v) => a + v.length, 0)} 块)`);
}

// --- CLI ---
const argv = process.argv.slice(2);
const mode = argv[0] === "build" ? "build" : "check";
let enDir: string | undefined;
const i = argv.indexOf("--en-dir");
if (i !== -1 && argv[i + 1]) enDir = path.resolve(argv[i + 1]);
if (!enDir) enDir = path.resolve(ROOT, "../omp-source/packages/coding-agent/src/prompts");
if (!fs.existsSync(enDir)) {
	console.error(`--en-dir 不存在: ${enDir}(用 --en-dir 指向上游 src/prompts 目录)`);
	process.exit(2);
}
if (mode === "build") build(enDir);
else process.exit(check(enDir));
