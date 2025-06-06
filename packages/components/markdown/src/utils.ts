import type { Token } from 'markdown-it'
import type { GroupToken, RendererToken } from './types'
/**
 * 将 Markdown-It 的扁平 Token 数组转为嵌套树状结构
 */
export function tokensToTree (tokens: Token[]): RendererToken[] {
  const stack: GroupToken[] = []
  const result: RendererToken[] = []

  const addToParent = (item: RendererToken) => {
    item.templateType ??= item.type

    if (item.children) {
      item.children = tokensToTree(item.children as Token[])
    }

    if (stack.length > 0) {
      const currentGroup = stack[stack.length - 1]
      currentGroup.children ??= []
      currentGroup.children.push(item)
    }
    else {
      result.push(item)
    }
  }

  for (const token of tokens) {
    // 递归处理 token.children（如果有）

    if (token.nesting === 1) {
      // 开始一个新 block
      const group: GroupToken = {
        templateType: 'GroupToken',
        tag: token.tag,
        open: token,
        close: null!, // 占位，稍后补全
        children: [],
      }
      stack.push(group)
    }
    else if (token.nesting === -1) {
      const group = stack.pop()
      if (group) {
        group.close = token
        addToParent(group)
      }
      else {
        console.warn('Unexpected closing token without matching opening:', token)
      }
    }
    else {
      addToParent(token)
    }
  }

  if (stack.length > 0) {
    console.warn('Unclosed token groups detected:', stack)
  }

  return result
}
