# Markdown It Setup 扩展

您可以自定义配置 MarkdownIt 实例，集成各种 markdown-exit 插件来扩展 Markdown 解析功能。

通过 `markdownItSetup`，您可以充分利用 markdown-exit 生态系统的强大功能。

## 数学公式渲染

下面的示例展示了如何集成 KaTeX 插件来渲染数学公式：

:::demo
markdown-it-setup/basic
:::

在这个例子中：

1. **导入插件**：从 `@mdit/plugin-katex` 导入 katex 插件
2. **配置 MarkdownIt**：通过 `markdownItSetup` 回调函数配置插件
3. **匹配渲染**：使用 `RendererTemplate` 匹配渲染

## 使用方法

由于 @vunk/markdown 会优先经历 [解析](../parse/+Page.md) 阶段，它并不会直接将文本转化为 HTML。

因此，您需要关注插件的解析结果：

+ `dev=true` 会展示 log 按钮, 点击后在 debug 控制台输入解析结果

+ 渲染时 warning 控制台会输出丢失的 `templateType`, 可以此来补充具体的渲染策略

通过 `md.renderer.render` 方法，可以将解析后的 Token 渲染为 HTML。
