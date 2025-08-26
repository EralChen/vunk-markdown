<script lang="ts" setup>
import { codeToHtml } from 'shiki'
import { ref, watchEffect } from 'vue'

const props = defineProps({
  lang: {
    type: String,
    default: 'text',
  },
  code: {
    type: String,
    default: '',
  },
})

const html = ref('')
watchEffect(() => {
  codeToHtml(props.code, {
    lang: props.lang,
    theme: 'github-light',
  }).then((result) => {
    html.value = result
  }).catch((error) => {
    console.error('Error converting code to HTML:', error)
  })
})
</script>

<template>
  <el-card header="code" class="mt-m">
    <div v-html="html"></div>
  </el-card>
</template>
