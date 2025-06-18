<script lang="ts" setup>
import { katex } from '@mdit/plugin-katex'
import { VkMarkdown } from '@vunk/markdown'
import { ref } from 'vue'
import txt from './demo.txt?raw'

const data = ref(txt)
</script>

<template>
  <VkMarkdown
    :source="data"
    :markdown-it-setup="md => md.use(katex)"
    :dev="true"
  ></VkMarkdown>
</template>
