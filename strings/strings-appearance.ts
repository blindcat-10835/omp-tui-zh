/**
 * TUI 简体中文映射：外观 (Appearance) 标签页
 *
 * 键格式：
 *   - `group.<tab>.<group>`  区块标题
 *   - `setting.<path>.label`       设置行标题
 *   - `setting.<path>.description` 设置行描述
 *
 * 中文优先复用旧版参考，新项补译。不修改宿主 schema。
 */

const strings: Record<string, string> = {
	// ═══════════════════════════════════════════════════════════
	// ── 区块标题 ──
	"group.appearance.Theme": "主题",
	"group.appearance.Composer": "布局",
	"group.appearance.Status Line": "状态行",
	"group.appearance.Display": "显示",
	"group.appearance.Images": "图片",

	// ═══════════════════════════════════════════════════════════
	// ── Theme（主题） ──
	"setting.theme.dark.label": "深色主题",
	"setting.theme.dark.description": "终端背景为深色时使用的主题",
	"setting.theme.light.label": "浅色主题",
	"setting.theme.light.description": "终端背景为浅色时使用的主题",
	"setting.symbolPreset.label": "符号预设",
	"setting.symbolPreset.description": "图标和符号的字符集（Unicode、Nerd Font 或 ASCII）",
	"setting.colorBlindMode.label": "色盲模式",
	"setting.colorBlindMode.description": "使用蓝色替代绿色表示差异中的新增行",

	// ═══════════════════════════════════════════════════════════
	// ── Composer（布局） ──
	"setting.composer.shape.label": "Composer 布局",
	"setting.composer.shape.description": "输入编辑器和状态行的可视化布局",

	// ═══════════════════════════════════════════════════════════
	// ── Status Line（状态行） ──
	"setting.statusLine.preset.label": "状态行预设",
	"setting.statusLine.preset.description": "预构建的状态行配置",
	"setting.statusLine.separator.label": "状态行分隔符",
	"setting.statusLine.separator.description": "段之间的分隔符样式",
	"setting.statusLine.contextLine.label": "上下文响应线",
	"setting.statusLine.contextLine.description": "左右段之间的线如何反映上下文使用情况（仅框式布局）",
	"setting.statusLine.sessionAccent.label": "会话强调",
	"setting.statusLine.sessionAccent.description": "使用会话名称颜色显示编辑器边框和状态行间隔",
	"setting.statusLine.transparent.label": "透明状态行",
	"setting.statusLine.transparent.description": "使用终端默认背景色作为状态行背景，而非主题的状态行背景色",
	"setting.statusLine.compactThinkingLevel.label": "紧凑思考级别",
	"setting.statusLine.compactThinkingLevel.description": "在模型名称旁显示单个图标而非单独的 ` · <级别>` 后缀",
	"setting.statusLine.showHookStatus.label": "显示钩子状态",
	"setting.statusLine.showHookStatus.description": "在状态行下方显示钩子状态消息",

	// ═══════════════════════════════════════════════════════════
	// ── Display（显示） ──
	"setting.tui.resizeScrollback.label": "调整回滚大小",
	"setting.tui.resizeScrollback.description": "终端调整大小后，如何刷新保留在终端回滚中的转录行",
	"setting.terminal.showProgress.label": "终端原生进度",
	"setting.terminal.showProgress.description": "在代理或上下文维护运行时输出 OSC 9;4 不确定进度指示",
	"setting.tui.textSizing.label": "Kitty 大字体标题",
	"setting.tui.textSizing.description":
		"使用 Kitty 的 OSC 66 文本缩放协议将 Markdown H1 标题渲染为 2 倍大小。仅在 Kitty 终端生效；其他终端忽略。默认关闭",
	"setting.tui.renderMermaid.label": "渲染 Mermaid 图表",
	"setting.tui.renderMermaid.description": "将 Mermaid 围栏代码块渲染为 ASCII 图表",
	"setting.tui.reactions.label": "代理反应",
	"setting.tui.reactions.description": "邀请代理用表情符号徽章对你的消息做出反应",
	"setting.tui.codexResetFireworks.label": "Codex 重置烟花",
	"setting.tui.codexResetFireworks.description":
		"在顶部第三区域显示烟花，庆祝非计划的 Codex 每周用量重置和新增的保存重置",
	"setting.tui.titleState.label": "终端标题运行状态",
	"setting.tui.titleState.description":
		'在终端标题的分隔符中显示代理运行状态 — 工作时为旋转动画（Windows 上为静态 ":"），轮到用户时为 ">"，代理等待用户时为 "!"',
	"setting.tui.hyperlinks.label": "终端超链接",
	"setting.tui.hyperlinks.description":
		"将路径和 URL 包装为 OSC 8 超链接以实现终端原生点击打开（自动：检测支持；关闭：从不；始终：无条件）",
	"setting.tui.tight.label": "紧凑布局",
	"setting.tui.tight.description": "移除终端输出左右两侧的 1 字符水平内边距",
	"setting.display.shimmer.label": "微光效果",
	"setting.display.shimmer.description": "工作/加载消息的柔和余弦波扫过效果",
	"setting.display.smoothStreaming.label": "平滑流式传输",
	"setting.display.smoothStreaming.description": "随着数据块到达，平滑地展示代理文本和流式工具输入",
	"setting.display.hideToolActivity.label": "隐藏工具活动",
	"setting.display.hideToolActivity.description": "在转录中隐藏模型发起的工具调用和结果",
	"setting.display.showTokenUsage.label": "显示 Token 用量",
	"setting.display.showTokenUsage.description": "在代理消息上显示每轮 Token 用量",
	"setting.display.showTurnTime.label": "显示轮次时间",
	"setting.display.showTurnTime.description": "在代理消息用量行上显示完整的提示到输出的时间（含工具调用）",
	"setting.display.cacheMissMarker.label": "缓存未命中标记",
	"setting.display.cacheMissMarker.description": "在请求丢失（未命中）提示缓存的代理轮次后显示分隔线",
	"setting.display.collapseCompacted.label": "折叠已压缩内容",
	"setting.display.collapseCompacted.description":
		"在实时转录中折叠摘要分隔线后已压缩的历史内容；禁用则在每次压缩时在每行显示分隔线",
	"setting.tui.imeSafeCursor.label": "IME 安全光标",
	"setting.tui.imeSafeCursor.description": "将提示的底部边框移至单独行，使 macOS IME 预编辑不会导致位移",
	"setting.task.showResolvedModelBadge.label": "显示已解析模型徽章",
	"setting.task.showResolvedModelBadge.description": "在子代理状态线中显示每个子代理使用的实际模型 ID",

	// ═══════════════════════════════════════════════════════════
	// ── Images（图片） ──
	"setting.terminal.showImages.label": "显示内联图片",
	"setting.terminal.showImages.description": "在终端中内联渲染图片",
	"setting.images.autoResize.label": "自动调整图片大小",
	"setting.images.autoResize.description": "将大图片调整至 2000x2000 最大尺寸以提升模型兼容性",
	"setting.images.blockImages.label": "拦截图片",
	"setting.images.blockImages.description": "阻止图片发送到 LLM 提供商",
	// ── 补全（schema 对齐）──────────────────────────────────
	"setting.showHardwareCursor.label": "显示硬件光标",
	"setting.showHardwareCursor.description": "为 IME 支持显示终端光标",
};

export default strings;
