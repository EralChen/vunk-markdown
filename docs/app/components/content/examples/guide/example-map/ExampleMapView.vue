<script lang="ts" setup>
import type { __VkBubbleList } from '@vunk/plus/components/bubble-list'
import { VkDuplex } from '@vunk/core'
import { useDeferred } from '@vunk/core/composables'
import { useAgentChat } from '@vunk/plus/components/agent-chat-provider'
import { VkBubbleList } from '@vunk/plus/components/bubble-list'
import { VkSender } from '@vunk/plus/components/sender'
import { computed, nextTick, ref } from 'vue'

defineOptions({
  name: 'ChatIndependent',
})

const mainRef = ref<HTMLElement>()
const content = ref<string>('') // 输入框数据
const bubbleListDef = useDeferred<{
  scrollToBottom: () => void
}>()
const bubbleListReslove = bubbleListDef.resolve

const { simplicity, chat } = useAgentChat()
const { items: bubbleItems, onRequest } = simplicity

chat.setMessages([
  {
    id: 'assistant-start',
    message: {
      role: 'assistant',
      content: [
        '```json layer',
        '[',
        `{ "url": "https://geojson.cn/api/china/1.6.2/china.json", "label": "中国地图" },`,

        `{ "url": "https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json", "label": "各国边界" }`,

        ']',
        '```',
      ].join('\n'),
    },
    status: 'success',
  },
])

const lastBubbleItem = computed(() => {
  return bubbleItems.value.at(-1)
})

const clientLoading = computed(() => {
  if (lastBubbleItem.value?.loading === true) { // 正在请求
    return true
  }
  return false
})

function onSubmit (nextContent: string) {
  if (!nextContent)
    return

  onRequest(nextContent)

  nextTick(() => {
    content.value = ''
  })

  setTimeout(() => {
    bubbleListDef.value?.scrollToBottom()
  }, 400)
}
function onCancel () {
  const lastBubble = bubbleItems.value.at(-1) as __VkBubbleList.Item
  if (!lastBubble)
    return
  lastBubble.abortController?.abort('User Cancel') // 打断请求
}
</script>

<template>
  <div class="vk-chat-independent">
    <div ref="mainRef" class="vk-chat-independent-main">
      <VkDuplex
        with-flex="one"
        class="vk-chat-independent-main__duplex"
      >
        <template #one>
          <div class="vk-chat-independent-main__bubbles">
            <VkBubbleList
              :el-ref="bubbleListReslove"
              :items="bubbleItems"
            >
              <template #renderer>
                <slot name="bubble_renderer"></slot>
              </template>
              <template #footer="e">
                <slot v-bind="e" name="bubble_footer"></slot>
              </template>
            </VkBubbleList>
          </div>
        </template>

        <template #two>
          <div class="vk-chat-independent-footer">
            <VkSender
              v-model="content"
              :auto-size="true"
              placeholder="请输入内容"
              :loading="clientLoading"
              @submit="onSubmit"
              @cancel="onCancel"
            ></VkSender>
          </div>
        </template>
      </VkDuplex>
    </div>

    <div class="vk-chat-independent-background">
      <slot name="background"></slot>
    </div>
  </div>
</template>

<style>
.vk-chat-independent-main__bubbles {
   padding: 8px 8px 0 12px;
   height: 100%;
}

.vk-chat-independent-main .el-bubble-content-wrapper .el-bubble-content-borderless{
  border: none;
}

.vk-chat-independent-footer{
  display: flex;
  align-items: center;
  padding: var(--gap-s, 6px);
  background: var(--el-fill-color);
}
.vk-chat-independent-footer .vk-recorder-container{
  flex-basis: 100%;
}
.vk-chat-independent-footer .el-avatar{
  cursor: pointer;
  align-self: flex-end;
}

.vk-chat-independent-footer .ant-sender{
  border-radius: var(--el-border-radius-base, 4px);
}

.vk-chat-independent-footer .ant-sender-content{
  padding: 4px;
  /* border-radius: 0; */

}

.vk-chat-independent{
  width: 100%;
  height: 100%;
  position: relative;
}
.vk-chat-independent-main__duplex{
  height: 100%;
}
.vk-chat-independent-main{
  z-index: 1;
  inset: 0;
  position: absolute;
}
.vk-chat-independent-background{
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;

}
</style>
