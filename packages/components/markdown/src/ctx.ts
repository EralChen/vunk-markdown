export const props = {

  /**
   * @description Markdown 内容
   */
  source: {
    type: String,
    default: '',
  },

  /**
   * @description 支持的自定义容器类型
   */
  containers: {
    type: Array<string>,
    default: () => ['echarts'],
  },

  /**
   * @description 需要特殊处理的 token 标签
   */
  tokens: {
    type: Array<string>,
    default: () => [],
  },

  /**
   * @description 开发模式，显示调试按钮
   */
  dev: {
    type: Boolean,
    default: false,
  },
}

export const emits = {
}
