<script lang="ts">
import type { Token } from 'markdown-it'
import { useJsonrepair } from '@vunk-markdown/composables/jsonrepair'
import { noop } from '@vunk/shared/function'
import { computed, defineComponent, nextTick, ref, watchEffect } from 'vue'
import { emits, props } from './ctx'

export default defineComponent({
  name: 'VkResolverJson',
  props,
  emits,
  setup (props, { slots }) {
    const theToken = ref<Token | undefined>()
    watchEffect(async () => {
      noop(props.source)

      await nextTick()

      const source = Array.isArray(props.source) ? props.source : [props.source]

      const raw = source.find((item: Token) => {
        const info = item.info?.split(' ')[0]
        return info === 'json'
      }) as Token

      theToken.value = raw
    })
    const infoArray = computed(() => {
      if (!theToken.value) {
        return []
      }
      return theToken.value.info.split(' ')
    })
    const language = computed(() => {
      return infoArray.value[0] || ''
    })
    const description = computed(() => {
      return infoArray.value.slice(1).join(' ') || ''
    })
    const content = computed(() => {
      return theToken.value?.content || ''
    })
    const { json } = useJsonrepair(content)
    const { json: attrs } = useJsonrepair(description)

    return () => theToken.value
      ? slots.default?.({
        language: language.value,
        description: description.value,
        content: content.value,
        json: json.value,
        attrs: attrs.value,
      })
      : null
  },
})
</script>
