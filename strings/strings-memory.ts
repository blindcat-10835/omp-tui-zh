/**
 * TUI 简体中文汉化插件 — 记忆 (memory) 标签页映射
 *
 * 覆盖：General / Auto-Learn / Mnemopi / Hindsight / Sharpshooter
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
	"tab.memory": "记忆",
	"group.memory.General": "常规",
	"group.memory.Auto-Learn": "自动学习",
	"group.memory.Mnemopi": "Mnemopi",
	"group.memory.Hindsight": "Hindsight",
	"group.memory.Sharpshooter": "Sharpshooter",

	// ═══════════════════════════════════════════════════════════════════════
	// General (0)
	// ═══════════════════════════════════════════════════════════════════════
	"setting.memory.backend.label": "记忆后端",
	"setting.memory.backend.description": "关闭、本地摘要流水线、Mnemopi SQLite、Hindsight 远程记忆、或 Sharpshooter",

	"setting.providers.memoryModel.label": "记忆模型",
	"setting.providers.memoryModel.description":
		"Mnemopi 用于事实提取 + 整合的 LLM：默认线上（/models 中的 TINY 角色，否则 smol/remote），或本地设备模型",

	// ═══════════════════════════════════════════════════════════════════════
	// Auto-Learn (1)
	// ═══════════════════════════════════════════════════════════════════════
	"setting.autolearn.enabled.label": "自动学习（实验性）",
	"setting.autolearn.enabled.description": "代理停止后，提示它捕获经验到记忆并创建/增强隔离的托管技能",

	"setting.autolearn.autoContinue.label": "停止时自动运行捕获",
	"setting.autolearn.autoContinue.description":
		"开启时，在停止时自动运行一次私有捕获轮次（使用额外令牌）。关闭时，仅保留自动学习指导。",

	// ═══════════════════════════════════════════════════════════════════════
	// Mnemopi (2)
	// ═══════════════════════════════════════════════════════════════════════
	"setting.mnemopi.dbPath.label": "Mnemopi 数据库路径",
	"setting.mnemopi.dbPath.description": "可选 SQLite 数据库路径。默认为代理记忆目录。",

	"setting.mnemopi.bank.label": "Mnemopi 银行",
	"setting.mnemopi.bank.description": "可选共享银行基础名称。按项目模式从中派生项目本地银行。",

	"setting.mnemopi.scoping.label": "Mnemopi 作用域",
	"setting.mnemopi.scoping.description":
		"global = 一个共享银行；per-project = 按 cwd 隔离的每项目银行；per-project-tagged = 项目本地写入加上全局检索可见性",

	"setting.mnemopi.embeddingVariant.label": "嵌入变体",
	"setting.mnemopi.embeddingVariant.description":
		"本地嵌入模型家族。en = 更强的英语模型；multilingual = 跨语言模型。更改此内容将在下次启动时重建现有记忆嵌入。",

	"setting.mnemopi.autoRecall.label": "Mnemopi 自动检索",
	"setting.mnemopi.autoRecall.description": "将本地记忆检索到每会话首轮",

	"setting.mnemopi.autoRetain.label": "Mnemopi 自动保留",
	"setting.mnemopi.autoRetain.description": "将已完成的对话轮次保留到本地 Mnemopi 记忆",

	"setting.mnemopi.polyphonicRecall.label": "Mnemopi 复调检索",
	"setting.mnemopi.polyphonicRecall.description": "启用 4 声检索（向量、图、事实、时序）融合倒数排名融合",

	"setting.mnemopi.enhancedRecall.label": "Mnemopi 增强检索",
	"setting.mnemopi.enhancedRecall.description": "为重复和相似检索查询启用分层查询结果缓存",

	"setting.mnemopi.proactiveLinking.label": "Mnemopi 主动链接",
	"setting.mnemopi.proactiveLinking.description": "新记忆存储时将其摄入时序图中，链接到相关实体和记忆",

	"setting.mnemopi.noEmbeddings.label": "Mnemopi 禁用嵌入",
	"setting.mnemopi.noEmbeddings.description": "强制确定性仅 FTS 检索而非向量嵌入",

	"setting.mnemopi.embeddingModel.label": "Mnemopi 嵌入模型",
	"setting.mnemopi.embeddingModel.description":
		"高级：覆盖变体的显式嵌入模型 ID。留空以使用 mnemopi.embeddingVariant。",

	"setting.mnemopi.embeddingApiUrl.label": "Mnemopi 嵌入 API URL",
	"setting.mnemopi.embeddingApiUrl.description": "传递给 Mnemopi 的可选 OpenAI 兼容嵌入端点",

	"setting.mnemopi.embeddingApiKey.label": "Mnemopi 嵌入 API 密钥",
	"setting.mnemopi.embeddingApiKey.description": "传递给 Mnemopi 的可选嵌入 API 密钥",

	"setting.mnemopi.llmMode.label": "Mnemopi LLM 模式",
	"setting.mnemopi.llmMode.description":
		"使用无 LLM、线上小型模型（/models 中的 TINY 角色，否则 @smol）、或远程 OpenAI 兼容端点",

	"setting.mnemopi.llmBaseUrl.label": "Mnemopi LLM 基础 URL",
	"setting.mnemopi.llmBaseUrl.description": "Mnemopi 远程模式的可选 OpenAI 兼容 LLM 端点",

	"setting.mnemopi.llmApiKey.label": "Mnemopi LLM API 密钥",
	"setting.mnemopi.llmApiKey.description": "Mnemopi 远程模式的可选 LLM API 密钥",

	"setting.mnemopi.llmModel.label": "Mnemopi LLM 模型",
	"setting.mnemopi.llmModel.description": "Mnemopi 远程模式的可选 LLM 模型名称",

	// ═══════════════════════════════════════════════════════════════════════
	// Hindsight (3)
	// ═══════════════════════════════════════════════════════════════════════
	"setting.hindsight.apiUrl.label": "Hindsight API URL",
	"setting.hindsight.apiUrl.description": "Hindsight 服务器 URL（云服务或自托管）",

	"setting.hindsight.apiToken.label": "Hindsight API 令牌",
	"setting.hindsight.apiToken.description": "认证 Hindsight 服务器的 Bearer 令牌",

	"setting.hindsight.bankId.label": "Hindsight 银行 ID",
	"setting.hindsight.bankId.description": "记忆银行标识符（默认：项目名称）",

	"setting.hindsight.scoping.label": "Hindsight 作用域",
	"setting.hindsight.scoping.description":
		"global = 一个共享银行；per-project = 按 cwd 隔离的每项目银行；per-project-tagged = 带项目标签的共享银行，使全局 + 项目记忆在检索时合并",

	"setting.hindsight.autoRecall.label": "Hindsight 自动检索",
	"setting.hindsight.autoRecall.description": "在每会话首轮检索记忆",

	"setting.hindsight.autoRetain.label": "Hindsight 自动保留",
	"setting.hindsight.autoRetain.description": "每 N 轮和会话边界时保留转录",

	"setting.hindsight.retainMode.label": "Hindsight 保留模式",
	"setting.hindsight.retainMode.description": "full-session = 每会话一条文档 upsert，last-turn = 分块",

	"setting.hindsight.mentalModelAutoSeed.label": "Hindsight 思维模型自动种子",
	"setting.hindsight.mentalModelAutoSeed.description":
		"会话开始时，创建银行上尚不存在的内置思维模型（项目约定、项目决策、用户偏好）。",

	// ═══════════════════════════════════════════════════════════════════════
	// Sharpshooter (4)
	// ═══════════════════════════════════════════════════════════════════════
	"setting.sharpshooter.model.label": "Sharpshooter 模型",
	"setting.sharpshooter.model.description": "提取/整合的模型选择器，空 = smol 角色",
	// ── 补全（schema 对齐）──────────────────────────────────
	"setting.hindsight.mentalModelsEnabled.label": "回顾心智模型",
	"setting.hindsight.mentalModelsEnabled.description":
		"启动时把精选的反思摘要（心智模型）读入开发者指令。加载已有的模型集——不写入。与 hindsight.mentalModelAutoSeed 搭配可同时自动创建内置种子集。",
};

export default strings;
