<script lang="tsx">
import type { __VkMarkdown } from '@vunk-markdown/components/markdown'
import type MarkdownIt from 'markdown-it'
import { VkRendererTemplate } from '@vunk-markdown/components/strategy-renderer'
import { defineComponent } from 'vue'
import { parseTag } from './utils'

export default defineComponent({
  name: 'VkTemplatesDefault',
  setup () {
    return () => (
      <>
        <VkRendererTemplate type="GroupToken">
          {{
            default: (ctx) => {
              const raw = ctx.raw as __VkMarkdown.GroupToken
              const Renderer = ctx.Renderer
              const children = ctx.raw.children

              const md = ctx.md as MarkdownIt
              const { tagName: Tag, attributes: attrsObj } = parseTag(md, raw)

              if (!Tag) {
                return (
                  <Renderer source={children}></Renderer>
                )
              }

              return (
                <Tag {...attrsObj}>
                  <Renderer source={children}></Renderer>
                </Tag>
              )
            },
          }}
        </VkRendererTemplate>

        <VkRendererTemplate type="inline">
          {{
            default: (ctx) => {
              const Renderer = ctx.Renderer
              const children = ctx.raw.children
              return (
                <Renderer source={children}></Renderer>
              )
            },
          }}
        </VkRendererTemplate>

        <VkRendererTemplate type="softbreak">
          {{
            default: () => <br />,
          }}
        </VkRendererTemplate>

        <VkRendererTemplate type="hr">
          {{
            default: () => <hr />,
          }}
        </VkRendererTemplate>

        <VkRendererTemplate type="text">
          {{
            default: ({ raw }) => raw.content,
          }}
        </VkRendererTemplate>

        <VkRendererTemplate type="fence">
          {{
            default: ({ raw }) => {
              const lang = raw.info ? raw.info.split(' ')[0] : ''
              const Tag = raw.tag
              return (
                <pre>
                  <Tag
                    class={
                      `language-${lang}`
                    }
                  >
                    {raw.content}
                  </Tag>
                </pre>
              )
            },
          }}
        </VkRendererTemplate>

        <VkRendererTemplate type="code_inline">
          {{
            default: ({ raw }) => (
              <code>{raw.content}</code>
            ),
          }}
        </VkRendererTemplate>
      </>

    )
  },
})
</script>
