---
title: TemplateEcharts
lang: zh-CN
---

# TemplateEcharts

TemplateEcharts 是一个用于在 Markdown 中渲染 ECharts 图表的模板组件。它支持使用 JSON 或 YAML 格式的配置来创建各种类型的图表。

## 基础用法

通过在 Markdown 中使用 `echarts` 容器标记，并提供 JSON 或 YAML 格式的 ECharts 配置，即可渲染图表。以下示例展示了如何创建一个基础柱状图：

:::demo
template-echarts/basic
:::

## 配置格式

TemplateEcharts 支持两种配置格式：

### JSON 格式

```json
{
  "title": {
    "text": "图表标题"
  },
  "series": [{
    "type": "bar",
    "data": [1, 2, 3, 4, 5]
  }]
}
```

### YAML 格式

```yaml
title:
  text: 图表标题
series:
  - type: bar
    data: [1, 2, 3, 4, 5]
```

## 注意事项

+ 可以通过 `css` 设置图表容器的高度。

```css
.vk-template-echarts__wrapper{
  height: 400px;
}
.vk-echart-x{
  height: 100%;
}
```
