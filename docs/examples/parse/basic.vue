<script lang="ts" setup>
import { VkMarkdown } from '@vunk/markdown'
import { VkMonacoEditor } from '@vunk/plus/components/monaco-editor'
import { ref } from 'vue'

const source = ref(
  `# 标题一级

这是一个段落，包含 **粗体文本** 和 *斜体文本*，还有 \`行内代码\`。

[百度](https://www.baidu.com)

![图片示例](https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg)

- 无序列表项 1
- 无序列表项 2
  - 嵌套列表项 2.1
  - 嵌套列表项 2.2
- 无序列表项 3

1. 有序列表项 1
2. 有序列表项 2
3. 有序列表项 3

> 这是一个引用块
> 可以包含多行内容

\`\`\`javascript
function hello() {
  console.log('Hello, Vunk Markdown!')
  return 'parsed successfully'
}
\`\`\`



| 表头1 | 表头2 | 表头3 |
|-------|-------|-------|
| 单元格1 | 单元格2 | 单元格3 |
| 数据A | 数据B | 数据C |

`,
)
</script>

<template>
  <div sk-flex h-400px>
    <VkMonacoEditor
      v-model="source"
      flex-1
      :default-options="{
        language: 'markdown',
      }"
    ></VkMonacoEditor>
    <el-scrollbar h-full flex-1>
      <VkMarkdown :source="source" dev></VkMarkdown>
    </el-scrollbar>
  </div>
</template>
