import type { Token } from 'markdown-it'
import type { GroupToken, RendererToken } from './types'
/**
 * 将 Markdown-It 的扁平 Token 数组转为嵌套树状结构
 */
export function tokensToTree (
  tokens: Token[],
  tags: string[] = [],
  fences: string[] = [],
): RendererToken[] {
  const stack: GroupToken[] = []
  const result: RendererToken[] = []

  const addToParent = (item: RendererToken) => {
    if (!item.templateType) {
      item.templateType = item.type
      if (item.type === 'fence') { // 标记代码块类型
        const info = item.info.split(' ')[0]
        if (fences.includes(info)) {
          item.templateType = `fence:${info}`
        }
      }
    }

    if (item.children) {
      item.children = tokensToTree(item.children as Token[], tags, fences)
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

      if (token.type.startsWith('container_')) {
        group.templateType = `container:${token.info.split(' ')[0]}`
      }
      else if (tags.includes(token.tag)) {
        group.templateType = `tag:${token.tag}`
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

/**
 * 将嵌套树状结构 拍平成扁平数组
 */
export function treeToTokens (
  tree: RendererToken[],
): Token[] {
  const result: Token[] = []

  const traverse = (node: RendererToken) => {
    if (node.templateType === 'GroupToken') {
      result.push(node.open)
      if (node.children) {
        for (const child of node.children) {
          traverse(child)
        }
      }
      result.push(node.close)
    }
    else {
      result.push(node as Token)
    }
  }

  for (const node of tree) {
    traverse(node)
  }

  return result
}

export function tokensToString (tree: RendererToken[]) {
  const tokens = treeToTokens(tree)
  return tokens.map(t => t.content).join('').trim()
}
