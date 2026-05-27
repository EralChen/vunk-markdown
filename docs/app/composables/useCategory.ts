export function useCategory() {
  const categories = {
    guide: [
      {
        id: 'start',
        title: 'Start 开始',
        icon: 'i-lucide-play'
      },
      {
        id: 'basic',
        title: 'Basic 基础',
        icon: 'i-lucide-book-open'
      },
      {
        id: 'optimize',
        title: 'Optimize 优化',
        icon: 'i-lucide-sparkles'
      },
      {
        id: 'advanced',
        title: 'Advanced 高级',
        icon: 'i-lucide-cpu'
      },
      {
        id: 'example',
        title: 'Example 用例',
        icon: 'i-lucide-flask-conical'
      }
    ],
    component: [
      {
        id: 'basic',
        title: '基础用法',
        icon: 'i-lucide-file-text'
      },
      {
        id: 'template',
        title: '模板',
        icon: 'i-lucide-layout-template'
      },
      {
        id: 'templates',
        title: '模板集合',
        icon: 'i-lucide-layers'
      },
      {
        id: 'utils',
        title: '工具',
        icon: 'i-lucide-wrench'
      }
    ]
  }
  return {
    categories
  }
}
