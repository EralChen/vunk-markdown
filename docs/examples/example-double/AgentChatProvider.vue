<script lang="ts" setup>
import type { __VkAgentChatProvider } from '@vunk/plus/components/agent-chat-provider'
import type { NormalObject } from '@vunk/shared'
import { tokensToString } from '@vunk-markdown/components/markdown'
import { VkRendererTemplate, VkRendererTemplates } from '@vunk-markdown/components/strategy-renderer'
import { VkTemplateEcharts } from '@vunk-markdown/components/template-echarts'
import { VkTemplatesDefault } from '@vunk/markdown'
import { MessageViewManager, VkAgentChatProvider } from '@vunk/plus/components/agent-chat-provider'
import { VkBubbleRenderTemplates, VkBubbleTemplates } from '@vunk/plus/components/bubble-templates'
import { Thinking } from 'vue-element-plus-x'
import AgentEcharts from './AgentEcharts.vue'
import { agentRequest } from './api'

const request: __VkAgentChatProvider.Request = ({ message }, {
  onSuccess,
  onError,
  onUpdate,
}) => {
  if (!message?.content) {
    return
  }

  // 存储分块数据
  const chunks: __VkAgentChatProvider.RequestOutput[] = []
  // 角色
  const role = 'assistant'

  // 服务端已有响应但无数据
  let seviceLoading = true
  // 服务端发送结束
  let seviceEnd = false

  const viewManager = new MessageViewManager()
  const abortController = new AbortController()

  abortController.signal.addEventListener('abort', () => {
    seviceEnd = true
    seviceLoading = false
    viewManager.allViewUpdated() // 所有视图结束更新
    if (viewManager.getViews().length === 0) {
      // 无任何视图， 则创建一个取消视图
      viewManager.upsertView({
        content: '对话已取消',
        type: 'text',
        updating: false,
      })
    }
    update()
  })

  update() // 初始化数据

  agentRequest((e: { data: string }) => { // 请求回调
    let json: NormalObject = {
      content: '',
      reasoning_content: '',
    }

    if (typeof e.data === 'string') {
      try {
        json = JSON.parse(e.data)
      }
      catch (error) {
        onError(error as Error)
      }
    }

    if (json.reasoning_content) {
      seviceLoading = false
      // 思考内容
      viewManager.upsertView({
        content: json.reasoning_content,
        type: 'thinking',
        updating: true, // 多通道下由服务端传输是否结束
      }, {
        onCreate (view) { // 在单通道条件下， 新的视图被创建, 上个视图结束更新
          const prev = viewManager.getPrevView(view)
          prev && (prev.updating = false)
        },
      })
      update()
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
      success()
    }
  }, {
    // 客户端发送的消息
    message: message.content,
  }, abortController)

  function update () { // 更新数据
    const data = {
      role,
      seviceLoading,
      seviceEnd,
      views: viewManager.getViews(),
      abortController,
    }
    onUpdate(data)
    chunks.push(data)
  }

  function success () { // 成功
    onSuccess(chunks)
  }
}

const parser: __VkAgentChatProvider.Parser = (message) => {
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
  <VkAgentChatProvider
    :request="request"
    :parser="parser"
  >
    <VkBubbleRenderTemplates>
      <!-- TemplateType VkMarkDown -->
      <VkBubbleTemplates
        :markdown-props="{
          containers: ['thinking', 'agent'],
          fences: [],
        }"
      ></VkBubbleTemplates>

      <!-- VkMarkDown Renderer -->
      <VkRendererTemplates>
        <VkTemplatesDefault></VkTemplatesDefault>
        <VkTemplateEcharts></VkTemplateEcharts>

        <VkRendererTemplate type="container:thinking">
          <template #default="{ raw }">
            <Thinking
              :content="raw.children[0].content"
              :status="raw.open.info.split(' ')[1] || 'thinking'"
            >
            </Thinking>
          </template>
        </VkRendererTemplate>

        <VkRendererTemplate type="container:agent">
          <template #default="{ raw }">
            <!-- raw.open.info.split(' ')[1] === 'echarts' -->
            <AgentEcharts
              v-if="raw.open.info.split(' ')[1] === 'echarts'"
              :content="tokensToString(raw.children)"
              :close="raw.close"
            ></AgentEcharts>
          </template>
        </VkRendererTemplate>

        <slot></slot>
      </VkRendererTemplates>
    </VkBubbleRenderTemplates>
  </VkAgentChatProvider>
</template>
