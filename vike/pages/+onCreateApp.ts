import { ID_INJECTION_KEY } from "element-plus";
import type { PageContext } from 'vike/types'

function onCreateApp(ctx: PageContext) {
  ctx.app.provide(ID_INJECTION_KEY, {
    prefix: 1024,
    current: 0,
  });
}

export { onCreateApp };