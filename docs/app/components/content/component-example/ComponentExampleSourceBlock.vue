<script setup lang="ts">
defineProps<{
  visible: boolean
  ast?: {
    body?: any
    data?: any
  } | null
}>()

defineSlots<{
  code(props?: {}): any
}>()
</script>

<template>
  <div v-show="visible" class="component-example-source-wrapper">
    <div v-if="$slots.code" class="component-example-source [&_pre]:rounded-none! [&_pre]:border-x-0! [&_pre]:border-b-0! [&_div.my-5]:my-0!">
      <slot name="code" />
    </div>
    <MDCRenderer
      v-else-if="ast"
      :body="ast.body"
      :data="ast.data"
      class="component-example-source [&_pre]:rounded-none! [&_pre]:border-x-0! [&_pre]:border-b-0! [&_div.my-5]:my-0!"
    />
  </div>
</template>

<style scoped>
.component-example-source-wrapper {
  margin-top: -1px;
}

:deep(pre) {
  margin: 0;
  border-right: 0;
  border-bottom: 0;
  border-left: 0;
  border-radius: 0;
}
</style>