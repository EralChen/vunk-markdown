<script setup lang="ts">
import { ElIcon } from 'element-plus'
import { CaretTop } from '@element-plus/icons-vue'

const props = withDefaults(defineProps<{
  visible: boolean
  label?: string
}>(), {
  label: '收起源码'
})

const emit = defineEmits<{
  hide: []
}>()

function hideSource() {
  emit('hide')
}

function onKeydown(event: KeyboardEvent) {
  if (['Enter', 'NumpadEnter', 'Space'].includes(event.code)) {
    event.preventDefault()
    hideSource()
  }
}
</script>

<template>
  <Transition name="el-fade-in-linear">
    <div
      v-show="props.visible"
      class="component-example-float-control"
      tabindex="0"
      role="button"
      :aria-label="label"
      @click="hideSource"
      @keydown="onKeydown"
    >
      <ElIcon :size="16">
        <CaretTop />
      </ElIcon>
      <span>{{ label }}</span>
    </div>
  </Transition>
</template>

<style scoped>
.component-example-float-control {
  position: sticky;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 100%;
  height: 44px;
  margin-top: -1px;
  color: var(--ui-text-muted, var(--el-text-color-secondary));
  background-color: var(--ui-bg, var(--el-bg-color));
  border-top: 1px solid var(--ui-border-muted, var(--el-border-color));
  border-bottom-right-radius: var(--el-border-radius-base, 4px);
  border-bottom-left-radius: var(--el-border-radius-base, 4px);
  cursor: pointer;
  transition: color 0.2s;
}

.component-example-float-control span {
  margin-left: 10px;
  font-size: 14px;
}

.component-example-float-control:hover,
.component-example-float-control:focus-visible {
  color: var(--el-color-primary, var(--ui-primary));
}
</style>