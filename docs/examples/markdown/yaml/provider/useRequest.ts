import type { __VkAgentChatProvider } from '@vunk/plus/components/agent-chat-provider'
import type { NormalObject } from '@vunk/shared'
import type { RestFetchReaderOnmessage } from '@vunk/shared/fetch'
import { request, restFetch } from '@vunk/shared/fetch'
import { ref } from 'vue'
import { Role, roleMap } from './static-roles'

const applicationId = '1284bf40-44d3-11f0-b87e-e2bb3033b0f6'
const apiKey = 'application-75e669f4809759ce384605945f907cf8'

/**
 * @description: 新建聊天
 */
export async function createChatId (
  query: {
    application_id: string
  },
) {
  return request<string>({
    method: 'GET',
    url: `/application/${query.application_id}/chat/open`,
    headers: {
      authorization: apiKey,
    },
  }).then(res => res.data)
}

/**
 * @description: 发送消息
 * @param onmessage
 * @param data
 * @param abortController
 */
async function agentRequest (
  onmessage: RestFetchReaderOnmessage,
  data: {
    message: string
    chatId: string
  },
  abortController?: AbortController,
) {
  return restFetch.reader({
    url: `/application/chat_message/${data.chatId}`,
    onmessage,
    abortController,
  }, {
    headers: {
      authorization: apiKey,
    },
    data: {
      message: data.message,
    },
  })
}

export function useRequest () {
  const chatId = ref<string>('')
  const ready = ref(false)

  createChatId({
    application_id: applicationId,
  }).then((id) => {
    chatId.value = id
    ready.value = true
  })

  const request: __VkAgentChatProvider.Request = (info, event) => {
    const { message } = info
    const { onSuccess, onUpdate } = event

    if (!message?.content) {
      return
    }

    const abortController = new AbortController()

    let content = ''
    const role = Role.Assistant
    let thinkingContent = ''
    let thinkingStatus: __VkAgentChatProvider.AgentMessage['thinkingStatus'] = 'start'
    let seviceLoading = true
    const update = () => {
      onUpdate({
        role,
        content,
        thinkingContent,
        thinkingStatus,
        seviceLoading,
        abortController,
      })
    }
    const success = () => {
      onSuccess({
        role,
        content,
        thinkingContent,
        thinkingStatus: 'end',
        seviceLoading: false,
        seviceEnd: true,
        abortController,
      })
    }

    update()

    agentRequest(
      (e: any) => {
        let json: NormalObject = {
          content: '',
          reasoning_content: '',
        }
        if (typeof e.data === 'string') {
          json = JSON.parse(e.data)
        }
        if (json.is_end) {
          success()
          return
        }

        if (json.reasoning_content) {
          thinkingContent += json.reasoning_content
          thinkingStatus = 'thinking'
          seviceLoading = false
          update()
        }

        if (json.content) {
          content += json.content
          seviceLoading = false
          update()
        }
        if (
          thinkingContent && json.content
        ) { // 思考完成
          thinkingStatus = 'end'
          update()
        }
      },
      { message: message?.content, chatId: chatId.value },
      abortController,
    ).catch(() => {
      success()
    })
  }

  const parser: __VkAgentChatProvider.Parser = (message) => {
    const list = [
      {
        ...message,
        ...roleMap[message.role],
        loading: message.seviceLoading,
      },
    ] as Partial<__VkAgentChatProvider.BubbleItem>[]

    return list
  }

  return {
    request,
    parser,
    ready,
  }
}
