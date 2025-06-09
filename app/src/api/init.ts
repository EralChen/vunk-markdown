import { restFetch as platformRestFetch } from '@skzz/platform/shared/fetch/platform'
import { restFetch as publicRestFetch } from '@skzz/platform/shared/fetch/public'

publicRestFetch.baseURL = `${import.meta.env.VITE_BASE_URL}/data`

platformRestFetch.baseURL = import.meta.env.VITE_DEFAULT_PLATFORM_API
platformRestFetch.DEV = import.meta.env.DEV
