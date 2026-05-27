---
seo:
  title: '@vunk/markdown'
  description: 基于 markdown-exit 的增强型 Markdown 渲染库，让 Markdown 在 Vue 3 中变成可组合、可扩展、可交互的组件界面。
---

::u-page-hero{class="dark:bg-gradient-to-b from-neutral-950 via-neutral-950 to-primary-950/20"}
---
orientation: horizontal
ui:
  container: lg:py-20
---
#top
:hero-background

#title
@vunk/markdown

#description
:::motion
---
transition: { duration: 0.6, delay: 0.25 }
---
`@vunk/markdown` 基于 `markdown-exit` 构建，面向 Vue 3、AI 输出内容与富文本业务场景。它不是把 Markdown 变成静态 HTML，而是通过解析器、渲染策略与模板系统，把文本组织成可交互、可扩展、可复用的组件树。
:::

#links
:::motion{class="flex flex-wrap gap-x-6 gap-y-3"}
---
transition: { duration: 0.6, delay: 0.45 }
---
  ::::u-button
  ---
  to: /docs/guide/start/introduction
  size: xl
  trailing-icon: i-lucide-arrow-right
  ---
  开始阅读
  ::::

  ::::u-button
  ---
  to: /docs/component/basic/markdown
  color: neutral
  variant: outline
  size: xl
  ---
  查看组件
  ::::
:::

#default
:home
::

::u-page-section{class="dark:bg-neutral-950"}
#title
为现代 Markdown 场景设计

#links
  :::u-button
  ---
  color: neutral
  size: lg
  to: /docs/guide/basic/render
  trailingIcon: i-lucide-arrow-right
  variant: subtle
  ---
  了解渲染机制
  :::

#features
  :::u-page-feature
  ---
  icon: i-lucide-box
  ---
  #title
  输出 Vue 组件树

  #description
  不再停留在 HTML 字符串层，而是直接生成可组合的 Vue 渲染结果，更容易接入现有业务组件。
  :::

  :::u-page-feature
  ---
  icon: i-lucide-layers-3
  ---
  #title
  策略化渲染模板

  #description
  通过 `StrategyRenderer` 与模板组件组合渲染规则，让默认 Markdown、容器、围栏代码块都能按业务方式输出。
  :::

  :::u-page-feature
  ---
  icon: i-lucide-tag
  ---
  #title
  标签与容器扩展

  #description
  可定制 tag、fence、container 三类入口，把表格、代码块或自定义语法升级成真正的组件节点。
  :::

  :::u-page-feature
  ---
  icon: i-lucide-bolt
  ---
  #title
  兼容异步渲染

  #description
  支持 `renderAsync` 工作流，适合需要远程数据、动态模板或流式内容更新的页面。
  :::

  :::u-page-feature
  ---
  icon: i-lucide-braces
  ---
  #title
  结构化内容友好

  #description
  内置 `resolver-json`、`resolver-toon` 等解析能力，适合把 Markdown 与结构化协议一起渲染。
  :::

  :::u-page-feature
  ---
  icon: i-lucide-puzzle
  ---
  #title
  模板可按需拼装

  #description
  可以从默认模板起步，再按业务需要叠加图表、表单、Mermaid 等模板，不必重写整个渲染链路。
  :::
::

::u-page-section{class="dark:bg-neutral-950"}
#title
从 Markdown 到交互界面的完整链路

#links
  :::u-button
  ---
  color: neutral
  size: lg
  to: /docs/guide/basic/parse
  trailingIcon: i-lucide-arrow-right
  variant: subtle
  ---
  查看解析流程
  :::

#features
  :::u-page-feature
  ---
  icon: i-lucide-file-text
  ---
  #title
  Parse

  #description
  基于 `markdown-it` 与 `markdown-exit` 把 Markdown 文本转换为可继续处理的 token 与树状结构。
  :::

  :::u-page-feature
  ---
  icon: i-lucide-network
  ---
  #title
  GroupToken

  #description
  将扁平 token 重组为嵌套节点，为后续模板匹配和复杂组件渲染提供稳定的数据结构。
  :::

  :::u-page-feature
  ---
  icon: i-lucide-waypoints
  ---
  #title
  Renderer Dispatch

  #description
  渲染阶段按 `templateType` 分发到不同模板，让一个 Markdown 文档可以同时包含多种渲染策略。
  :::

  :::u-page-feature
  ---
  icon: i-lucide-file-json
  ---
  #title
  Resolver

  #description
  结构化文本可进一步交给 resolver 解析，补齐 JSON、TOON 等内容向业务组件的映射关系。
  :::

  :::u-page-feature
  ---
  icon: i-lucide-scan-search
  ---
  #title
  Template Match

  #description
  默认模板、容器模板和围栏模板各自处理不同节点类型，保持扩展点清晰、职责稳定。
  :::

  :::u-page-feature
  ---
  icon: i-lucide-refresh-cw
  ---
  #title
  Async Update

  #description
  当内容或依赖异步到达时，渲染链路仍可保持一致，适合 AI 对话、远程协议和流式页面。
  :::
::

::u-page-section{class="dark:bg-neutral-950"}
#title
内置模板覆盖常见业务表达

#links
  :::u-button
  ---
  color: neutral
  size: lg
  to: /docs/component/template/template-echarts
  trailingIcon: i-lucide-arrow-right
  variant: subtle
  ---
  浏览模板组件
  :::

#features
  :::u-page-feature
  ---
  icon: i-lucide-book-open-text
  ---
  #title
  Markdown 基础渲染

  #description
  `Markdown`、`TemplatesDefault` 与 `TemplatesContainer` 负责把常规文档与容器语法稳妥落地到 Vue 页面。
  :::

  :::u-page-feature
  ---
  icon: i-lucide-chart-column
  ---
  #title
  图表与数据看板

  #description
  `TemplateEcharts` 支持直接在 Markdown 中声明 ECharts 配置，适合报表、分析页和 AI 生成图表场景。
  :::

  :::u-page-feature
  ---
  icon: i-lucide-git-branch-plus
  ---
  #title
  架构图与流程图

  #description
  `TemplateMermaid` 可把 Mermaid 代码块转成图形化表达，用于系统设计、流程说明和知识库文档。
  :::

  :::u-page-feature
  ---
  icon: i-lucide-clipboard-list
  ---
  #title
  协议驱动表单

  #description
  `TemplateForm` 让表单配置可以直接写进内容层，适合配置后台、运营页面和低代码式输入界面。
  :::

  :::u-page-feature
  ---
  icon: i-lucide-sparkles
  ---
  #title
  AI 可视化表达

  #description
  `TemplateVis` 面向更丰富的内容表达，适合把模型输出转换为可阅读、可解释的可视化结果。
  :::

  :::u-page-feature
  ---
  icon: i-lucide-panels-top-left
  ---
  #title
  跨组件库接入

  #description
  文档中已经覆盖 Element Plus、AntX、地图等示例，说明渲染结果可以继续挂接到现有业务 UI 体系中。
  :::
::
