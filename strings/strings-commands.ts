/**
 * TUI 简体中文映射：内置斜杠命令（斜杠命令 UI 文案）。
 *
 * 键格式（与宿主 command-ui.ts 的 `command.*` 约定一致）：
 *   command.<name>.description                    命令描述（TUI 自动补全 + ACP 对外描述）
 *   command.<name>.hint                           行内提示（TUI inlineHint / ACP input hint）
 *   command.<name>.subcommand.<sub>.description   子命令描述
 *
 * 命令名、别名、参数语法（尖括号 / 竖线 / 选项）、路径与代码标识保留原文；
 * 仅翻译人类可读的描述 / 提示文案。动态运行时状态（getTuiAutocompleteDescription）
 * 不走 ui-strings registry，不在此列。
 *
 * 命令清单与 src/slash-commands/builtin-*.ts 注册表一一对应：
 * 79 个命令、45 个提示、113 个子命令描述。
 * 由 test/slash-commands/command-ui-strings.test.ts 的行为测试保证 key 与真实注册表一致。
 */
const strings: Record<string, string> = {
	// ── 模式（builtin-modes.ts） ─────────────────────────────────
	"command.security.description": "规划、运行、检查、导入和对比 OMP 原生安全扫描",
	"command.security.hint": "<plan|scan|status|cancel|scans|show|import|export|validate|compare|disposition>",
	"command.security.subcommand.plan.description": "创建一个不可变的安全扫描计划",
	"command.security.subcommand.scan.description": "启动一个已规划或新建规划的本地扫描",
	"command.security.subcommand.status.description": "显示本地扫描操作状态",
	"command.security.subcommand.cancel.description": "取消一个运行中的本地扫描",
	"command.security.subcommand.scans.description": "列出已存储的项目安全扫描",
	"command.security.subcommand.show.description": "渲染一个扫描或 security:// 资源",
	"command.security.subcommand.import.description": "导入 SARIF 或 Codex Security 包",
	"command.security.subcommand.export.description": "导出规范包、SARIF 或报告",
	"command.security.subcommand.validate.description": "用 OMP 原生工具验证单个发现项",
	"command.security.subcommand.compare.description": "对比两次扫描的发现项谱系",
	"command.security.subcommand.disposition.description": "为发现项设置处置结论及理由",

	"command.settings.description": "打开设置菜单",

	"command.setup.description": "打开服务商配置",
	"command.setup.subcommand.providers.description": "配置登录与网页搜索服务商",

	"command.plan.description": "切换计划模式（agent 先规划再执行）",
	"command.plan.hint": "[prompt]",

	"command.plan-review.description": "重新打开最新计划的评审（仅限计划模式）",

	"command.vibe.description": "切换 vibe 模式（直接的持久化 fast/good worker 会话；只读工具集）",
	"command.vibe.hint": "[prompt]",

	"command.goal.description": "切换目标模式（本会话的持久化自主目标）",
	"command.goal.hint": "[objective]",
	"command.goal.subcommand.set.description": "设置或替换目标",
	"command.goal.subcommand.show.description": "显示当前目标详情",
	"command.goal.subcommand.pause.description": "暂停当前目标",
	"command.goal.subcommand.resume.description": "恢复已暂停的目标",
	"command.goal.subcommand.drop.description": "放弃当前目标",
	"command.goal.subcommand.budget.description": "调整 token 预算",

	"command.guided-goal.description": "让 agent 在聊天中访谈你，然后设置目标模式",
	"command.guided-goal.hint": "[粗略目标]",

	"command.loop.description":
		"切换循环模式。启用后，你发送的下一条提示会在每次 yield 后重新提交。Esc 取消当前迭代；再次 /loop 关闭。",
	"command.loop.hint": "[次数|时长] [提示]",

	"command.queue.description": "排队一条消息，待 agent yield 后发送",
	"command.queue.hint": "<message>",

	"command.model.description": "切换本会话的模型",

	"command.switch.description": "切换本会话的模型（等同 alt+p）；接受模糊 id、provider/id、@角色、:级别",
	"command.switch.hint": "[model]",

	"command.fast.description": "切换优先服务等级（OpenAI service_tier=priority，Anthropic speed=fast）",
	"command.fast.hint": "[on|off|status]",
	"command.fast.subcommand.on.description": "启用快速模式",
	"command.fast.subcommand.off.description": "禁用快速模式",
	"command.fast.subcommand.status.description": "显示快速模式状态",

	"command.skillful.description": "切换在 system prompt 中列出可用 skills（仅限本会话）",
	"command.skillful.hint": "[on|off|status]",
	"command.skillful.subcommand.on.description": "在本会话的 prompt 中列出 skills",
	"command.skillful.subcommand.off.description": "在本会话中省略 skills 列表",
	"command.skillful.subcommand.status.description": "显示 skill 列表状态",

	"command.extended-context.description": "切换扩展上下文窗口",
	"command.extended-context.hint": "[on|off|status]",
	"command.extended-context.subcommand.on.description": "启用更大的上下文窗口",
	"command.extended-context.subcommand.off.description": "使用默认或标准计价的上下文窗口",
	"command.extended-context.subcommand.status.description": "显示扩展上下文状态",

	"command.computer.description": "切换本会话的原生 computer-use 评测前置",
	"command.computer.hint": "[on|off|status]",
	"command.computer.subcommand.on.description": "在本会话启用 computer use",
	"command.computer.subcommand.off.description": "在本会话禁用 computer use",
	"command.computer.subcommand.status.description": "显示 computer use 状态",

	"command.prewalk.description": "在下一个动作时切换到快速/廉价模型（即使没有 --prewalk 也有效）",

	// ── 会话 / 协作（builtin-collaboration.ts） ──────────────────
	"command.advisor.description": "切换顾问（一个在每个回合评审并注入笔记的第二模型）",
	"command.advisor.hint": "[on|off|status|dump [raw]|configure]",
	"command.advisor.subcommand.on.description": "启用顾问",
	"command.advisor.subcommand.off.description": "禁用顾问",
	"command.advisor.subcommand.status.description": "显示顾问状态",
	"command.advisor.subcommand.dump.description": "把顾问的记录复制到剪贴板",
	"command.advisor.subcommand.configure.description": "打开顾问配置编辑器（TUI）",

	"command.export.description": "把会话导出为 HTML 文件",
	"command.export.hint": "[--themes] [path]",

	"command.trace.description": "在统计面板中打开本会话的 trace",

	"command.dump.description": "把会话记录复制到剪贴板（并把 LLM 请求 JSON 写入 tmp）",

	"command.share.description": "通过加密链接分享会话（share 服务或 secret gist）",

	"command.collab.description": "通过 relay 实时共享本会话",
	"command.collab.hint": "[start|view|stop|status] [relayUrl]",
	"command.collab.subcommand.view.description": "共享一个只读链接（访客可观看、不可提示）",
	"command.collab.subcommand.status.description": "显示链接 + 参与者",
	"command.collab.subcommand.stop.description": "停止共享",

	"command.join.description": "加入一个共享的协作会话",
	"command.join.hint": "<link>",

	"command.leave.description": "离开协作会话",

	"command.browser.description": "切换 browser 评测前置的无头 / 可见模式",
	"command.browser.hint": "[headless|visible]",
	"command.browser.subcommand.headless.description": "切换到无头模式",
	"command.browser.subcommand.visible.description": "切换到可见模式",

	"command.copy.description": "从会话中选取文本或代码以复制",

	"command.open.description": "在浏览器中打开会话里的最后一个链接（或用 /copy 选取一个）",

	// ── 会话管理（builtin-session.ts） ───────────────────────────
	"command.todo.description": "查看或修改 agent 的 todo 清单",
	"command.todo.hint": "<subcommand>",
	"command.todo.subcommand.edit.description": "在 $EDITOR 中打开 todos（Markdown 往返）",
	"command.todo.subcommand.copy.description": "把 todos 作为 Markdown 复制到剪贴板",
	"command.todo.subcommand.expand.description": "在 HUD 中展开每个阶段与任务",
	"command.todo.subcommand.collapse.description": "恢复有界的 HUD 预览",
	"command.todo.subcommand.export.description": "把 todos 写为 Markdown 文件（默认：TODO.md）",
	"command.todo.subcommand.import.description": "从 Markdown 文件替换 todos（默认：TODO.md）",
	"command.todo.subcommand.append.description": "追加一个任务；阶段模糊匹配或自动创建",
	"command.todo.subcommand.start.description": "标记任务为 in_progress（模糊匹配）",
	"command.todo.subcommand.done.description": "标记任务/阶段/全部为已完成（模糊匹配）",
	"command.todo.subcommand.drop.description": "标记任务/阶段/全部为已放弃（模糊匹配）",
	"command.todo.subcommand.rm.description": "删除任务/阶段/全部（模糊匹配）",

	"command.session.description": "会话管理命令",
	"command.session.hint": "[info|delete|pin [account]]",
	"command.session.subcommand.info.description": "显示会话信息与统计",
	"command.session.subcommand.delete.description": "删除当前会话并返回选择器",
	"command.session.subcommand.pin.description": "把当前服务商固定到一个已存储的 OAuth 账号",

	"command.jobs.description": "显示异步后台作业状态",

	"command.usage.description": "显示服务商用量与限额",
	"command.usage.hint": "[show|reset [account|active]]",
	"command.usage.subcommand.show.description": "显示服务商用量与限额",
	"command.usage.subcommand.reset.description": "花费一个已保存的 Codex 速率限制重置",

	"command.stats.description": "启动本地统计面板",
	"command.stats.hint": "[--port <port>] [--host <host>]",

	"command.changelog.description": "显示更新日志条目",
	"command.changelog.hint": "[full]",
	"command.changelog.subcommand.full.description": "显示完整更新日志",

	"command.hotkeys.description": "显示所有键盘快捷键",

	"command.tools.description": "显示当前 agent 可见的工具",

	"command.context.description": "显示估算的上下文用量分布",

	"command.extensions.description": "打开扩展控制中心面板",

	"command.agents.description": "打开 agents hub（每个 agent 的模型、prewalk 与顾问）",

	"command.git.description": "打开 git 界面（分栏 diff 查看、暂存、提交编辑器）",
	"command.git.hint": "[revision]",

	"command.hub.description": "打开实时 Agent Hub",

	"command.branch.description": "回退到之前的一条消息，保留旧路径作为分支",

	"command.fork.description": "从之前的一条消息创建新 fork",

	"command.tree.description": "导航会话树（切换分支）",

	"command.login.description": "用 OAuth 服务商登录",
	"command.login.hint": "[provider|redirect URL]",

	"command.logout.description": "从 OAuth 服务商登出",
	"command.logout.hint": "[provider]",

	"command.mcp.description": "管理 MCP 服务器（添加、列出、移除、测试）",
	"command.mcp.hint": "<subcommand>",
	"command.mcp.subcommand.add.description": "添加一个新的 MCP 服务器",
	"command.mcp.subcommand.list.description": "列出所有已配置的 MCP 服务器",
	"command.mcp.subcommand.remove.description": "移除一个 MCP 服务器",
	"command.mcp.subcommand.test.description": "测试到一个服务器的连接",
	"command.mcp.subcommand.reauth.description": "为一个服务器重新授权 OAuth",
	"command.mcp.subcommand.unauth.description": "移除一个服务器的 OAuth 授权",
	"command.mcp.subcommand.enable.description": "启用一个 MCP 服务器",
	"command.mcp.subcommand.disable.description": "禁用一个 MCP 服务器",
	"command.mcp.subcommand.smithery-search.description": "搜索 Smithery 注册表并部署一个 MCP 服务器",
	"command.mcp.subcommand.smithery-login.description": "登录 Smithery 并缓存 API key",
	"command.mcp.subcommand.smithery-logout.description": "移除已缓存的 Smithery API key",
	"command.mcp.subcommand.reconnect.description": "重连到一个特定的 MCP 服务器",
	"command.mcp.subcommand.reload.description": "强制重新加载 MCP 运行时工具",
	"command.mcp.subcommand.resources.description": "列出已连接服务器的可用资源",
	"command.mcp.subcommand.prompts.description": "列出已连接服务器的可用 prompts",
	"command.mcp.subcommand.notifications.description": "显示通知能力与订阅",
	"command.mcp.subcommand.help.description": "显示帮助信息",

	// ── 生命周期（builtin-lifecycle.ts） ─────────────────────────
	"command.ssh.description": "管理 SSH 主机（添加、列出、移除）",
	"command.ssh.hint": "<subcommand>",
	"command.ssh.subcommand.add.description": "添加一个 SSH 主机",
	"command.ssh.subcommand.list.description": "列出所有已配置的 SSH 主机",
	"command.ssh.subcommand.remove.description": "移除一个 SSH 主机",
	"command.ssh.subcommand.help.description": "显示帮助信息",

	"command.new.description": "开始一个新会话",

	"command.fresh.description": "重置服务商流状态，不改变本地记录",

	"command.clear.description": "就地清空对话上下文，保留会话",

	"command.drop.description": "删除当前会话并开始一个新会话",

	"command.compact.description": "手动压缩会话上下文",
	"command.compact.hint": "[soft|remote|snapcompact] [focus]",
	"command.compact.subcommand.soft.description": "用当前模型在本地做摘要（跳过服务端压缩）",
	"command.compact.subcommand.remote.description": "通过 OpenAI 兼容的服务端压缩做摘要，然后回退到本地摘要",
	"command.compact.subcommand.snapcompact.description": "把历史归档到密集位图（模型回读，无 LLM 调用）",

	"command.shake.description": "丢弃上下文中的重内容（工具结果、大块）",
	"command.shake.hint": "[elide|images|thinking]",
	"command.shake.subcommand.elide.description": "剥离工具结果 + 大块（默认）",
	"command.shake.subcommand.images.description": "剥离图片块",
	"command.shake.subcommand.thinking.description": "丢弃所有 thinking 块",

	"command.handoff.description": "把会话上下文交接给一个新会话",
	"command.handoff.hint": "[聚焦说明]",

	"command.resume.description": "恢复另一个会话",
	"command.resume.hint": "[session id|@claude|@codex]",

	"command.pin.description": "在恢复列表顶部置顶或取消置顶一个会话",
	"command.pin.hint": "[session id]",

	"command.btw.description": "用当前会话上下文问一个临时旁支问题",
	"command.btw.hint": "<question>",

	"command.tan.description": "为一个旁支工作运行一个完整的后台 agent",
	"command.tan.hint": "<work>",

	"command.omfg.description": "从一次抱怨锻造一条 TTSR 规则，以阻止反复出现的行为",
	"command.omfg.hint": "<complaint>",

	"command.cleanse.description": "用加权并行子 agent 检测并修复项目诊断",
	"command.cleanse.hint": "[request] [--all]",

	"command.retry.description": "重试上一个失败的 agent 回合",

	"command.debug.description": "打开调试工具选择器",

	"command.memory.description": "检查并操作内存维护",
	"command.memory.hint": "<subcommand>",
	"command.memory.subcommand.view.description": "显示当前内存注入负载",
	"command.memory.subcommand.stats.description": "显示内存后端统计",
	"command.memory.subcommand.diagnose.description": "运行内存后端诊断",
	"command.memory.subcommand.queue.description": "显示待整合的内存增量",
	"command.memory.subcommand.sync.description": "立即运行内存整合",
	"command.memory.subcommand.clear.description": "清空持久化的内存数据与产物",
	"command.memory.subcommand.reset.description": "clear 的别名",
	"command.memory.subcommand.enqueue.description": "入队一次内存整合维护",
	"command.memory.subcommand.rebuild.description": "enqueue 的别名",
	"command.memory.subcommand.mm list.description": "列出活跃 bank 上的心智模型",
	"command.memory.subcommand.mm show.description": "显示一个心智模型（需要 id）",
	"command.memory.subcommand.mm refresh.description": "全 bank 刷新自动刷新模型，或按 id 刷新一个模型",
	"command.memory.subcommand.mm history.description": "对比一个心智模型的变更历史",
	"command.memory.subcommand.mm seed.description": "创建任何缺失的内置心智模型",
	"command.memory.subcommand.mm delete.description": "从 bank 删除一个心智模型（需要 id）",
	"command.memory.subcommand.mm reload.description": "重新拉取缓存的 <mental_models> 块",

	"command.rename.description": "重命名当前会话",
	"command.rename.hint": "<title>",

	"command.move.description": "把当前会话移动到一个不同目录",
	"command.move.hint": "[<path>]",

	"command.wt.description": "把本会话移入一个新 worktree（含改动）",
	"command.wt.hint": "[<branch>]",

	"command.add-dir.description": "给本会话添加一个工作区目录（多根）",
	"command.add-dir.hint": "<path>",

	"command.remove-dir.description": "从本会话移除一个工作区目录",
	"command.remove-dir.hint": "<path>",

	"command.dirs.description": "列出本会话的工作区目录",

	"command.exit.description": "退出应用",

	"command.restart.description": "用相同启动参数重启 omp，并恢复本会话",

	// ── 插件 / 市场（builtin-marketplace.ts） ─────────────────────
	"command.marketplace.description": "管理市场插件源与已安装插件",
	"command.marketplace.hint": "<subcommand>",
	"command.marketplace.subcommand.add.description": "添加一个市场源",
	"command.marketplace.subcommand.remove.description": "移除一个市场源",
	"command.marketplace.subcommand.update.description": "更新市场目录",
	"command.marketplace.subcommand.list.description": "列出已配置的市场",
	"command.marketplace.subcommand.discover.description": "浏览可用插件",
	"command.marketplace.subcommand.install.description": "安装一个插件（无参数时交互式浏览）",
	"command.marketplace.subcommand.uninstall.description": "卸载一个插件（无参数时选择器）",
	"command.marketplace.subcommand.installed.description": "列出已安装的市场插件",
	"command.marketplace.subcommand.upgrade.description": "升级过期的插件",
	"command.marketplace.subcommand.help.description": "显示使用指南",

	"command.plugins.description": "查看和管理已安装插件",
	"command.plugins.hint": "[list|enable|disable]",
	"command.plugins.subcommand.list.description": "列出所有已安装插件（npm + 市场）",
	"command.plugins.subcommand.enable.description": "启用一个市场插件",
	"command.plugins.subcommand.disable.description": "禁用一个市场插件",

	"command.reload-plugins.description": "重新加载所有插件（skills、commands、hooks、tools、agents、MCP）",

	// ── 控制（builtin-control.ts） ───────────────────────────────
	"command.force.description": "强制下一回合使用特定工具",
	"command.force.hint": "<tool-name> [prompt]",

	"command.live.description": "启动 Codex 支持的实时语音模式",

	"command.pause.description": "冻结所有 agent（主、子 agent、顾问），直到恢复",

	"command.quit.description": "退出应用",
};

export default strings;
