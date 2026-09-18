/**
 * 自测(无测试框架,直接 bun 运行):
 *   bun scripts/selftest.ts
 *
 * 守护两个可观察契约:
 *   1. 运行时合并器对上游 EN 模板保持块结构(行数、块数、空行),
 *      且已翻译 id 产出中文;
 *   2. 漂移兜底: 上游重写/新增的块在合并输出中原样保留英文,
 *      未改写的块仍被翻译——不静默错译、不丢失上游新内容。
 * 逐字节复现性(合并结果 == 冻结 ZH)由 sync-check.ts 在 build 期断言。
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { buildBlockMaps, mergeTemplateWithMap } from "../src/prompt-map";
import type { TranslationEntries } from "../src/prompt-map";
import translationsJson from "../src/translations.json" with { type: "json" };

const ROOT = path.resolve(import.meta.dir, "..");
const translations = translationsJson as unknown as TranslationEntries;
const maps = buildBlockMaps(translations);

const enDir = path.resolve(ROOT, "../omp-source/packages/coding-agent/src/prompts");
const EN_FILES: Record<string, string> = {
	system: `${enDir}/system/system-prompt.md`,
	"subagent.system": `${enDir}/system/subagent-system-prompt.md`,
	"subagent.yieldReminder": `${enDir}/system/subagent-yield-reminder.md`,
	"subagent.asyncPending": `${enDir}/system/subagent-async-pending.md`,
	"agent.task": `${enDir}/agents/task.md`,
	"agent.sonic": `${enDir}/agents/task.md`,
	"agent.scout": `${enDir}/agents/scout.md`,
	"agent.reviewer": `${enDir}/agents/reviewer.md`,
	"agent.security-reviewer": `${enDir}/agents/security-reviewer.md`,
	"workflow-notice": `${enDir}/system/workflow-notice.md`,
	"plan-mode-compact-instructions": `${enDir}/system/plan-mode-compact-instructions.md`,
	"plan-mode-reference": `${enDir}/system/plan-mode-reference.md`,
};

let failed = 0;
const check = (name: string, ok: boolean, detail = ""): void => {
	console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? ` — ${detail}` : ""}`);
	if (!ok) failed++;
};

// 1. 结构保持 + 产出中文
for (const [id, f] of Object.entries(EN_FILES)) {
	if (!fs.existsSync(f)) {
		console.log(`SKIP  ${id} — ${f} 不存在(离线环境)`);
		continue;
	}
	const en = fs.readFileSync(f, "utf8");
	const out = mergeTemplateWithMap(en, maps[id === "agent.sonic" ? "agent.task" : id]);
	const sameLines = en.split("\n").length === out.split("\n").length;
	const sameBlocks = en.split(/\n\s*\n/).length === out.split(/\n\s*\n/).length;
	const zhPresent = /[一-鿿]/.test(out);
	check(`${id} 结构保持`, sameLines && sameBlocks, `lines=${en.split("\n").length}`);
	check(`${id} 产出中文`, zhPresent);
}

// 2. 漂移兜底
const taskEn = EN_FILES["agent.task"];
if (fs.existsSync(taskEn)) {
	const en = fs.readFileSync(taskEn, "utf8");
	const rewritten = en.replace("Worker agent: delegated tasks.", "Worker agent: completely new upstream wording.");
	const mutated = rewritten + "\n\nBrand new upstream section.\n";
	const out = mergeTemplateWithMap(mutated, maps["agent.task"]);
	check("漂移: 重写块保留英文", out.includes("Worker agent: completely new upstream wording."));
	check("漂移: 新增块保留英文", out.includes("Brand new upstream section."));
	check("漂移: 未改写块仍翻译", /[一-鿿]/.test(out));
} else {
	console.log("SKIP  drift fallback — agent.task EN 基线不存在");
}

// 3. 空映射恒等(未注册内容不被改写)
check("空映射恒等", mergeTemplateWithMap("Hello.\n\nWorld.", new Map()) === "Hello.\n\nWorld.");

console.log(failed === 0 ? "SELFTEST-OK" : `SELFTEST-FAIL (${failed})`);
process.exit(failed === 0 ? 0 : 1);
