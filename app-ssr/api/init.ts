import { restFetch } from '@vunk-markdown/shared/fetch'

restFetch.baseURL = import.meta.env.VITE_SSR_API_URL
