/**
 * TUI 简体中文映射：模型 (Model) 标签页
 *
 * 键格式：
 *   - `group.<tab>.<group>`   区块标题
 *   - `setting.<path>.label`      设置行标题
 *   - `setting.<path>.description` 设置行描述
 *
 * 中文优先复用旧版参考，新项补译。不修改宿主 schema。
 */

const strings: Record<string, string> = {
	// ═══════════════════════════════════════════════════════════
	// ── 区块标题 ──
	"group.model.Advisor": "建议器",
	"group.model.Prewalk": "预检",
	"group.model.Vision": "视觉",
	"group.model.Thinking": "思考",
	"group.model.Sampling": "采样",
	"group.model.Retry & Fallback": "重试与回退",
	"group.model.Prompt": "提示词",

	// ═══════════════════════════════════════════════════════════
	// ── Prompt（提示词） ──
	"setting.personality.label": "人格",
	"setting.personality.description": "融入系统提示词人格块的沟通风格",

	// ═══════════════════════════════════════════════════════════
	// ── Advisor（建议器） ──
	"setting.advisor.enabled.label": "启用建议器",
	"setting.advisor.enabled.description": "为会话提供上下文建议",
	"setting.advisor.syncBacklog.label": "建议器同步后备",
	"setting.advisor.syncBacklog.description": "在主代理暂停最多 30 秒时同步积压的建议",
	"setting.advisor.immuneTurns.label": "建议器免疫轮数",
	"setting.advisor.immuneTurns.description": "建议器被忽略的连续轮数后，重置其阻止计数",

	// ═══════════════════════════════════════════════════════════
	// ── Prewalk（预检） ──
	"setting.prewalk.enabled.label": "启用预检",
	"setting.prewalk.enabled.description": "从活跃模型开始，然后切换到快速/便宜的模型进行预检",

	// ═══════════════════════════════════════════════════════════
	// ── Vision（视觉） ──
	"setting.images.describeForTextModels.label": "为文本模型描述图片",
	"setting.images.describeForTextModels.description":
		"当向无视觉支持的模型附加图片时，保存至 local:// 并从视觉能力模型注入描述，而非丢弃",
	"setting.images.urls.enabled.label": "将图片作为 URL 提供",
	"setting.images.urls.enabled.description":
		"通过配置的后端链发布出站图片，向支持 URL 获取的提供商发送短链接而非内联 base64",
	"setting.images.urls.backends.label": "图片 URL 后端",
	"setting.images.urls.backends.description": "发布图片时依次尝试的目的地",
	"setting.images.urls.command.label": "图片上传命令",
	"setting.images.urls.command.description": "后端命令的 argv 模板；{file} 为图片路径，{mime}/{ext} 可选",
	"setting.images.urls.publicBaseUrl.label": "图片 URL 公开基础地址",
	"setting.images.urls.publicBaseUrl.description": "支撑 blob 服务器的外部可访问基础 URL",
	"setting.images.urls.ttlHours.label": "图片 URL 有效期（小时）",
	"setting.images.urls.ttlHours.description": "本地托管图片 URL 的服务窗口，从最近一次对话发送它们时算起",
	"setting.images.urls.bindHost.label": "图片 URL 绑定主机",
	"setting.images.urls.bindHost.description": "blob 服务器绑定的主机；隧道使用回环地址，直接服务使用 0.0.0.0",
	"setting.images.urls.sshTarget.label": "图片 URL SSH 目标",
	"setting.images.urls.sshTarget.description": "SSH 反向转发的 user@host 目标",
	"setting.images.urls.sshRemotePort.label": "图片 URL SSH 远程端口",
	"setting.images.urls.sshRemotePort.description": "SSH 反向转发的远程监听端口，你的 web 服务器代理到此端口",

	// ═══════════════════════════════════════════════════════════
	// ── Thinking（思考） ──
	"setting.model.loopGuard.enabled.label": "循环检测",
	"setting.model.loopGuard.enabled.description": "自动检测模型推理和文本流中的循环模式",
	"setting.model.loopGuard.checkAssistantContent.label": "检测代理文本",
	"setting.model.loopGuard.checkAssistantContent.description": "对代理的文本消息应用循环检测（除了推理日志）",
	"setting.model.loopGuard.toolCallReminder.label": "循环检测工具调用提醒",
	"setting.model.loopGuard.toolCallReminder.description":
		"当 Gemini 推理流产生大量连续规划头而不调用工具时，中断并注入工具调用提醒（需循环检测）",
	"setting.model.toolCallLoopGuard.enabled.label": "工具调用循环检测",
	"setting.model.toolCallLoopGuard.enabled.description": "检测跨轮次的连续相同工具调用并注入纠正引导",
	"setting.model.toolCallLoopGuard.threshold.label": "循环阈值",
	"setting.model.toolCallLoopGuard.threshold.description": "注入纠正引导前所需的连续相同工具调用次数",
	"setting.model.toolCallLoopGuard.exemptTools.label": "免检工具",
	"setting.model.toolCallLoopGuard.exemptTools.description": "可连续重复而不触发跨轮循环检测的工具名称",
	"setting.providers.autoThinkingModel.label": "自动思考模型",
	"setting.providers.autoThinkingModel.description": "自动思考级别的难度分类器",
	"setting.providers.autoThinkingMaxEffort.label": "自动思考上限",
	"setting.providers.autoThinkingMaxEffort.description": "自动分类器可解析的最高努力级别",

	// ═══════════════════════════════════════════════════════════
	// ── Sampling（采样） ──
	"setting.tier.openai.label": "服务等级 — OpenAI",
	"setting.tier.anthropic.label": "服务等级 — Anthropic",
	"setting.tier.google.label": "服务等级 — Google",
	"setting.tier.subagent.label": "服务等级 — 子代理",
	"setting.tier.advisor.label": "服务等级 — 建议器",

	// ═══════════════════════════════════════════════════════════
	// ── Retry & Fallback（重试与回退） ──
	"setting.retry.maxRetries.label": "重试次数",
	"setting.retry.maxRetries.description": "API 错误的最大重试次数",
	"setting.retry.maxDelayMs.label": "最大重试延迟",
	"setting.retry.maxDelayMs.description": "重试之间的最大等待时间（毫秒）",
	"setting.retry.waitForUsageReset.label": "等待用量重置",
	"setting.retry.waitForUsageReset.description": "当提供商报告用量耗尽时等待重置窗口",
	"setting.retry.modelFallback.label": "模型回退",
	"setting.retry.modelFallback.description": "允许重试恢复时切换到配置的备用模型",
	"setting.retry.usageAwareFallback.label": "用量感知回退",
	"setting.retry.usageAwareFallback.description": "当用量即将耗尽时优先选择可靠配额",
	"setting.retry.usageReservePct.label": "保留额度",
	"setting.retry.usageReservePct.description": "当编码计划模型接近限额时触发",
	"setting.retry.usageReservePolicy.label": "保留策略",
	"setting.retry.usageReservePolicy.description": "当所有同提供商编码计划账户都在保留额度内时的处理方式",
	"setting.retry.fallbackChains.label": "回退链",
	"setting.retry.fallbackChains.description": "何时返回主模型",
	"setting.retry.fallbackRevertPolicy.label": "回退回退策略",
	"setting.retry.fallbackRevertPolicy.description": "回退后主模型被抑制的时间段结束后返回主模型",
	"setting.providers.anthropic.serverSideFallback.label": "Anthropic 服务端回退 (Fable 5)",
	"setting.providers.anthropic.serverSideFallback.description": "当 Claude Fable 5 / Mythos 5 请求被阻止时的处理方式",
	// ── 补全（schema 对齐）──────────────────────────────────
	"setting.defaultThinkingLevel.label": "思考等级",
	"setting.defaultThinkingLevel.description": "思考型模型的推理深度",
	"setting.externalThinking.label": "外部思考",
	"setting.externalThinking.description": "私有草稿区，不展示给用户。禁用受支持的 GPT、Claude 和 Gemini 推理",
	"setting.hideThinkingBlock.label": "隐藏思考块",
	"setting.hideThinkingBlock.description": "在助手回复中隐藏思考块",
	"setting.omitThinking.label": "省略思考摘要",
	"setting.omitThinking.description": "指示上游提供商在响应中完全省略思考摘要（若支持）",
	"setting.proseOnlyThinking.label": "纯文本思考",
	"setting.proseOnlyThinking.description": "省略思考摘要中的代码块，以省略号代替",
	"setting.includeModelInPrompt.label": "在提示中包含模型",
	"setting.includeModelInPrompt.description": "在系统提示中呈现当前模型标识，让 agent 知道自己在用哪个模型",
	"setting.includeWorkspaceTree.label": "包含工作区目录树",
	"setting.includeWorkspaceTree.description":
		"在系统提示中渲染工作区目录树。警告：文件变更时可能击穿跨会话的提示缓存。",
	"setting.inlineToolDescriptors.label": "内联工具描述",
	"setting.inlineToolDescriptors.description":
		"在系统提示中渲染完整工具描述，并从提供商工具 schema 中剥离顶层/嵌套描述，使描述文本只发送一次。对 Gemini 模型自动启用，其他模型禁用",
	"setting.modelRoleStorage.label": "模型角色存储",
	"setting.modelRoleStorage.description": "模型选择器角色分配的保存位置",
	"setting.skillful.label": "在提示中列出技能",
	"setting.skillful.description": "在系统提示中列出可用技能；禁用可节省上下文，并用 /skillful 按会话切换",
	"setting.minP.label": "最小概率",
	"setting.minP.description": "最小概率阈值（0-1，-1 = 提供商默认）",
	"setting.presencePenalty.label": "存在惩罚",
	"setting.presencePenalty.description": "对引入已存在 token 的惩罚（-1 = 提供商默认）",
	"setting.repetitionPenalty.label": "重复惩罚",
	"setting.repetitionPenalty.description": "对重复 token 的惩罚（-1 = 提供商默认）",
	"setting.temperature.label": "温度",
	"setting.temperature.description": "采样温度（0 = 确定性，1 = 创造性，-1 = 提供商默认）",
	"setting.textVerbosity.label": "文本详尽度",
	"setting.textVerbosity.description": "OpenAI Responses 和 Codex 的响应详尽度（low、medium 或 high）",
	"setting.tier.advisor.description":
		"advisor 模型的服务等级。None = 标准处理；Inherit = 匹配主 agent 的实时分族等级；选一个值则应用到 advisor 模型所属的族。",
	"setting.tier.anthropic.description":
		"Claude 请求的处理等级。priority 在受支持的直连 Anthropic 模型上实现快速模式（speed: fast）；Bedrock/Vertex Claude 和经 OpenRouter 路由时忽略。",
	"setting.tier.google.description":
		"Gemini（Google AI Studio + Vertex）请求，以及经 OpenRouter 路由的 Google 族模型的处理等级（none = 省略）。作为顶层 serviceTier 字段发送。",
	"setting.tier.openai.description":
		"OpenAI / OpenAI-Codex 请求，以及经 OpenRouter 路由的 OpenAI 族模型的处理等级（none = 省略）。作为 service_tier 发送。",
	"setting.tier.subagent.description":
		"派生 task/eval 子 agent 的服务等级。Inherit = 匹配主 agent 的实时分族等级（跟踪 /fast）；选一个值则应用到子 agent 模型所属的族。",
	"setting.topK.label": "Top K",
	"setting.topK.description": "从 top-K token 中采样（-1 = 提供商默认）",
	"setting.topP.label": "Top P",
	"setting.topP.description": "核采样截断（0-1，-1 = 提供商默认）",
};

export default strings;
