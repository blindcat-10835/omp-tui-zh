/**
 * TUI 简体中文汉化插件 (Chinese Localization Plugin)
 *
 * 使用 `registerUiStrings` 将 TUI 界面文案替换为简体中文。
 * 标签页 / 面板 chrome / 插件面板 / 服务限制面板文案在本文件定义；
 * 各标签页的 group / setting 映射拆分到 strings-*.ts 模块，
 * 在此静态导入并以对象展开合并。与 module 重复的 chrome key 不保留
 * （禁止隐式覆盖，完整映射以 module 为准）。
 *
 * 键格式（与宿主 resolveUiString 一致）：
 *   tab.<tab>                    标签页标题
 *   group.<tab>.<group>          区块标题
 *   setting.<path>.label         设置项标题
 *   setting.<path>.description   设置项说明
 *   settings.* / plugins.* / providers.*  面板 chrome
 *
 * 使用方法：`omp plugin install github:<user>/tui-zh`，或复制到此用户目录 `~/.omp/agent/extensions/tui-zh/`，或通过 `--extension` 加载。
 */

import type { ExtensionAPI } from "@oh-my-pi/pi-coding-agent";
import appearanceStrings from "./strings/strings-appearance";
import modelStrings from "./strings/strings-model";
import interactionStrings from "./strings/strings-interaction";
import contextStrings from "./strings/strings-context";
import memoryStrings from "./strings/strings-memory";
import filesStrings from "./strings/strings-files";
import shellStrings from "./strings/strings-shell";
import toolsStrings from "./strings/strings-tools";
import tasksProvidersStrings from "./strings/strings-tasks-providers";
import commandsStrings from "./strings/strings-commands";
import { promptOverrides } from "./prompts/prompts";

// 标签页 / chrome / 插件 / 服务限制面板文案
const chromeStrings: Record<string, string> = {
	"tab.appearance": "外观",
	"tab.model": "模型",
	"tab.files": "文件",
	"tab.shell": "Shell",
	"tab.tools": "工具",
	"tab.tasks": "任务",
	"tab.providers": "服务",
	"tab.plugins": "插件",
	"settings.title": "设置",
	"settings.searchPlaceholder": "搜索设置...",
	"settings.search.noResults": "未找到匹配的设置",
	"settings.match.one": "1 个匹配",
	"settings.match.many": "个匹配",
	"settings.hint.search": "Enter 修改 · Tab 跳转标签 · Esc 退出搜索",
	"settings.hint.plugins": "Tab 切换标签 · Esc 关闭",
	"settings.hint.sections": "↑/↓ 跳转区块 · Tab/Enter 设置 · ←/→ 切换标签 · Esc 关闭",
	"settings.hint.jumpSection": "Tab 跳转区块 · ←/→ 切换标签",
	"settings.hint.switchTab": "Tab 切换标签",
	"settings.hint.change": "Enter/Space 修改",
	"settings.hint.typeSearch": "输入搜索",
	"settings.hint.escClose": "Esc 关闭",
	"settings.preview": "预览:",
	"plugins.enabled": "已启用",
	"plugins.enabled.description": "启用或禁用此插件",
	"plugins.enabled.description.marketplace": "启用或禁用此插件市场插件",
	"plugins.enabled.marketplace": "启用或禁用此插件市场插件",
	"plugins.footer.configure": "Enter 配置 · Esc 返回",
	"plugins.footer.edit": "Enter 编辑 · Esc 返回",
	"plugins.footer.save": "Enter 保存 · Esc 取消",
	"plugins.footer.select": "Enter 选择 · Esc 取消",
	"plugins.shadowed": "已遮蔽",
	"plugins.unknown": "（未知）",
	"providers.maxInFlightRequests.title": "最大并发请求数",
	"providers.maxInFlightRequests.description": "选择服务，输入正整数限制并发 LLM 请求数，或清空以取消限制。",
	"providers.maxInFlightRequests.unlimited": "无限制",
	"providers.maxInFlightRequests.clearAll": "清除所有限制",
	"providers.maxInFlightRequests.clearAllDescription": "使所有服务无限制",
	"providers.maxInFlightRequests.footer": "Enter 编辑服务 · Esc 返回",
	"providers.maxInFlightRequests.editor": "最大并发请求数: [provider]",
	"providers.maxInFlightRequests.editorHelp": "输入正整数，小数向下取整。清空字段以取消限制。",
};

type PromptOverrideRegistration = {
	overrides: Array<{
		id: string;
		full?: string;
		transform?: (source: string) => string;
	}>;
};

// Older release hosts expose registerUiStrings but not registerPromptOverrides.
// Keep this view structural so the plugin type-checks against either API shape.
type PromptOverrideHost = {
	registerPromptOverrides?: (registration: PromptOverrideRegistration) => void;
};

export default function (pi: ExtensionAPI): void {
	pi.registerUiStrings({
		strings: {
			...chromeStrings,
			...appearanceStrings, // appearance
			...modelStrings, // model
			...interactionStrings, // interaction
			...contextStrings, // context
			...memoryStrings, // memory
			...filesStrings, // files
			...shellStrings, // shell
			...toolsStrings, // tools
			...tasksProvidersStrings, // tasks-providers
			...commandsStrings, // 命令
		},
	});
	// prompt 模板汉化:用 `transform` override 对宿主内置英文模板做块级中文合并
	// (命中 translations.json 的块替换为中文,未命中块保留英文)。index.ts 仍是唯一顶层
	// 入口,映射由 ./prompts/prompts 静态导入。
	const promptHost = pi as ExtensionAPI & PromptOverrideHost;
	if (typeof promptHost.registerPromptOverrides === "function") {
		promptHost.registerPromptOverrides({ overrides: promptOverrides });
	}
}
