import { restFetch as sstidpRestFetch } from '@vunk/shared/fetch'

sstidpRestFetch.baseURL = import.meta.env.VITE_BASE_API
sstidpRestFetch.presetRequestInit = (config) => {
  const headers = config.headers as Headers
  headers.set('Authorization', import.meta.env.VITE_SSTIDP_KEY)
  return config
}
