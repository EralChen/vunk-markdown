/**
 * 这是一个如何使用第三方接口的用例
 * 需要在 packages/shared/fetch 对 RestFetch 进行封装
 * 如果使用的是 快开平台 的接口
 * zz-test 目录下有参考的示例
 */

import { request } from '@vunk/shared/fetch'

export function rTestData () {
  return request<{
    name: string
  }>({
    url: '/test.json',
    method: 'GET',
  }).then((res) => {
    return res.data
  })
}
