export const props = {

  /**
   * @description Markdown 内容
   */
  source: {
    type: String,
    default: '',
  },

  /**
   * @description 支持匹配的容器类型
   */
  containers: {
    type: Array<string>,
    default: () => ['echarts'],
  },

  /**
   * @description 支持匹配的 tag 标签
   */
  tags: {
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
