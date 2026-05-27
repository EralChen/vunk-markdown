import { Plugin } from "vite"
import { LIB_ALIAS, LIB_NAME } from "./name"

export const replaceLibAlias = () =>    ({
  name: 'replace-lib-alias',
  generateBundle(options, bundle) {
    for (const fileName of Object.keys(bundle)) {
      const chunk = bundle[fileName]
      if (chunk.type === 'chunk') {
        chunk.code = chunk.code.replace(new RegExp(LIB_ALIAS, 'g'), LIB_NAME)
      }
    }
  },
} as Plugin)
