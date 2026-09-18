## 现有方案

已批准的方案内联如下；持久副本位于 `{{planFilePath}}`（内容一致）。

<plan path="{{planFilePath}}">
{{planContent}}
</plan>

<instruction>
与当前工作相关且未完成 → 必须继续执行。
已过时或不相关 → 必须忽略。
内联方案完整时，绝不重新读取 `{{planFilePath}}`。
内联内容被压缩、过期或不可恢复 → 绝不停止；读取 `{{planFilePath}}`。
</instruction>
