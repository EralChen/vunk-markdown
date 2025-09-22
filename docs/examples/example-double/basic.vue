<script lang="ts" setup>
import { ElButton } from 'element-plus'
import { ref } from 'vue'

import AgentChatProvider from './AgentChatProvider.vue'
import ChatIndependent from './chat-independent.vue'

const isfullscreen = ref(false)
// 找到 button dom 最近的 .vunk-shared-demo-example-showcase 作为全屏容器, 再次点击退出全屏
function onClick (e: MouseEvent) {
  const button = e.currentTarget as HTMLElement
  const showcase = button.closest('.vunk-shared-demo-example-showcase') as HTMLElement
  if (!showcase)
    return
  if (!document.fullscreenElement) {
    showcase.requestFullscreen().then(() => {
      isfullscreen.value = true
    }).catch(() => {
      isfullscreen.value = false
    })
  }
  else {
    document.exitFullscreen().then(() => {
      isfullscreen.value = false
    })
  }
}
</script>

<template>
  <ElButton pos-absolute top-2 right-2 z-10 @click="onClick">
    {{ isfullscreen ? '退出全屏' : '全屏显示' }}
  </ElButton>

  <AgentChatProvider>
    <div
      :class="{
        'h-60vh': !isfullscreen,
        'h-full': isfullscreen,
      }"
    >
      <ChatIndependent></ChatIndependent>
    </div>
  </AgentChatProvider>
</template>
