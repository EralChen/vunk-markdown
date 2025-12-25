import type { NormalObject } from '@vunk/shared'
import type { MaybeRef } from 'vue'
import { decode } from '@toon-format/toon'
import { computed, nextTick, ref, unref, watchEffect } from 'vue'

function trimToLastBrace (str: string) {
  // 找到最后一个 } ] , 的位置
  const lastIndex = Math.max(
    str.lastIndexOf('\n'),
  )
  if (lastIndex === -1)
    return '' // 如果没有找到任何一个符号，返回空字符串
  return str.slice(0, lastIndex + 1) // 包含最后一个
}

export function useToonEncode (
  toonStr: MaybeRef<string>,
) {
  const json = ref<NormalObject | null>(null)

  const trimmedJsonStr = computed(() => {
    return trimToLastBrace(unref(toonStr))
  })
  const error = ref<any>()
  const repaired = ref(false)

  watchEffect(async () => {
    if (!trimmedJsonStr.value)
      return

    await nextTick()

    repaired.value = false
    error.value = null

    try {
      json.value = decode(trimmedJsonStr.value, { strict: false }) as NormalObject
    }
    catch (err) {
      error.value = err
    }
  })

  return {
    json,
    error,
  }
}
