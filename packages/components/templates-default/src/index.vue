<script lang="tsx">
import type { __VkMarkdown } from '@vunk-markdown/components/markdown'
import type MarkdownIt from 'markdown-exit'
import { VkRendererTemplate } from '@vunk-markdown/components/strategy-renderer'
import { defineComponent } from 'vue'
import Media from './media.vue'
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

        <VkRendererTemplate type="hardbreak">
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

        <VkRendererTemplate type="image">
          {{
            default: ({ raw }) => <Media token={raw}></Media>,
          }}
        </VkRendererTemplate>

        <VkRendererTemplate type="html_block">
          {{
            default: ({ raw }) => (
              <div
                class="vk-markdown-html-block"
                v-html={raw.content}
              >
              </div>
            ),
          }}
        </VkRendererTemplate>

        <VkRendererTemplate type="html_inline">
          {{
            default: ({ raw }) => (
              <span
                class="vk-markdown-html-inline"
                v-html={raw.content}
              >
              </span>
            ),
          }}
        </VkRendererTemplate>

        <VkRendererTemplate type="group:html_inline">
          {{
            default: ({ raw, md }) => (
              <span
                class="vk-markdown-html-inline"
                v-html={md.renderer.render([raw.open, ...raw.children, raw.close], {})}
              >
              </span>
            ),
          }}
        </VkRendererTemplate>

      </>

    )
  },
})
</script>
