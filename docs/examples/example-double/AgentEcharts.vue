<script lang="ts" setup>
import type { __VkMarkdown } from '@vunk-markdown/components/markdown'
import type { __VkAgentChatProvider } from '@vunk/plus/components/agent-chat-provider'
import type { NormalObject } from '@vunk/shared'
import type { PropType } from 'vue'

import { VkMarkdown } from '@vunk/markdown'
import { MessageViewManager, useAgentChat } from '@vunk/plus/components/agent-chat-provider'
import { computed, reactive, watch } from 'vue'
import { echartsAgentRequest } from './api'

const props = defineProps({
  content: {
    type: String,
    default: '',
  },
  close: {
    type: Object as PropType<__VkMarkdown.BasicToken>,
    default: () => ({ }),
  },
})

const { simplicity } = useAgentChat()

const lastUserMessage = computed(() => {
  return simplicity.items.value.findLast(item => item.role === 'user')
})
const currentMessage = computed(() => {
  return simplicity.items.value.at(-1)
})
const start = computed(() => {
  return !!props.close.markup
})

const messageState = reactive({
  seviceLoading: true,
  seviceEnd: false,
  content: '',
})

watch(() => start.value, read)

function read () {
  const viewManager = new MessageViewManager()
  // 服务端已有响应但无数据
  let seviceLoading = true
  // 服务端发送结束
  let seviceEnd = false

  echartsAgentRequest((e: { data: string }) => {
    let json: NormalObject = {
      content: '',
      reasoning_content: '',
    }

    if (typeof e.data === 'string') {
      json = JSON.parse(e.data)
    }
    if (json.content) {
      seviceLoading = false

      // 回复内容
      viewManager.upsertView({
        content: json.content,
        type: 'text',
        updating: true, // 多通道下由服务端传输是否结束
      }, {
        onCreate (view) { // 在单通道条件下， 新的视图被创建, 上个视图结束更新
          const prev = viewManager.getPrevView(view)
          prev && (prev.updating = false)
        },
      })

      update()
    }

    if (json.is_end) {
      seviceEnd = true
      viewManager.allViewUpdated() // 所有视图结束更新
      update()
    }
  }, {
    message: [
      lastUserMessage.value?.content || '',
      props.content,
    ].join('\n'),
  }, currentMessage.value?.abortController)

  function update () { // 更新数据
    messageState.seviceEnd = seviceEnd
    messageState.seviceLoading = seviceLoading

    const views = viewManager.getViews()

    messageState.content = parser({ views }).content
  }
}

function parser (message: __VkAgentChatProvider.AgentMessage): __VkAgentChatProvider.BubbleMessage {
  const views = message.views

  let content = message.content ?? ''

  if (views) {
    content = views.reduce((acc, view) => {
      if (view.type === 'thinking') {
        acc += `\n${[
          `:::thinking ${view.updating ? 'thinking' : 'end'}`,
          '```md',
          view.content,
          '```',
          ':::',
        ].join('\n')}`
      }
      else {
        acc += `\n${view.content}`
      }
      return acc
    }, '')
  }

  return {
    role: message.role ?? 'assistant',
    loading: message.seviceLoading === true,
    content,
    abortController: message.abortController,
  }
}
</script>

<template>
  <VkMarkdown
    :source="messageState.content"
    :containers="['echarts']"
    dev
  ></VkMarkdown>
</template>
