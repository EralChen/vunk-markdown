import type { NormalObject } from '@vunk/shared'
import type { MaybeRef } from 'vue'
import { jsonrepair } from 'jsonrepair'
import { computed, nextTick, ref, unref, watchEffect } from 'vue'

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
  options: {
    repair?: boolean
  } = {},
) {
  const repair = options.repair ?? true
  const json = ref<NormalObject | null>(null)

  const trimmedJsonStr = computed(() => {
    return trimToLastBrace(unref(jsonStr))
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
      json.value = JSON.parse(trimmedJsonStr.value)
    }
    catch (err) {
      if (!repair) {
        error.value = err
        return
      }

      try {
        const repairedJson = jsonrepair(trimmedJsonStr.value)
        json.value = JSON.parse(repairedJson)
        repaired.value = true
      }
      catch (err) {
        error.value = err
      }
    }
  })

  return {
    json,
    error,
    repaired,
  }
}
