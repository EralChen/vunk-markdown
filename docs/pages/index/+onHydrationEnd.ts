import type { PageContext } from 'vike/types'
import { navigate } from 'vike/client/router'

export async function onHydrationEnd (_pageContext: PageContext) {
  navigate(`${import.meta.env.BASE_URL}zh-CN/guide/introduction`)
}
