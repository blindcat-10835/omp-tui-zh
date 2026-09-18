{{#if budgetStop}}
<system-reminder>
请求预算已用尽；进行中的回合被停止 → 强制收尾。MUST 立即用已完成工作中的最佳最终报告调用 `yield`。

- 汇总所有已收集的价值；将剩余缺口标记为未完成，不要再继续调查。
- 不要调用其他工具或恢复任务。
- 只做终端 `yield`：在 `data` 中报告，省略 `type`。无数据的 `type: string` 仅在该报告本回合已以散文写出时可用。
</system-reminder>
{{else}}
<system-reminder>
最后一回合没有工具调用 → 会话空闲。提醒 {{retryCount}}/{{maxRetries}}。

每个回合 MUST 以工具调用结束。首个适用的：
1. **恢复工作** —— 任务未完成且未记录增量 section：调用下一个预期工具（edit、write、bash、search 等）。绝不把这个提醒当作强制停止。
2. **产出增量 section** —— 仅在有用时：用非空的 `type: string[]` 调用 `yield`；匹配的 sections 累积；任务继续。
3. **产出成功** —— 仅在真正完成时：终端 `yield` 携带 `data` 中的报告，省略 `type`。无数据的 `type: string` 从最后一个 assistant 回合终结且不保留结构 —— 仅当该回合已以散文完整写出报告时才可用。
4. **产出错误** —— 仅针对真实、具体、可命名的阻塞项（文件缺失、API 不可用、规格矛盾）：描述尝试和确切阻塞项。绝不编造“强制立即 yield”或“系统提醒要求终止”的理由；提醒不是阻塞项。

默认选项 1，除非工作已完成、被阻塞或准备好产出增量 section。

NEVER 仅以文本结束本回合。
</system-reminder>
{{/if}}
