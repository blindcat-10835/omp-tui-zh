/**
 * TUI 简体中文汉化插件 — 上下文 (context) 标签页映射
 *
 * 覆盖：General / Compaction / Rules (TTSR) / Experimental
 *
 * 键名约定：
 *   setting.<path>.label       — 设置项标签
 *   setting.<path>.description — 设置项说明
 *   group.<tab>.<group>        — 区块标题（TAB_GROUPS 组名）
 */

const strings: Record<string, string> = {
	// ═══════════════════════════════════════════════════════════════════════
	// Tab / Group headings
	// ═══════════════════════════════════════════════════════════════════════
	"tab.context": "上下文",
	"group.context.General": "常规",
	"group.context.Compaction": "压缩",
	"group.context.Rules (TTSR)": "规则 (TTSR)",
	"group.context.Experimental": "实验性",

	// ═══════════════════════════════════════════════════════════════════════
	// General (0)
	// ═══════════════════════════════════════════════════════════════════════
	"setting.contextPromotion.enabled.label": "自动提升上下文",
	"setting.contextPromotion.enabled.description": "上下文溢出时提升到更大上下文模型而非压缩",

	"setting.extendedContext.label": "扩展上下文",
	"setting.extendedContext.description":
		"在支持时使用更大的上下文窗口；可能产生高级定价。关闭时保持默认或标准定价窗口",

	"setting.branchSummary.enabled.label": "分支摘要",
	"setting.branchSummary.enabled.description": "离开分支时提示进行摘要",

	// ═══════════════════════════════════════════════════════════════════════
	// Compaction (1)
	// ═══════════════════════════════════════════════════════════════════════
	"setting.compaction.enabled.label": "自动压缩",
	"setting.compaction.enabled.description": "上下文过大时自动压缩",

	"setting.compaction.midTurnEnabled.label": "中途压缩",
	"setting.compaction.midTurnEnabled.description": "在下一次提供商请求前的安全中途工具循环边界检查阈值",

	"setting.compaction.methodOrder.label": "压缩方法顺序",
	"setting.compaction.methodOrder.description": "自动上下文维护的首选回退顺序；不可用或失败的方法推进到下一个选择",

	"setting.compaction.thresholdPercent.label": "压缩阈值",
	"setting.compaction.thresholdPercent.description": "上下文维护的百分比阈值；设为默认以使用遗留预留基于行为",

	"setting.compaction.thresholdTokens.label": "压缩令牌限制",
	"setting.compaction.thresholdTokens.description": "上下文维护的固定令牌限制；设置时覆盖百分比",

	"setting.compaction.handoffSaveToDisk.label": "保存交接文档",
	"setting.compaction.handoffSaveToDisk.description": "将生成的交接文档保存为 markdown 文件以支持自动交接流程",

	"setting.compaction.remoteStreamingV2Enabled.label": "远程压缩 V2",
	"setting.compaction.remoteStreamingV2Enabled.description": "为兼容的远程压缩模型使用响应流式压缩",

	"setting.compaction.asyncEnabled.label": "异步压缩",
	"setting.compaction.asyncEnabled.description":
		"在后台推测性摘要，当上下文接近压缩阈值时，在跨越阈值时插入准备好的结果",

	"setting.compaction.idleEnabled.label": "空闲压缩",
	"setting.compaction.idleEnabled.description": "空闲时令牌数超过阈值则压缩上下文",

	"setting.compaction.idleThresholdTokens.label": "空闲压缩阈值",
	"setting.compaction.idleThresholdTokens.description": "触发空闲压缩的令牌数上限",

	"setting.compaction.idleTimeoutSeconds.label": "空闲压缩延迟",
	"setting.compaction.idleTimeoutSeconds.description": "空闲后等待多少秒才压缩",

	"setting.compaction.supersedeReads.label": "取代过时读取",
	"setting.compaction.supersedeReads.description": "再次读取相同文件时修剪较早的读取结果（缓存感知，每轮运行）",

	"setting.compaction.dropUseless.label": "省略无事件结果",
	"setting.compaction.dropUseless.description": "消耗后（缓存感知）修剪上下文上无用的工具结果（无匹配、超时等待）",

	// ═══════════════════════════════════════════════════════════════════════
	// Rules (TTSR) (2)
	// ═══════════════════════════════════════════════════════════════════════
	"setting.ttsr.enabled.label": "TTSR",
	"setting.ttsr.enabled.description": "输出匹配规则模式时在流中中断代理（时间旅行流规则）",

	"setting.ttsr.contextMode.label": "TTSR 上下文模式",
	"setting.ttsr.contextMode.description": "TTSR 触发时对部分输出做什么",

	"setting.ttsr.interruptMode.label": "TTSR 中断模式",
	"setting.ttsr.interruptMode.description": "何时在流中中断 vs 完成后注入警告",

	"setting.ttsr.repeatMode.label": "TTSR 重复模式",
	"setting.ttsr.repeatMode.description": "规则如何重复：每会话一次或在消息间隔后",

	"setting.ttsr.repeatGap.label": "TTSR 重复间隔",
	"setting.ttsr.repeatGap.description": "规则可以再次触发的消息数",

	"setting.ttsr.builtinRules.label": "内置规则",
	"setting.ttsr.builtinRules.description": "加载代理附带的默认规则（用 ttsr.disabledRules 单独覆盖）",

	"setting.ttsr.disabledRules.label": "禁用规则",
	"setting.ttsr.disabledRules.description": "完全忽略的规则名称（适用于捆绑默认和你自己的规则）",

	// ═══════════════════════════════════════════════════════════════════════
	// Experimental (3)
	// ═══════════════════════════════════════════════════════════════════════
	"setting.snapcompact.systemPrompt.label": "Snapcompact 系统提示",
	"setting.snapcompact.systemPrompt.description":
		"实验性：将选定的系统提示文本渲染为密集 PNG 图像并附加到首条用户消息（仅限视觉模型）。节省令牌；丢失被图像文本的提示缓存。",

	"setting.snapcompact.toolResults.label": "Snapcompact 工具结果",
	"setting.snapcompact.toolResults.description":
		"实验性：将大型历史工具结果渲染为密集 PNG 图像而非文本（仅限视觉模型）。节省积累的读取/搜索结果上的令牌。",

	"setting.tools.format.label": "工具调用模式",
	"setting.tools.format.description":
		"控制工具如何暴露给模型。Auto 使用提供商原生工具调用，除非选定模型标记为不支持，则回退到 GLM 自有方言。Native 强制提供商原生工具；其他值强制命名自有方言。在会话开始时应用。",

	"setting.snapcompact.shape.label": "Snapcompact 形状",
	"setting.snapcompact.shape.description":
		"snapcompact 打印文本使用的框架形状（压缩归档和嵌入式成像）。Auto 选择针对当前模型调优的形状。",
	// ── 补全（schema 对齐）──────────────────────────────────
	"setting.workspace.additionalDirectories.label": "附加工作区目录",
	"setting.workspace.additionalDirectories.description":
		"为每个会话添加的额外工作区根目录（多根工作区）。通过 /add-dir 和 /remove-dir 实时管理。路径相对于 cwd 解析；建议使用绝对路径。agent 会被告知这些根目录存在，并可对其 read/grep/glob。",
};

export default strings;
