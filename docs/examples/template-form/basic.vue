<script lang="ts" setup>
import type { NormalObject } from '@vunk/shared'
import { VkTemplateForm } from '@vunk-markdown/components/template-form'
import { setData } from '@vunk/core'
import { VkfRendererData } from '@vunk/form/components/renderer-data'
import { VkMarkdown } from '@vunk/markdown'
import { ElForm } from 'element-plus'
import { computed, ref } from 'vue'
import formItems from './vunk-form.json?raw'

const data = `
# Template Form Example
:::form
\`\`\`json 
${formItems}
\`\`\`
:::
`

const formdata = ref<NormalObject>({})

const currentIndex = ref(10)
const currentText = computed(() => {
  return data.slice(0, currentIndex.value)
})

const interval = setInterval(() => {
  if (currentIndex.value < data.length) {
    currentIndex.value += 5
  }
  else {
    clearInterval(interval)
  }
}, 60)
</script>

<template>
  <p>
    当前表单数据：
    <br />
    {{ formdata }}
  </p>
  <ElForm :model="formdata" label-width="100px">
    <VkfRendererData :data="formdata" @set-data="setData(formdata, $event)">
      <VkMarkdown :source="currentText" :containers="['form']">
        <VkTemplateForm></VkTemplateForm>
      </VkMarkdown>
    </VkfRendererData>
  </ElForm>
</template>
