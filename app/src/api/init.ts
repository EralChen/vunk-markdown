import { restFetch as platformRestFetch } from '@skzz/platform/shared/fetch/platform'
import { restFetch as publicRestFetch } from '@skzz/platform/shared/fetch/public'
import { restFetch } from '@vunk-markdown/shared/fetch'
import { ElementPlusRestFetchPlugin } from '@vunk/shared/fetch/ElementPlusRestFetchPlugin'

publicRestFetch.baseURL = `${import.meta.env.VITE_BASE_URL}/data`

platformRestFetch.baseURL = import.meta.env.VITE_DEFAULT_PLATFORM_API
platformRestFetch.DEV = import.meta.env.DEV

// https://eralchen.github.io/vunk-shared/zh-CN/component/fetch/ElementPlusRestFetchPlugin
restFetch.use(ElementPlusRestFetchPlugin)

restFetch.baseURL = import.meta.env.VITE_BASE_API
