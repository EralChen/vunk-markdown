export function useHeader() {
  const route = useRoute()

  const desktopLinks = computed(() => [{
    label: '文档',
    to: '/docs/guide/start/introduction',
    active: route.path.startsWith('/docs/')
  }, {
    label: '版本发布',
    to: '/releases'
  }])

  const mobileLinks = computed(() => [{
    label: '快速开始',
    icon: 'i-lucide-square-play',
    to: '/docs/guide/start/introduction',
    active: route.path.startsWith('/docs/guide/')
  }, {
    label: '发布版本',
    icon: 'i-lucide-newspaper',
    to: '/releases'
  }])

  return {
    desktopLinks,
    mobileLinks
  }
}
