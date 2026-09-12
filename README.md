# tui-zh — TUI 简体中文汉化插件

将 [oh-my-pi](https://github.com/can1357/oh-my-pi) Coding Agent 的设置面板、界面文案与系统提示词模板替换为简体中文。

独立发布包，无运行时依赖（唯一宿主引用为 `import type`，加载时擦除）。

## 安装

### 方式一：从 git 仓库安装（推荐，可在 Settings → 插件 中管理）

```sh
omp plugin install https://git.codehub.xfusion.com/PureAI/omp-tui-zh.git
```

> CodeHub 私有仓库：`bun install` 经 git 拉取，需本机 git 凭据可用
> （`~/.git-credentials` 或 credential helper 已存 `git.codehub.xfusion.com` 的凭据）。
> `github:user/repo` 简写仅适用于 GitHub，私有 Git 源请使用完整 URL。

安装后插件出现在 `~/.omp/plugins/node_modules/@oh-my-pi/tui-zh/`，
设置面板的 **插件** 标签页中可启用/禁用。

### 方式二：手动放置

1. 将此文件夹复制到 `~/.omp/agent/extensions/tui-zh/`，或
2. 通过命令行参数 `--extension ./path/to/tui-zh` 加载

> 两种方式使用相同代码。若同时用两种方式（git 安装 + 手动放置），
> 删除 `~/.omp/agent/extensions/tui-zh/` 以避免重复加载（文案相同不会出错，但工厂函数会执行两次）。

## 功能

- 所有标签页标题（外观、模型、交互、上下文、记忆、文件、Shell、工具、任务、服务、插件）
- 各标签页分组标题（group.* 键，修复了宿主端转义模板导致键失配的回归）
- 设置面板 chrome 文案（标题、搜索提示、底部提示语、匹配计数）
- 一组完整设置项的 label/description
- 系统提示词模板汉化（`registerPromptOverrides`，`transform` 块级合并：上游英文模板按空行分块，命中 `src/translations.json` 映射则整块替换为中文，未命中块原样保留英文——上游新增内容自动保留、重写的旧内容不会错译）
- 内置 agent 提示词（task/scout/reviewer/security-reviewer/sonic）同机制汉化

## 扩展

你可以自定义或扩展此插件中的文案映射。每个 `strings` 条目使用稳定的 key：

```ts
import type { ExtensionAPI } from "@oh-my-pi/pi-coding-agent";

export default function (pi: ExtensionAPI): void {
  pi.registerUiStrings({
    strings: {
      // 标签页
      "tab.appearance": "外观",
      "tab.model": "模型",

      // 设置项 — 使用 setting.<path>.label / setting.<path>.description
      "setting.compaction.enabled.label": "启用压缩",
      "setting.compaction.enabled.description": "自动压缩上下文...",

      // 分组名称 — 使用 group.<tab>.<group>
      "group.appearance.Theme": "主题",
    },
  });
}
```

### Key 约定

| 前缀 | 用途 | 示例 |
|------|------|------|
| `tab.` | 标签页标题 | `tab.model` → "模型" |
| `setting.<path>.label` | 设置项显示名称 | `setting.theme.dark.label` → "深色主题" |
| `setting.<path>.description` | 设置项描述 | `setting.theme.dark.description` → "深色模式" |
| `group.<tab>.<group>` | 分组名称 | `group.appearance.Theme` → "主题" |
| `settings.*` | 面板 chrome | `settings.title` → "设置" |
| `settings.hint.*` | 底部提示语 | `settings.hint.search` → "Enter 修改..." |
| `settings.match.*` | 匹配计数 | `settings.match.one` → "1 个匹配" |

### 注意事项

- 空 key 或空值会被静默跳过
- 后注册的覆盖先注册的
- 插件禁用/重载时，其注册的文案会被清除
- 对旧版本宿主（无 `registerPromptOverrides`）做了 `typeof` 守卫，提示词汉化静默跳过，UI 汉化不受影响

## 提示词同步工作流

上游英文模板变更后：

```sh
bun run sync:check            # 漂移检查：报告未覆盖的块（行号+原文），无漂移 exit 0
```

报告中的每个块是上游新增/重写的段落：

1. 把译文补入 `src/translations.json`（键 = 规范化后的英文块内容，值 = 中文行数组；重复块键带 `#N` 后缀）；
2. 或更新 `prompts/*.md` 冻结副本后 `bun run sync:build` 重新生成映射；
3. 再跑 `sync:check` 确认零漂移。

运行时行为保证：未翻译块保留英文（自动跟随上游新内容），已翻译块命中即替换——不会静默错译，也不会丢失上游更新。

## 兼容性

- 需要 OMP 宿主提供 `ExtensionAPI.registerUiStrings`（18.x+）
- 提示词翻译映射 `src/translations.json` 基于某次上游英文基线生成（`prompts/*.md` 为对应的冻结中文参考副本）；上游提示词变更时运行 `bun run sync:check` 检出漂移块，补译后重新生成
