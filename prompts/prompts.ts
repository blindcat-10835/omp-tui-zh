/**
 * Prompt override 资源桶（barrel）。
 *
 * 将本插件的简体中文 prompt 翻译打包为 `transform` override 数组,供
 * `../index.ts` 唯一入口静态导入后调用 `pi.registerPromptOverrides`。
 *
 * 机制:上游英文模板按"空行分块"拆分,每块以规范化后的 EN 内容为键,
 * 在 `translations.json` 中查找中文译文。命中则整块替换为中文;未命中
 * (上游新增/重写的块)则原样保留英文——绝不静默错译,漂移块由
 * `scripts/sync-check.ts` 检出并报告。
 *
 * 翻译映射 `./translations.json` 由 `scripts/sync-check.ts build` 从
 * (上游英文基线, 随插件冻结的中文模板 `prompts/*.md`) 生成,已提交入库。
 * `prompts/*.md` 保留为人类可读的冻结参考副本,运行时不再直接加载。
 *
 * 覆盖的 prompt id(与宿主 `resolvePromptSource` 调用点一一对应):
 *   - `system`                  src/prompts/system/system-prompt.md
 *   - `subagent.system`         src/prompts/system/subagent-system-prompt.md
 *   - `subagent.yieldReminder`  src/prompts/system/subagent-yield-reminder.md
 *   - `subagent.asyncPending`   src/prompts/system/subagent-async-pending.md
 *   - `agent.task`              src/prompts/agents/task.md
 *   - `agent.scout`             src/prompts/agents/scout.md
 *   - `agent.reviewer`         src/prompts/agents/reviewer.md
 *   - `agent.security-reviewer` src/prompts/agents/security-reviewer.md
 *   - `agent.sonic`             与 `agent.task` 共用映射(额外覆盖,见 index.ts)
 */

import { buildBlockMaps, mergeTemplateWithMap, type TranslationEntries } from "../src/prompt-map";
import translationsJson from "../src/translations.json" with { type: "json" };

const translations = translationsJson as unknown as TranslationEntries;

/** 单个 prompt override(结构上满足宿主 `PromptOverride`)。 */
export interface ZhPromptOverride {
	readonly id: string;
	readonly transform?: (source: string) => string;
}

/** 已编译的 id -> 块级翻译映射。 */
const maps: Record<string, ReadonlyMap<string, string>> = buildBlockMaps(translations);

/**
 * 本插件注册的 prompt override 列表。全部使用 `transform`:
 * 接收上游英文模板,按块查 `translations.json` 映射,命中块替换为中文,
 * 未命中块保留英文,再交由宿主 `prompt.render` 走 Handlebars + 后处理。
 */
export const promptOverrides: ZhPromptOverride[] = [
	{ id: "system", transform: (s) => mergeTemplateWithMap(s, maps["system"]) },
	{ id: "subagent.system", transform: (s) => mergeTemplateWithMap(s, maps["subagent.system"]) },
	{ id: "subagent.yieldReminder", transform: (s) => mergeTemplateWithMap(s, maps["subagent.yieldReminder"]) },
	{ id: "subagent.asyncPending", transform: (s) => mergeTemplateWithMap(s, maps["subagent.asyncPending"]) },
	{ id: "agent.task", transform: (s) => mergeTemplateWithMap(s, maps["agent.task"]) },
	{ id: "agent.sonic", transform: (s) => mergeTemplateWithMap(s, maps["agent.task"]) },
	{ id: "agent.scout", transform: (s) => mergeTemplateWithMap(s, maps["agent.scout"]) },
	{ id: "agent.reviewer", transform: (s) => mergeTemplateWithMap(s, maps["agent.reviewer"]) },
	{ id: "agent.security-reviewer", transform: (s) => mergeTemplateWithMap(s, maps["agent.security-reviewer"]) },
];
