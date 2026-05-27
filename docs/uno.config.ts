import {
  defineConfig,
  presetAttributify,
  presetWind4
} from 'unocss'
import { presetFlex } from 'unocss-preset-vunk'

export default defineConfig({
  content: {
    pipeline: {
      include: [
        /\.(vue|[jt]sx?|md|mdc)($|\?)/
      ]
    }
  },
  presets: [
    presetWind4({
      preflights: {
        reset: false,
        theme: 'on-demand',  
        property: false,
      }
    }),
    presetFlex({
      prefix: 'sk'
    }),
    presetAttributify(),
  ]
})