<script lang="tsx">
import { VkRendererTemplate } from '@vunk-markdown/components/strategy-renderer'
import { defineComponent } from 'vue'
import Code from './code.vue'

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

        <VkRendererTemplate type="text">
          {{
            default: ({ raw }) => raw.content,
          }}
        </VkRendererTemplate>

        <VkRendererTemplate type="fence">

          {{
            default: ({ raw }) => {
              return (
                <Code
                  modelValue={raw.content}
                >
                </Code>
              )
            },
          }}
        </VkRendererTemplate>
      </>

    )
  },
})
</script>
