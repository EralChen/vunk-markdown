import { baseFontSize } from '@skzz/platform/theme'
import { ToggleHandler } from '@vunk/core/shared/utils-class'
import { loadStyleString } from '@vunk/core/shared/utils-dom'
import { defineStore } from 'pinia'
import { reactive, ref, watch } from 'vue'

export const useLayoutStore = defineStore('layout', () => {
  const asideInfo = reactive({
    menuCollapse: false,
  })

  const fontSize = ref(+baseFontSize['font-size'].replace('px', ''))
  class FontSizeToggle extends ToggleHandler {
    add () {
      this.removeHandler = loadStyleString(`:root {
        font-size: ${fontSize.value}px;
      }`)
    }
  }

  const fontSizeToggle = new FontSizeToggle()
  watch(fontSize, () => {
    fontSizeToggle.reset(undefined)
  })

  return {
    asideInfo,
    fontSize,
  }
}, {
  persist: {
    enabled: true,
  },
})
