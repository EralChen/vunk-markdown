import type { ApiReturnType } from '@vunk/core'
import { request } from '@vunk/shared/fetch'

export type Data = ApiReturnType<typeof data>

export async function data () {
  return request<{
    name: string
  }>({
    method: 'GET',
    url: '/test',
  })
}
