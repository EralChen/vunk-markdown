import type { NormalObject } from '@vunk/shared'
import { jsonrepair } from 'jsonrepair'
import { computed, type MaybeRef, nextTick, ref, unref, watchEffect } from 'vue'

function trimToLastBrace (str: string) {
  // 找到最后一个 } ] , 的位置
  const lastIndex = Math.max(
    str.lastIndexOf('}'),
    str.lastIndexOf(']'),
    str.lastIndexOf(','),
  )
  if (lastIndex === -1)
    return '' // 如果没有找到任何一个符号，返回空字符串
  return str.slice(0, lastIndex + 1) // 包含最后一个 '}'
}

export function useJsonrepair (
  jsonStr: MaybeRef<string>,
) {
  const json = ref<NormalObject | null>(null)

  const trimmedJsonStr = computed(() => {
    return trimToLastBrace(unref(jsonStr))
  })
  const error = ref<any>()

  watchEffect(async () => {
    if (!trimmedJsonStr.value)
      return

    await nextTick()

    error.value = null

    try {
      json.value = JSON.parse(trimmedJsonStr.value)
    }
    catch {
      try {
        const repairedJson = jsonrepair(trimmedJsonStr.value)
        json.value = JSON.parse(repairedJson)
      }
      catch (err) {
        error.value = err
      }
    }
  })

  return {
    json,
    error,
  }
}
