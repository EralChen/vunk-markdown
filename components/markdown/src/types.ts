import type { __VkRenderer } from '@vunk/core/components/renderer'
import type { Token } from 'markdown-exit'

export interface BasicToken extends Token,
  __VkRenderer.SourceItem {

}

export interface GroupToken extends __VkRenderer.SourceItem {
  tag: string
  open: BasicToken
  close: BasicToken
  children: RendererToken[]
}

export type RendererToken = BasicToken | GroupToken
