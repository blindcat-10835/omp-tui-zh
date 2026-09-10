/** TUI 简体中文映射：Shell标签页。 */
const strings: Record<string, string> = {
	"group.shell.Bash": "Bash",
	"group.shell.Eval & Runtimes": "Eval 与运行时",
	"setting.bash.enabled.label": "Bash",
	"setting.bash.enabled.description": "启用 bash 工具执行 shell 命令",
	"setting.bash.allowCompoundCommands.label": "允许复合命令",
	"setting.bash.allowCompoundCommands.description": "每命令评估字面 && 链；不匹配的命令使用正常 bash 审批策略和模式",
	"setting.bash.autoBackground.enabled.label": "Bash 自动后台化",
	"setting.bash.autoBackground.enabled.description": "自动将长时间运行的 bash 命令后台化，稍后返回结果",
	"setting.bash.patterns.label": "Bash 审批规则",
	"setting.bash.patterns.description": "有序 bash 命令审批规则。每项含 match 和 approval 字段；仅支持 '*' 通配符。",
	"setting.bashInterceptor.enabled.label": "Bash 拦截器",
	"setting.bashInterceptor.enabled.description": "阻止有专用工具的 shell 命令",
	"setting.bash.direnv.label": "direnv 自动加载",
	"setting.bash.direnv.description":
		"自动加载仓库的 direnv/devenv `.envrc` 到 bash 会话中，使 devenv 工具和 env 变量无需手动 `direnv exec` 即可用。遵循 direnv 的白名单：未 `direnv allow` 过的 `.envrc` 绝不会执行",
	"setting.bash.direnvLoadTimeoutMs.label": "direnv 加载超时（毫秒）",
	"setting.bash.direnvLoadTimeoutMs.description":
		"首次 `direnv export` 的最大等待时间（冷启动 devenv 壳可能较慢）；超时后会话在无 direnv 环境下运行",
	"setting.shellMinimizer.enabled.label": "Shell 精简器",
	"setting.shellMinimizer.enabled.description": "在返回给 agent 之前压缩冗长的 shell 输出（git、npm、cargo 等）",
	"setting.shellMinimizer.sourceOutlineLevel.label": "Shell 精简器源码大纲",
	"setting.shellMinimizer.sourceOutlineLevel.description": "cat/read 源码文件时的大纲模式：默认或激进",
	"setting.eval.py.label": "Python Eval 后端",
	"setting.eval.py.description": "允许 eval 工具将 Python 单元分派到 IPython 内核",
	"setting.eval.js.label": "JavaScript Eval 后端",
	"setting.eval.js.description": "允许 eval 工具将 JavaScript 单元分派到进程内运行时",
	"setting.eval.tools.enabled.label": "Eval 定义的工具",
	"setting.eval.tools.enabled.description":
		"让 eval 单元定义工具（Python 中的 @tool，JS 中的 tool(fn)），task、agent() 和 workpool() 子 agent 可调用",
	"setting.eval.workpool.freshAgents.label": "新建 Workpool Agent",
	"setting.eval.workpool.freshAgents.description": "为每个 workpool 项生成新子 agent，而非重用工作进程或批量排队项",
	"setting.eval.autoBackground.enabled.label": "Eval 自动后台化",
	"setting.eval.autoBackground.enabled.description": "自动将长时间运行的 eval 单元后台化，稍后返回结果",
	"setting.python.kernelMode.label": "Python 内核模式",
	"setting.python.kernelMode.description": "在 eval 调用之间保持 IPython 内核存活，或每次启动新的",
	"setting.python.interpreter.label": "Python 解释器",
	"setting.python.interpreter.description": "可选的精确 Python 可执行文件路径。设置后跳过自动 Python 运行时发现。",
};

export default strings;
