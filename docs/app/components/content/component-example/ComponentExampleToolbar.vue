<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
import { ElIcon, ElMessage, ElTooltip } from 'element-plus'

const props = withDefaults(defineProps<{
  source?: string
  sourceVisible: boolean
  sourceIcon?: string
  viewSourceText?: string
  hideSourceText?: string
  copyText?: string
  copySuccessText?: string
  copyErrorText?: string
}>(), {
  source: '',
  sourceIcon: 'i-lucide-code',
  viewSourceText: '查看源码',
  hideSourceText: '收起源码',
  copyText: '复制代码',
  copySuccessText: '复制成功',
  copyErrorText: '复制失败'
})

const emit = defineEmits<{
  'update:sourceVisible': [value: boolean]
}>()

const sourceButtonRef = ref<HTMLButtonElement | null>(null)
const copySource = computed(() => props.source || '')
const sourceVisibilityLabel = computed(() => props.sourceVisible ? props.hideSourceText : props.viewSourceText)
const { copy, isSupported } = useClipboard({ source: copySource, read: false })

async function copyCode() {
  if (!isSupported.value || !copySource.value) {
    ElMessage.error(props.copyErrorText)
    return
  }

  try {
    await copy()
    ElMessage.success(props.copySuccessText)
  } catch {
    ElMessage.error(props.copyErrorText)
  }
}

function toggleSourceVisible() {
  emit('update:sourceVisible', !props.sourceVisible)
}

function onActionKeydown(event: KeyboardEvent, action: () => void) {
  if (['Enter', 'NumpadEnter', 'Space'].includes(event.code)) {
    event.preventDefault()
    action()
  }
}

defineExpose({
  focusSourceButton: () => sourceButtonRef.value?.focus()
})
</script>

<template>
  <div class="component-example-op-btns">
    <ClientOnly>
      <ElTooltip
        :content="copyText"
        :show-arrow="false"
        :trigger="['hover', 'focus']"
        :trigger-keys="[]"
      >
        <button
          type="button"
          class="component-example-reset-btn component-example-op-btn"
          :aria-label="copyText"
          @click="copyCode"
          @keydown="onActionKeydown($event, copyCode)"
        >
          <ElIcon :size="16">
            <UIcon name="i-lucide-copy" />
          </ElIcon>
        </button>
      </ElTooltip>

      <template #fallback>
        <button
          type="button"
          class="component-example-reset-btn component-example-op-btn"
          :aria-label="copyText"
          @click="copyCode"
          @keydown="onActionKeydown($event, copyCode)"
        >
          <ElIcon :size="16">
            <UIcon name="i-lucide-copy" />
          </ElIcon>
        </button>
      </template>
    </ClientOnly>

    <ClientOnly>
      <ElTooltip
        :content="sourceVisibilityLabel"
        :show-arrow="false"
        :trigger="['hover', 'focus']"
        :trigger-keys="[]"
      >
        <button
          ref="sourceButtonRef"
          type="button"
          class="component-example-reset-btn component-example-op-btn"
          :aria-label="sourceVisibilityLabel"
          @click="toggleSourceVisible"
          @keydown="onActionKeydown($event, toggleSourceVisible)"
        >
          <ElIcon :size="16">
            <UIcon :name="sourceIcon" />
          </ElIcon>
        </button>
      </ElTooltip>

      <template #fallback>
        <button
          ref="sourceButtonRef"
          type="button"
          class="component-example-reset-btn component-example-op-btn"
          :aria-label="sourceVisibilityLabel"
          @click="toggleSourceVisible"
          @keydown="onActionKeydown($event, toggleSourceVisible)"
        >
          <ElIcon :size="16">
            <UIcon :name="sourceIcon" />
          </ElIcon>
        </button>
      </template>
    </ClientOnly>
  </div>
</template>

<style scoped>
.component-example-op-btns {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 2.5rem;
  padding: 0.5rem;
}

.component-example-reset-btn {
  appearance: none;
  border: 0;
  background: transparent;
  font: inherit;
}

.component-example-op-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 0 0.5rem;
  padding: 0;
  color: var(--ui-text-muted, var(--el-text-color-secondary));
  cursor: pointer;
  transition: color 0.2s;
}

.component-example-op-btn:hover,
.component-example-op-btn:focus-visible {
  color: var(--ui-text, var(--el-text-color-primary));
}
</style>