import type { RestFetchReaderOnmessage } from '@vunk/shared/fetch'
import { restFetch } from '@vunk/shared/fetch'

/**
 * SSE 请求示例
 */
export async function agentRequest (
  onmessage: RestFetchReaderOnmessage,
  data: {
    message: string
  },
  abortController?: AbortController,
) {
  return restFetch.reader({
    url: '/application/chat_message/d72c0954-819e-11f0-8636-062fece26b16',
    onmessage,
    abortController,
  }, {
    headers: {
      authorization: 'application-9888ea942ed566bce1f7dc8cba294b46',
    },
    data,
  })
}

export async function echartsAgentRequest (
  onmessage: RestFetchReaderOnmessage,
  data: {
    message: string
  },
  abortController?: AbortController,
) {
  return restFetch.reader({
    url: '/application/chat_message/238431a8-870a-11f0-85b0-6e0b28fdd362',
    onmessage,
    abortController,
  }, {
    headers: {
      authorization: 'application-30ebbe93cec2d175445f05785e9dde41',
    },
    data,
  })
}
