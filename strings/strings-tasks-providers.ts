/** TUI 简体中文映射：任务与Provider标签页。 */
const strings: Record<string, string> = {
	"group.tasks.Modes": "模式",
	"group.tasks.Subagents": "子 agent",
	"group.tasks.Isolation": "隔离",
	"group.tasks.Commands & Skills": "命令与技能",
	"setting.plan.enabled.label": "Plan 模式",
	"setting.plan.enabled.description": "启用只读探索和执行前规划的 Plan 模式",
	"setting.plan.defaultOnStartup.label": "启动时进入 Plan 模式",
	"setting.plan.defaultOnStartup.description": "每个新会话启动时自动进入 Plan 模式",
	"setting.goal.enabled.label": "目标模式",
	"setting.goal.enabled.description": "启用会话级目标模式和隐藏的 goal 工具",
	"setting.goal.statusInFooter.label": "页脚目标状态",
	"setting.goal.statusInFooter.description": "在状态行的目标指示器旁显示 token 预算",
	"setting.goal.continuationModes.label": "目标续行模式",
	"setting.goal.continuationModes.description": "允许活动目标在轮次间自动继续的运行模式",
	"setting.title.refreshOnReplan.label": "重新规划时刷新标题",
	"setting.title.refreshOnReplan.description": "todo 初始化重新规划后刷新生成的会话标题；用户设置的标题除外",
	"setting.task.isolation.enabled.label": "隔离子 agent",
	"setting.task.isolation.enabled.description": "在检出副本中隔离运行子 agent，随后集成其变更",
	"setting.isolation.backend.label": "隔离后端",
	"setting.isolation.backend.description": "用于子 agent 隔离和 worktree 克隆的后端",
	"setting.worktree.clone.label": "将检出内容克隆到 worktree",
	"setting.worktree.clone.description":
		"由 `github pr_checkout` 和 bash 中 `git worktree add` 创建的新 worktree 从当前检出的写时复制克隆开始，以携带 node_modules、target 等忽略的构建产物；文件系统无法克隆时回退到普通检出",
	"setting.worktree.cleanSource.label": "使用 /wt 时清理源检出",
	"setting.worktree.cleanSource.description":
		"使用 `/wt` 创建 worktree 时，携带变更后重置原检出的已跟踪变更并移除未跟踪文件",
	"setting.task.isolation.apply.label": "应用隔离变更",
	"setting.task.isolation.apply.description": "自动将成功的隔离任务变更应用到父检出；禁用则保留 patch 或分支产物",
	"setting.task.isolation.merge.label": "隔离合并策略",
	"setting.task.isolation.merge.description": "隔离任务变更的集成方式（应用 patch 或合并分支）",
	"setting.task.isolation.commits.label": "隔离提交风格",
	"setting.task.isolation.commits.description": "嵌套仓库变更的提交消息风格（通用或 AI 生成）",
	"setting.worktree.base.label": "Worktree 基础目录",
	"setting.worktree.base.description":
		"agent 管理的 worktree 基础目录，包括任务隔离副本、`github` PR 检出和 `omp worktree` 清理。未设置时使用 ~/.omp/wt；必须是绝对路径或以 ~ 开头。OMP_WORKTREE_DIR 环境变量优先",
	"setting.task.eager.label": "优先委派任务",
	"setting.task.eager.description": "推动将工作委派给子 agent 的强度",
	"setting.task.batch.label": "批量 task 调用",
	"setting.task.batch.description":
		"将 task 工具切换为批量形式：一次调用携带 context 和 tasks[]，每项一个子 agent。启用 async.enabled 时各生成项独立在后台运行；禁用则恢复单项生成接口",
	"setting.task.enableEffort.label": "单任务思考强度",
	"setting.task.enableEffort.description": "在 task 生成参数中公开可选的 effort，允许调用方覆盖子 agent 的思考级别",
	"setting.task.maxConcurrency.label": "最大并发任务数",
	"setting.task.maxConcurrency.description": "同时运行的子 agent 最大数量",
	"setting.task.enableLsp.label": "子 agent 中启用 LSP",
	"setting.task.enableLsp.description": "允许 task 工具生成的子 agent 使用 LSP 工具；默认关闭以节省 token",
	"setting.task.maxRecursionDepth.label": "最大任务递归深度",
	"setting.task.maxRecursionDepth.description": "子 agent 可继续生成子 agent 的最大层数",
	"setting.task.maxRuntimeMs.label": "子 agent 最大运行时间",
	"setting.task.maxRuntimeMs.description":
		"每个子 agent 的硬性实际时间限制（毫秒）；0 禁用。用于防止 Provider 侧流式请求卡死",
	"setting.task.agentIdleTtlMs.label": "Agent 空闲 TTL",
	"setting.task.agentIdleTtlMs.description":
		"空闲子 agent 在转存到磁盘前保持内存存活的时间（毫秒）；0 表示直到退出都保持存活",
	"setting.task.softRequestBudget.label": "子 agent 软请求预算",
	"setting.task.softRequestBudget.description":
		"每个子 agent 的软请求预算。超过预算会注入收尾提示，达到 1.5 倍时强制停止并要求提交部分结果；0 禁用",
	"setting.task.softRequestBudgetNotice.label": "软请求预算提示",
	"setting.task.softRequestBudgetNotice.description":
		"子 agent 超过软请求预算时注入一次收尾提示，避免触发 1.5 倍强制停止",
	"setting.task.maxEffort.label": "单次生成最大思考强度",
	"setting.task.maxEffort.description":
		"task 工具单次生成的 effort 上限；较低值可阻止调用方将子 agent 提升到更高思考级别",
	"setting.task.prewalk.label": "通用 task 预执行",
	"setting.task.prewalk.description":
		"为内置通用 `task` 子 agent 启用 prewalk：先用解析后的模型规划并开始实现，首次 edit/write 时移交给 smol 角色",
	"setting.skills.enableSkillCommands.label": "技能命令",
	"setting.skills.enableSkillCommands.description": "将技能注册为 /skill:name 命令",
	"setting.commands.enableClaudeUser.label": "Claude 用户命令",
	"setting.commands.enableClaudeUser.description": "从 ~/.claude/commands/ 加载命令",
	"setting.commands.enableClaudeProject.label": "Claude 项目命令",
	"setting.commands.enableClaudeProject.description": "从 .claude/commands/ 加载命令",
	"setting.commands.enableOpencodeUser.label": "OpenCode 用户命令",
	"setting.commands.enableOpencodeUser.description": "从 ~/.config/opencode/commands/ 加载命令",
	"setting.commands.enableOpencodeProject.label": "OpenCode 项目命令",
	"setting.commands.enableOpencodeProject.description": "从 .opencode/commands/ 加载命令",
	"group.providers.Services": "服务",
	"group.providers.Fireworks": "Fireworks",
	"group.providers.Tiny Model": "Tiny Model",
	"group.providers.Protocol": "协议",
	"group.providers.Timeouts": "超时",
	"group.providers.Privacy": "隐私",
	"setting.providers.maxInFlightRequests.label": "最大在途请求数",
	"setting.providers.maxInFlightRequests.description":
		"每个 Provider ID 的最大并发 LLM 请求数，在使用同一配置根目录的本地 OMP 进程间共享；未列出的 Provider 不受限",
	"setting.providers.openai-codex.codeMode.label": "Codex Code 模式",
	"setting.providers.openai-codex.codeMode.description":
		"通过 eval 路由 Codex code_mode_only 模型（GPT-5.6）；直接工具为 eval、ask、todo、yield、think、checkpoint 和 rewind，其他会话工具通过 eval 单元使用；auto 遵循模型目录标记",
	"setting.providers.openai-codex.codeModeDirectTools.label": "Codex Code 模式直接工具",
	"setting.providers.openai-codex.codeModeDirectTools.description":
		"Codex Code 模式的额外直接工具；标准直接工具为 eval、ask、todo、yield、think、checkpoint 和 rewind",
	"setting.secrets.enabled.label": "隐藏密钥",
	"setting.secrets.enabled.description": "向 AI Provider 发送内容前混淆已配置密钥，并遮盖形似凭据的 token",
	"setting.providers.ollama-cloud.maxConcurrency.label": "Ollama Cloud 最大并发数",
	"setting.providers.ollama-cloud.maxConcurrency.description":
		"每个进程同时运行的 Ollama Cloud 子 agent 上限；0 禁用此 Provider 专属限制",
	"setting.providers.webSearchOrder.label": "Web 搜索 Provider 顺序",
	"setting.providers.webSearchOrder.description":
		"web_search 工具的 Provider 优先顺序；未列出的 Provider 保持其默认后续顺序",
	"setting.providers.webSearchExclude.label": "排除的 Web 搜索 Provider",
	"setting.providers.webSearchExclude.description": "web_search 永不使用的 Provider，包括回退路径",
	"setting.providers.webSearchTimeoutSeconds.label": "Web 搜索超时",
	"setting.providers.webSearchTimeoutSeconds.description":
		"每个 Provider 搜索传输的硬超时（秒，最大 300）；超时后 web_search 尝试下一个回退",
	"setting.providers.webSearchGeminiModel.label": "Gemini web_search 模型",
	"setting.providers.webSearchGeminiModel.description":
		"Gemini Google Search grounding 的模型 ID；默认为 gemini-2.5-flash",
	"setting.providers.antigravityEndpoint.label": "Antigravity 端点模式",
	"setting.providers.antigravityEndpoint.description":
		"google-antigravity Provider 的端点路由策略（聊天、搜索、图片、发现）",
	"setting.providers.imageOrder.label": "图片 Provider 顺序",
	"setting.providers.imageOrder.description":
		"图片生成 Provider 的优先顺序；未列出的 Provider 依次跟随当前会话 Provider 和内置顺序",
	"setting.providers.fireworksTier.label": "Fireworks 服务层级",
	"setting.providers.fireworksTier.description":
		"Fireworks 请求的服务路径。Priority 发送 `service_tier: priority`，高峰期可靠性更高但价格更高；Standard 省略该字段；`-fast` 模型忽略此设置",
	"setting.live.voice.label": "实时语音",
	"setting.live.voice.description": "Codex 实时语音会话使用的声音",
	"setting.providers.tts.label": "文本转语音 Provider",
	"setting.providers.tts.description":
		"tts 工具后端：本地设备端神经 TTS（Kokoro-82M）、xAI Grok Voice 或 DeepInfra 语音",
	"setting.tts.localModel.label": "本地 TTS 模型",
	"setting.tts.localModel.description": "本地 TTS 后端使用的设备端神经 TTS 模型（Kokoro-82M）",
	"setting.tts.localVoice.label": "本地 TTS 声音",
	"setting.tts.localVoice.description": "本地 TTS 后端使用的 Kokoro 声音（美式/英式、女声/男声）",
	"setting.speech.enabled.label": "语音播报",
	"setting.speech.enabled.description": "流式输出时通过扬声器朗读助手内容",
	"setting.speech.mode.label": "语音播报模式",
	"setting.speech.mode.description": "选择播报内容：all 为消息和思考，assistant 仅消息，yield 仅轮次结束的最终消息",
	"setting.speech.enhanced.label": "增强语音改写",
	"setting.speech.enhanced.description": "合成前使用 tiny/smol 模型将助手输出改写为自然口语；失败时回退到机械清理",
	"setting.speech.voice.label": "语音播报声音",
	"setting.speech.voice.description": "朗读助手输出时使用的 Kokoro 声音",
	"setting.providers.tinyModel.label": "Tiny Model",
	"setting.providers.tinyModel.description":
		"会话标题模型：默认使用在线 TINY 角色（否则 @smol），也可使用本地设备端模型",
	"setting.providers.tinyModelDevice.label": "Tiny Model 设备",
	"setting.providers.tinyModelDevice.description":
		"本地 Tiny Model（标题与记忆）的推理后端：ONNX 执行 Provider，或在 Apple silicon 上使用 MLX；PI_TINY_DEVICE 环境变量优先",
	"setting.providers.tinyModelDtype.label": "Tiny Model 精度",
	"setting.providers.tinyModelDtype.description":
		"本地 Tiny Model 的 ONNX 量化/精度；默认使用模型自带 dtype（q4）。MLX 后端忽略此设置；PI_TINY_DTYPE 环境变量优先",
	"setting.providers.unexpectedStopModel.label": "意外停止检测模型",
	"setting.providers.unexpectedStopModel.description":
		"智能意外停止检测分类器：默认使用在线 TINY 角色（否则 smol），也可使用本地设备端模型",
	"setting.providers.kimiApiFormat.label": "Kimi API 格式",
	"setting.providers.kimiApiFormat.description": "Kimi Code Provider 的 API 格式；auto 遵循实时模型元数据",
	"setting.providers.openaiWebsockets.label": "OpenAI WebSocket",
	"setting.providers.openaiWebsockets.description":
		"OpenAI Codex 模型的 WebSocket 策略：auto 使用模型默认值，on 强制启用，off 禁用",
	"setting.providers.cacheRetention.label": "提示缓存保留",
	"setting.providers.cacheRetention.description":
		"转发给支持该功能的 Provider（Anthropic、Bedrock、OpenRouter、OpenAI）的提示缓存保留策略",
	"setting.providers.streamFirstEventTimeoutSeconds.label": "流式首事件超时",
	"setting.providers.streamFirstEventTimeoutSeconds.description":
		"等待首个模型流事件的秒数；-1 使用 Provider/环境默认值，0 禁用监控",
	"setting.providers.streamIdleTimeoutSeconds.label": "流式空闲超时",
	"setting.providers.streamIdleTimeoutSeconds.description":
		"模型流事件间允许静默的秒数；-1 使用 Provider/环境默认值，0 禁用监控",
	"setting.providers.openrouterVariant.label": "OpenRouter 路由",
	"setting.providers.openrouterVariant.description":
		"附加到 OpenRouter 模型 ID 的默认路由变体后缀；选择器已指定变体时覆盖此设置",
	"setting.providers.fetch.label": "抓取 Provider",
	"setting.providers.fetch.description": "fetch/read URL 工具的读取后端优先级",
	"setting.codexResets.autoRedeem.label": "Codex 自动兑换已保存重置",
	"setting.codexResets.autoRedeem.description":
		"自动花费已保存的 Codex 限流重置：恢复因 5 小时或每周窗口耗尽而阻塞的账户，并挽救即将过期的额度；unset 首次询问，yes 自动花费，no 禁用",
	"setting.codexResets.minBlockedMinutes.label": "Codex 自动兑换最短阻塞时间",
	"setting.codexResets.minBlockedMinutes.description":
		"仅当自然解除阻塞至少还需此分钟数时自动兑换，避免为短暂等待消耗稀缺额度",
	"setting.codexResets.keepCredits.label": "Codex 自动兑换保留额度",
	"setting.codexResets.keepCredits.description":
		"自动花费后至少保留的重置数；0 表示可自动花掉最后一个。即将过期的额度不受此限制",
	"setting.codexResets.salvageHorizonHours.label": "Codex 重置挽救窗口",
	"setting.codexResets.salvageHorizonHours.description":
		"已保存的 Codex 重置将在此小时数内过期且聊天窗口有可恢复用量时自动花费；0 禁用",
	"setting.provider.appendOnlyContext.label": "仅追加上下文",
	"setting.provider.appendOnlyContext.description":
		"缓存系统提示和工具规范，并保留仅追加消息日志，使 DeepSeek、Xiaomi/SGLang、Anthropic 等 Provider 的前缀缓存最大命中；已知前缀缓存 Provider 自动启用",
	"setting.exa.enabled.label": "Exa",
	"setting.exa.enabled.description": "启用 Exa Web 搜索 Provider",
	"setting.exa.searchDelayMs.label": "Exa 搜索间隔",
	"setting.exa.searchDelayMs.description": "Exa Web 搜索请求之间的最小延迟（毫秒）；0 禁用限速",
	"setting.searxng.endpoint.label": "SearXNG 端点",
	"setting.searxng.endpoint.description": "用于 Web 搜索的自托管 SearXNG 实例基础 URL",
};

export default strings;
