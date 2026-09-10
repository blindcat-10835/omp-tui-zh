/**
 * Prompt override 资源桶（barrel）。
 *
 * 将本插件自带的简体中文 prompt 模板打包为 `full` override 数组，供
 * `../index.ts` 唯一入口静态导入后调用 `pi.registerPromptOverrides`。
 *
 * 模板以 `import ... with { type: "text" }` 在顶层内联（Bun 原生文本导入，
 * 与主包 `agents.ts` 内嵌 `src/prompts/*.md` 完全同一机制），不引入任何
 * 运行时 readFile。每个 `.md` 文件都是 `src/prompts/` 对应已提交中文模板的
 * 字节级副本，保留全部 Handlebars 变量、XML 标签、代码块与动态占位符——
 * 因此注册后 `resolvePromptSource` 返回的就是这套已验证的中文内容。
 *
 * 本目录不含 `package.json`/`index.ts`，不会被 extension loader 扫描为顶层
 * 入口；只由 `../index.ts` 间接加载。
 *
 * 覆盖的 prompt id（与宿主 `resolvePromptSource` 调用点一一对应）：
 *   - `system`                  src/prompts/system/system-prompt.md
 *   - `subagent.system`         src/prompts/system/subagent-system-prompt.md
 *   - `subagent.yieldReminder`  src/prompts/system/subagent-yield-reminder.md
 *   - `subagent.asyncPending`   src/prompts/system/subagent-async-pending.md
 *   - `agent.task`              src/prompts/agents/task.md
 *   - `agent.scout`             src/prompts/agents/scout.md
 *   - `agent.reviewer`         src/prompts/agents/reviewer.md
 *   - `agent.security-reviewer` src/prompts/agents/security-reviewer.md
 *   - `agent.sonic`             与 `agent.task` 共用 task.md（额外覆盖，见 index.ts）
 */

import systemPrompt from "./system-prompt.md" with { type: "text" };
import subagentSystemPrompt from "./subagent-system-prompt.md" with { type: "text" };
import subagentYieldReminder from "./subagent-yield-reminder.md" with { type: "text" };
import subagentAsyncPending from "./subagent-async-pending.md" with { type: "text" };
import agentTask from "./agent-task.md" with { type: "text" };
import agentScout from "./agent-scout.md" with { type: "text" };
import agentReviewer from "./agent-reviewer.md" with { type: "text" };
import agentSecurityReviewer from "./agent-security-reviewer.md" with { type: "text" };

/** 单个 prompt override（结构上满足宿主 `PromptOverride`）。 */
export interface ZhPromptOverride {
	readonly id: string;
	readonly full: string;
}

/**
 * 本插件注册的 prompt override 列表。均为 `full`（完整替换模板）：
 * 在 `resolvePromptSource` 命中后逐字返回，再由 `prompt.render` 走
 * Handlebars + 后处理，保留所有变量与动态占位符。
 */
export const promptOverrides: ZhPromptOverride[] = [
	{ id: "system", full: systemPrompt },
	{ id: "subagent.system", full: subagentSystemPrompt },
	{ id: "subagent.yieldReminder", full: subagentYieldReminder },
	{ id: "subagent.asyncPending", full: subagentAsyncPending },
	{ id: "agent.task", full: agentTask },
	{ id: "agent.sonic", full: agentTask },
	{ id: "agent.scout", full: agentScout },
	{ id: "agent.reviewer", full: agentReviewer },
	{ id: "agent.security-reviewer", full: agentSecurityReviewer },
];
