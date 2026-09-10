/**
 * TUI 简体中文汉化插件 — 交互 (interaction) 标签页映射
 *
 * 覆盖：Input / Approvals / Notifications / Speech / Collab / Magic Keywords /
 *       Startup & Updates / Power / Agent / Git
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
	"tab.interaction": "交互",
	"group.interaction.Input": "输入",
	"group.interaction.Approvals": "审批",
	"group.interaction.Notifications": "通知",
	"group.interaction.Speech": "语音",
	"group.interaction.Collab": "协作",
	"group.interaction.Magic Keywords": "魔法关键词",
	"group.interaction.Startup & Updates": "启动与更新",
	"setting.autoResume.label": "自动恢复",
	"setting.autoResume.description": "自动恢复当前目录中最近的会话",
	"group.interaction.Power": "电源",
	"group.interaction.Agent": "代理",

	// ═══════════════════════════════════════════════════════════════════════
	// Input (0)
	// ═══════════════════════════════════════════════════════════════════════
	"setting.steeringMode.label": "引导模式",
	"setting.steeringMode.description": "在代理工作时如何处理排队消息",

	"setting.followUpMode.label": "后续消息模式",
	"setting.followUpMode.description": "一轮完成后如何处理后续消息",

	"setting.interruptMode.label": "中断模式",
	"setting.interruptMode.description": "引导消息何时中断工具执行",

	"setting.loop.mode.label": "循环模式",
	"setting.loop.mode.description": "/loop 迭代之间在重新提交提示之前发生什么",

	"setting.doubleEscapeAction.label": "双击 Esc 操作",
	"setting.doubleEscapeAction.description": "在空编辑器中按两次 Escape 键：打开转录回滚选择器、打开会话树、或无操作",

	"setting.treeFilterMode.label": "会话树筛选模式",
	"setting.treeFilterMode.description": "打开会话树时的默认筛选模式",

	"setting.autocompleteMaxVisible.label": "自动补全项数",
	"setting.autocompleteMaxVisible.description": "自动补全下拉菜单中最大可见项数（3-20）",

	"setting.spelling.typoDetection.label": "拼写错误检测（macOS）",
	"setting.spelling.typoDetection.description": "用活跃 macOS 字典标记拼写错误的提示词",

	"setting.spelling.autocomplete.label": "单词自动补全（macOS）",
	"setting.spelling.autocomplete.description": "显示 macOS 字典单词补全作为 Tab 接受的内联提示",

	"setting.spelling.autocorrect.label": "自动更正（macOS）",
	"setting.spelling.autocorrect.description": "完成单词后应用确定的 macOS 拼写更正",

	"setting.emojiAutocomplete.label": "表情符号自动补全",
	"setting.emojiAutocomplete.description": "从 `:name:` 缩写建议表情符号并扩展文本表情符号如 `:D` 或 `:-)`",

	"setting.paste.largeMenuThreshold.label": "大段粘贴菜单阈值",
	"setting.paste.largeMenuThreshold.description":
		"当粘贴内容达到此行数时，提供菜单选项：用代码块包裹、用 XML 标签包裹、或保存到文件。0 禁用菜单（大段粘贴仍会折叠为 [Paste] 标记）",

	// ═══════════════════════════════════════════════════════════════════════
	// Approvals (1)
	// ═══════════════════════════════════════════════════════════════════════
	"setting.tools.approval.label": "工具审批策略",
	"setting.tools.approval.description":
		"按工具设置的审批策略。设为 'allow' 自动审批，'prompt' 需要确认，或 'deny' 阻止。覆盖在所有审批模式下均有效。",

	"setting.tools.approvalMode.label": "工具审批模式",
	"setting.tools.approvalMode.description":
		"工具调用的默认审批行为。'Always ask' 仅自动审批只读工具。'Write' 自动审批读取和写入工具。'Yolo' 自动审批所有层级；用户策略仍可能要求确认或阻止。",

	// ═══════════════════════════════════════════════════════════════════════
	// Notifications (2)
	// ═══════════════════════════════════════════════════════════════════════
	"setting.completion.notify.label": "完成通知",
	"setting.completion.notify.description": "代理完成一轮时发送通知",

	"setting.error.notify.label": "错误通知",
	"setting.error.notify.description": "代理因错误停止时发送通知",

	"setting.ask.timeout.label": "询问超时",
	"setting.ask.timeout.description": "多少秒后自动选择推荐的 ask 选项（0 禁用）",

	"setting.ask.notify.label": "询问通知",
	"setting.ask.notify.description": "ask 工具等待输入时发送通知",

	"setting.recap.enabled.label": "空闲回顾",
	"setting.recap.enabled.description": "终端空闲后生成简要的 LLM 回顾，说明当前状态",

	"setting.recap.idleSeconds.label": "空闲回顾延迟",
	"setting.recap.idleSeconds.description": "空闲后等待多少秒才显示回顾",

	// ═══════════════════════════════════════════════════════════════════════
	// Speech (3)
	// ═══════════════════════════════════════════════════════════════════════
	"setting.stt.enabled.label": "语音转文字",
	"setting.stt.enabled.description": "通过麦克风启用语音转文字输入",

	"setting.stt.modelName.label": "语音模型",
	"setting.stt.modelName.description":
		"本地设备语音模型。Parakeet TDT v3 (sherpa-onnx) 是 SoTA 默认；Whisper base/small/large-v3-turbo 层级（transformers.js）在尺寸和多语言覆盖间权衡。首次使用时下载。",

	"setting.stt.submitTrigger.label": "语音转文字提交触发",
	"setting.stt.submitTrigger.description":
		"选择语音听写何时自动提交：从不、释放（2+ 词）、完整句子时释放、或当我说提交时",

	// ═══════════════════════════════════════════════════════════════════════
	// Collab (4)
	// ═══════════════════════════════════════════════════════════════════════
	"setting.collab.relayUrl.label": "中继 URL",
	"setting.collab.relayUrl.description": "/collab 使用的中继地址（wss://host[:port]）",

	"setting.collab.webUrl.label": "Web UI URL",
	"setting.collab.webUrl.description":
		"/collab 链接使用的浏览器 UI；为空时从 collab.relayUrl 派生；显式 http:// 仅限 localhost",

	"setting.collab.displayName.label": "显示名称",
	"setting.collab.displayName.description": "显示给其他协作参与者的名称（默认：OS 用户名）",

	"setting.share.serverUrl.label": "分享服务器",
	"setting.share.serverUrl.description":
		"/share 使用的查看器/上传基地址（加密 blob 上传 + 查看器；链接格式为 <base>/<id>#<key>）",

	"setting.share.store.label": "分享存储",
	"setting.share.store.description": "/share 将加密会话 blob 上传到的位置",

	"setting.share.redactSecrets.label": "分享机密脱敏",
	"setting.share.redactSecrets.description": "在上传前对 /share 快照运行机密混淆器（使用 secrets.* 配置）",

	// ═══════════════════════════════════════════════════════════════════════
	// Magic Keywords (5)
	// ═══════════════════════════════════════════════════════════════════════
	"setting.magicKeywords.enabled.label": "魔法关键词",
	"setting.magicKeywords.enabled.description": "为独立的 ultrathink、orchestrate 和 workflowz 关键词启用隐藏通知",

	"setting.magicKeywords.ultrathink.label": "Ultrathink 关键词",
	"setting.magicKeywords.ultrathink.description": "让独立的 ultrathink 请求最大自动思考并附加其隐藏通知",

	"setting.magicKeywords.orchestrate.label": "Orchestrate 关键词",
	"setting.magicKeywords.orchestrate.description": "让独立的 orchestrate 附加其隐藏的多代理编排通知",

	"setting.magicKeywords.workflow.label": "Workflow 关键词",
	"setting.magicKeywords.workflow.description": "让独立的 workflowz 附加其隐藏的 eval 工作流通知",

	// ═══════════════════════════════════════════════════════════════════════
	// Startup & Updates (6)
	// ═══════════════════════════════════════════════════════════════════════
	"setting.startup.quiet.label": "安静启动",
	"setting.startup.quiet.description": "跳过欢迎屏幕和启动状态消息",

	"setting.startup.showSplash.label": "显示启动画面",
	"setting.startup.showSplash.description":
		"在正常交互式启动时显示完整的动画设置画面，不重新运行设置。安静启动仍会抑制它。",

	"setting.startup.setupWizard.label": "设置向导",
	"setting.startup.setupWizard.description": "每个 setup 版本显示一次新增的入门步骤",

	"setting.startup.checkUpdate.label": "检查更新",
	"setting.startup.checkUpdate.description": "启动时检查 omp 更新",

	"setting.update.channel.label": "更新渠道",
	"setting.update.channel.description": "omp update 和启动更新检查使用的更新渠道",

	"setting.marketplace.autoUpdate.label": "应用市场自动更新",
	"setting.marketplace.autoUpdate.description": "启动时检查插件更新",

	"setting.startup.changelogMode.label": "启动更新日志",
	"setting.startup.changelogMode.description": "选择更新说明以摘要、完整详情或隐藏开始",

	// ═══════════════════════════════════════════════════════════════════════
	// Power (7)
	// ═══════════════════════════════════════════════════════════════════════
	"setting.power.sleepPrevention.label": "睡眠预防",
	"setting.power.sleepPrevention.description":
		"在活动会话期间防止系统休眠。每个层级是累积的 — 它添加所有较低层级的标志。",

	// ═══════════════════════════════════════════════════════════════════════
	// Agent (8)
	// ═══════════════════════════════════════════════════════════════════════
	"setting.features.unexpectedStopDetection.label": "意外停止",
	"setting.features.unexpectedStopDetection.description":
		"当助手无声消息停止时自动恢复。Smart 还会用小型模型分类仅文本停止。",
	// ── 补全（schema 对齐）──────────────────────────────────
	"group.interaction.Git": "Git",
	"setting.git.enabled.label": "启用 Git 集成",
	"setting.git.enabled.description": "在 TUI 中显示 git 分支、状态与 PR 信息，并监听仓库元数据。",
};

export default strings;
