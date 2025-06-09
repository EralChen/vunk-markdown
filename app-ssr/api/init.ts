import { restFetch } from '@vunk/shared/fetch'

restFetch.baseURL = import.meta.env.VITE_SSR_API_URL
