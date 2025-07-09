import type { __VkMarkdown } from '@vunk-markdown/components/markdown'
import type MarkdownIt from 'markdown-it'
import { parseDocument } from 'htmlparser2'

export function parseTag (md: MarkdownIt, raw: __VkMarkdown.GroupToken) {
  // [TODO] 需要给用户提供一个尊重 Markdown-It 渲染规则 Template, 这里不加上 children 是考虑性能原因
  const openStr = md.renderer.render([
    raw.open,
    // ...treeToTokens(raw.children || []),
    // raw.close,
  ], md.options, {})

  const doc = parseDocument(openStr)
  const el = doc.children[0] as { name: string, attribs: Record<string, string> }

  const tagName = el?.name
  const attributes: Record<string, string> = el?.attribs

  return {
    tagName,
    attributes,
    content: openStr,
  }
}
