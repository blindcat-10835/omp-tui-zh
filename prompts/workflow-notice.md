<system-notice>
用户消息包含 **workflowz** → 确定性多 subagent 工作流。2 个以上独立项默认使用 `workpool()`；仅对依赖耦合或返回 schema 的调用使用单个 `agent()` 句柄。

<when>
适用于大规模调研、审查、迁移、对抗性覆盖和开放式工作清单。快速查找/单次编辑：直接执行；不使用 agents。{{#if scoutAvailable}}先内联使用 Scout{{else}}先内联探索{{/if}} — 在创建 pool 前界定文件、调用点和契约范围。

Pool 优先的阶段：
- **理解**：排队子系统读取器 → 轮询 pool 任务 → 综合
- **审查**：每个视角/文件排队一个项 → 轮询 → 验证存活项
- **迁移**：发现站点 → 排队文件间不冲突的转换 → 一次性验证
- **调研**：排队模式/来源 → 深度阅读命中项 → 综合
- **设计**：排队独立的方案/裁判 → 选择并整合
</when>

<helpers>
状态在 `eval` 调用之间持续存在。每次调用提供：

- `workpool(agent=None, *, name=None, context=None{{#if evalTools}}, tools=None{{/if}})`: 保持活跃的 worker 池，受当前 `task.maxConcurrency` 约束。`.push(*items)` 返回项 ID；每个项分配给上下文负载最轻的空闲 worker，若容量未满则分配给新 worker，或进入繁忙 worker 的轮询队列。`eval.workpool.freshAgents=true` 则为每个项生成一个新 agent。`.status()` 报告计数/worker；`.peek()` 返回非消耗性的批次快照；`.close()` 丢弃排队的任务。
  - pool 名称是其后台任务 ID 和标签。在 pool 活跃时推送所有项；首次完全排空后该 pool 任务结算并关闭。排空后的新阶段/批次 → 创建新的命名 pool。
  - 结果自动投递。需要阻塞？离开 `eval`，然后以 `op:"wait", ids:["<pool-name>"]` 调用 `hub`；重新发起直到结算。绝不使用 `pool.wait()` 阻塞内核。
- `agent(prompt, *, agent=None, label=None, schema=None, isolated=None, apply=None, merge=None{{#if evalTools}}, tools=None{{/if}})`: 立即返回 `AgentHandle`；用于小型固定依赖图或当父级需要已校验的 `schema` 数据时。`.wait()` 返回文本/数据；`.handle` 是 `agent://<id>`。未 wait 的结果自动投递。
- `completion(prompt, *, model="default", system=None, schema=None)`: 立即返回 `CompletionHandle`，用于无工具的一次性调用。层级：`"smol"`、`"default"`、`"slow"`。
- `judge(state, questions)`: 立即返回 `JudgmentHandle`，用于对单个 state 提出带类型的 `choice`/`bool`/`score` 问题；`.wait()` 返回带概率的 `{id: answer}`。分类比 `completion()` 更省。
- `wait(handles, timeout=None, *, raise_errors=True)`: 仅用于 agent/completion/judgment handle 的有序屏障；`raise_errors=False` 在其槽位保留错误。
{{#if evalTools}}- `@tool` (Python) / `tool(fn, {…})` (JS): 通过 `tools=` 暴露的内核本地工具。用于跨 pool worker 的共享缓存、去重集合、评分或结构化累积；调用在 YOUR 内核中执行，抛出的异常返回给调用者而不杀死它。
{{/if}}- `log(message)`: 进度行。`phase(title)`: 状态树阶段。
- `budget`: Python 中为 `budget.total` / `budget.spent()` / `budget.remaining()`；JS 中 await 它们。用户 `+Nk` = 建议性；`+Nk!` = 硬性。
</helpers>

<pool-workflow>
1. 在生成前界定完整的独立工作清单。
2. 每个阶段创建一个显式命名的 pool。
3. 在一个 cell 中推送所有已知项；后续发现项可在 pool 任务仍在运行时推送。
4. 继续有用的本地工作。结果自动投递。
5. 完全阻塞？用 `ids:[pool-name]` 轮询 `hub wait`，绝不使用 `pool.wait()`。
6. 读取每个批次结果；由你验证和整合。

**Python:**

```python
phase("Review")
review = workpool({{#if scoutAvailable}}"scout", {{/if}}name="review", context="Return evidence with exact paths; do not edit.")
review.push(*[
    "Review authentication correctness",
    "Review authorization boundaries",
    "Review cancellation and cleanup",
    "Review performance regressions",
])
print(review.name)   # poll outside eval: hub wait, ids:["review"]
```

**JavaScript:**

```js
phase("Review");
const review = await workpool({{#if scoutAvailable}}"scout", {{/if}}{
    name: "review",
    context: "Return evidence with exact paths; do not edit.",
});
await review.push(
    "Review authentication correctness",
    "Review authorization boundaries",
    "Review cancellation and cleanup",
    "Review performance regressions",
);
console.log(review.name); // poll outside eval: hub wait, ids:["review"]
```

需要不消耗/投递结果的快照？`review.peek()`（JS: `await review.peek()`）。需要活动计数？`review.status()`。
</pool-workflow>

<dependencies>
仅当工作项 B 需要 A 的精确输出才能编写 B 时使用 handles：

```python
spec = agent("Extract the protocol", {{#if scoutAvailable}}agent="scout", {{/if}}schema=SPEC).wait()
impl = agent(f"Implement this protocol: {spec}")
result = impl.wait()
```

```js
const specHandle = await agent("Extract the protocol", { {{#if scoutAvailable}}agent: "scout", {{/if}}schema: SPEC });
const spec = await specHandle.wait();
const impl = await agent(`Implement this protocol: ${JSON.stringify(spec)}`);
const result = await impl.wait();
```

当每个结果必须作为结构化数据直接返回内核时，固定独立 handles 是可接受的。否则使用 pool。
</dependencies>

<patterns>
- **对抗性验证**：每个声明/视角排队一个 REFUTE 任务；只保留有证据支持的存活项。
- **多视角审查**：独立的正确性/安全/性能/复现项；绝不克隆一个模糊的提示。
- **评审团**：pool 方案，然后第一个 pool 结算后用第二个命名 pool 对它们评分。
- **循环直到枯竭**：当 pool 保持活跃时推送新发现的项；基于所有已见过的项去重。
- **多模态扫描**：按容器/按内容/按实体/按时间排队项。
- **完整性审查**：最后的 pool 项询问哪些模式/文件/声明尚未检查。
- **无静默上限**：如果采样/top-N 丢弃了工作，用 `log()` 记录被省略的内容。

规模：`"find any bugs"` → 小 pool。`"thoroughly audit"` → 大 pool + 单独的对抗性验证 pool。
</patterns>

<execution>
- 多阶段工作：在 `todo` 中记录。
- 每个 pool 项：自包含的目标、变更/读取范围、验收标准。
- 同一文件变更？一个 worker 独占；串行化共享边界。
- Pool 输出是证据，不是事实。读取产物、审查发现、自行运行最终验证。
- 持续直到关闭；排空的 pool 是阶段边界，不是任务完成。
</execution>
</system-notice>
