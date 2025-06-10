<script lang="tsx">
import { VkRendererTemplate } from '@vunk-markdown/components/strategy-renderer'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'VkTemplatesDefault',
  setup () {
    return () => (
      <>
        <VkRendererTemplate type="GroupToken">
          {{
            default: (ctx) => {
              const Renderer = ctx.Renderer
              const Tag = ctx.raw.tag
              const children = ctx.raw.children
              return (
                <Tag><Renderer source={children}></Renderer></Tag>
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
