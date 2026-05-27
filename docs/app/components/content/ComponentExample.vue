<script setup lang="ts">
import type { ChipProps } from '@nuxt/ui'
import { ElCollapseTransition } from 'element-plus'
import { camelCase, upperFirst } from 'scule'
import { hash } from 'ohash'
import { useElementSize } from '@vueuse/core'
import { get, set } from '#ui/utils'
import ComponentExampleFloatControl from './component-example/ComponentExampleFloatControl.vue'
import ComponentExampleSourceBlock from './component-example/ComponentExampleSourceBlock.vue'
import ComponentExampleToolbar from './component-example/ComponentExampleToolbar.vue'

const props = withDefaults(defineProps<{
  name: string
  class?: any
  /**
   * 是否在 iframe 中渲染组件
   * @defaultValue false
   */
  iframe?: boolean | { [key: string]: any }
  /**
   * 是否在移动端尺寸的 iframe 视口中显示组件
   * @defaultValue false
   */
  iframeMobile?: boolean
  props?: { [key: string]: any }
  /**
   * 是否使用 Prettier 格式化代码
   * @defaultValue false
   */
  prettier?: boolean
  /**
   * 是否折叠代码块
   * @defaultValue false
   */
  collapse?: boolean | {
    icon?: string
    name?: string
    openText?: string
    closeText?: string
    open?: boolean
  }
  /**
   * 是否显示预览
   * 当设置为 `false` 时，将显示文件名
   * @defaultValue true
   */
  preview?: boolean
  /**
   * 是否显示源代码
   * @defaultValue true
   */
  source?: boolean
  /**
   * 链接到组件的可变属性列表
   */
  options?: Array<{
    type?: string
    alias?: string
    name: string
    label: string
    items?: any[]
    default: any
    multiple?: boolean
  }>
  /**
   * 代码块中需要高亮的行号列表
   */
  highlights?: number[]
  /**
   * 是否在包装器上添加 overflow-hidden
   */
  overflowHidden?: boolean
  /**
   * 是否添加 background-elevated 到 wrapper
   */
  elevated?: boolean
  /**
   * 是否只在客户端渲染示例预览，避免 SSR 执行浏览器定时器逻辑
   * @defaultValue false
   */
  clientOnly?: boolean
  lang?: string
  /**
   * 覆盖用于代码块的文件名
   */
  filename?: string
}>(), {
  preview: true,
  source: true,
  prettier: false,
  lang: 'vue',
  clientOnly: false
})

const slots = defineSlots<{
  options(props?: {}): any
  code(props?: {}): any
}>()

const el = ref<HTMLElement | null>(null)
const wrapperContainer = ref<HTMLElement | null>(null)
const componentContainer = ref<HTMLElement | null>(null)
const toolbarRef = ref<{ focusSourceButton: () => void } | null>(null)
const { $prettier } = useNuxtApp()

const { width } = useElementSize(el)

const camelName = camelCase(props.name)

const exampleModules = import.meta.glob('~/components/content/examples/**/*.vue')
const exampleMatch = Object.entries(exampleModules).find(([path]) => path.endsWith(`/${upperFirst(camelName)}.vue`))
const resolvedComponent = exampleMatch ? defineAsyncComponent(exampleMatch[1] as any) : undefined

const { data } = await useFetchComponentExample(camelName)

const componentProps = reactive({ ...(props.props || {}) })

const code = computed(() => {
  return `\`\`\`${props.lang} ${props.preview ? '' : ` [${props.filename ?? data.value?.pascalName}.${props.lang}]`}${props.highlights?.length ? `{${props.highlights.join('-')}}` : ''}
${data.value?.code ?? ''}
\`\`\``
})

const { data: ast } = useAsyncData(`component-example-${camelName}${hash({ props: componentProps, collapse: props.collapse })}`, async () => {
  if (!props.prettier) {
    return cachedParseMarkdown(code.value)
  }

  let formatted = ''
  try {
    formatted = await $prettier.format(code.value, {
      trailingComma: 'none',
      semi: false,
      singleQuote: true,
      printWidth: 100
    })
  } catch {
    formatted = code.value
  }

  return cachedParseMarkdown(formatted)
}, { lazy: import.meta.client, watch: [code] })

const optionsValues = ref(props.options?.reduce((acc, option) => {
  if (option.name) {
    acc[option.alias || option.name] = option.default
  }
  if (option.name.toLowerCase().endsWith('color') && option.items?.length) {
    option.items = option.items.map((item: any) => ({
      label: item,
      value: item,
      chip: { color: item }
    }))
  }
  return acc
}, {} as Record<string, any>) || {})

const effectiveProps = computed(() => ({ ...componentProps, ...optionsValues.value }))

const collapseConfig = computed(() => (typeof props.collapse === 'object' ? props.collapse : {}))
const sourceOpenText = computed(() => collapseConfig.value.openText || '查看源码')
const sourceCloseText = computed(() => collapseConfig.value.closeText || '收起源码')
const sourceToggleIcon = computed(() => collapseConfig.value.icon || 'i-lucide-code')
const sourceRawCode = computed(() => data.value?.code ?? '')
const sourceVisible = ref(true)

watchEffect(() => {
  if (typeof props.collapse === 'object' && typeof props.collapse.open === 'boolean') {
    sourceVisible.value = props.collapse.open
    return
  }

  sourceVisible.value = props.collapse ? false : true
})

function hideSourceFromFloatControl() {
  sourceVisible.value = false
  nextTick(() => toolbarRef.value?.focusSourceButton())
}

const urlSearchParams = computed(() => {
  const params = {
    ...optionsValues.value,
    ...componentProps
  }

  if (!props.iframeMobile) {
    params.width = Math.round(width.value).toString()
  }

  return new URLSearchParams(params).toString()
})
</script>

<template>
  <div ref="el" class="my-5" :style="{ '--ui-header-height': '4rem' }">
    <template v-if="preview">
      <template v-if="props.clientOnly">
        <ClientOnly>
          <div ref="wrapperContainer" class="relative group/component">
            <div
              class="border border-muted relative z-1"
              :class="[{ 'border-b-0 rounded-t-md': props.source, 'rounded-md': !props.source, 'overflow-hidden': props.overflowHidden }]"
            >
              <div v-if="props.options?.length || !!slots.options" class="flex gap-4 p-4 border-b border-muted">
                <slot name="options" />

                <UFormField
                  v-for="option in props.options"
                  :key="option.name"
                  :label="option.label"
                  :name="option.name"
                  size="sm"
                  class="inline-flex ring ring-accented rounded-sm"
                  :ui="{
                    wrapper: 'bg-elevated/50 rounded-l-sm flex border-r border-accented',
                    label: 'text-muted px-2 py-1.5',
                    container: 'mt-0'
                  }"
                >
                  <USelectMenu
                    v-if="option.items?.length"
                    :model-value="get(optionsValues, option.name)"
                    :items="option.items"
                    :search-input="false"
                    :value-key="option.name.toLowerCase().endsWith('color') ? 'value' : undefined"
                    color="neutral"
                    variant="soft"
                    class="rounded-sm rounded-l-none min-w-12"
                    :multiple="option.multiple"
                    :class="[option.name.toLowerCase().endsWith('color') && 'pl-6']"
                    :ui="{ itemLeadingChip: 'w-2' }"
                    @update:model-value="set(optionsValues, option.name, $event)"
                  >
                    <template v-if="option.name.toLowerCase().endsWith('color')" #leading="{ modelValue, ui }">
                      <UChip
                        inset
                        standalone
                        :color="(modelValue as any)"
                        :size="(ui.itemLeadingChipSize() as ChipProps['size'])"
                        class="size-2"
                      />
                    </template>
                  </USelectMenu>
                  <UInput
                    v-else
                    :model-value="get(optionsValues, option.name)"
                    :type="option.type"
                    color="neutral"
                    variant="soft"
                    :ui="{ base: 'rounded-sm rounded-l-none min-w-12' }"
                    @update:model-value="set(optionsValues, option.name, $event)"
                  />
                </UFormField>
              </div>

              <iframe
                v-if="iframe"
                v-bind="typeof iframe === 'object' ? iframe : {}"
                :src="`/examples/${name}?${urlSearchParams}`"
                class="relative w-full"
                :class="[props.class, { 'dark:bg-neutral-950/50 rounded-t-md': props.elevated }, !iframeMobile && 'lg:left-1/2 lg:-translate-x-1/2 lg:w-[1024px]']"
              />

              <div
                v-else-if="resolvedComponent"
                ref="componentContainer"
                class="p-4"
                :class="[props.class, { 'dark:bg-neutral-950/50 rounded-t-md': props.elevated }]"
              >
                <component :is="resolvedComponent" v-bind="effectiveProps" />
              </div>
            </div>

            <ComponentExampleExtras
              :name="name"
              :camel-name="camelName"
              :pascal-name="data?.pascalName ?? ''"
              :effective-props="effectiveProps"
              :options="props.options"
              :wrapper-container="wrapperContainer"
              :component-container="componentContainer"
            />
          </div>
        </ClientOnly>
      </template>

      <template v-else>
        <div ref="wrapperContainer" class="relative group/component">
          <div
            class="border border-muted relative z-1"
            :class="[{ 'border-b-0 rounded-t-md': props.source, 'rounded-md': !props.source, 'overflow-hidden': props.overflowHidden }]"
          >
            <div v-if="props.options?.length || !!slots.options" class="flex gap-4 p-4 border-b border-muted">
              <slot name="options" />

              <UFormField
                v-for="option in props.options"
                :key="option.name"
                :label="option.label"
                :name="option.name"
                size="sm"
                class="inline-flex ring ring-accented rounded-sm"
                :ui="{
                  wrapper: 'bg-elevated/50 rounded-l-sm flex border-r border-accented',
                  label: 'text-muted px-2 py-1.5',
                  container: 'mt-0'
                }"
              >
                <USelectMenu
                  v-if="option.items?.length"
                  :model-value="get(optionsValues, option.name)"
                  :items="option.items"
                  :search-input="false"
                  :value-key="option.name.toLowerCase().endsWith('color') ? 'value' : undefined"
                  color="neutral"
                  variant="soft"
                  class="rounded-sm rounded-l-none min-w-12"
                  :multiple="option.multiple"
                  :class="[option.name.toLowerCase().endsWith('color') && 'pl-6']"
                  :ui="{ itemLeadingChip: 'w-2' }"
                  @update:model-value="set(optionsValues, option.name, $event)"
                >
                  <template v-if="option.name.toLowerCase().endsWith('color')" #leading="{ modelValue, ui }">
                    <UChip
                      inset
                      standalone
                      :color="(modelValue as any)"
                      :size="(ui.itemLeadingChipSize() as ChipProps['size'])"
                      class="size-2"
                    />
                  </template>
                </USelectMenu>
                <UInput
                  v-else
                  :model-value="get(optionsValues, option.name)"
                  :type="option.type"
                  color="neutral"
                  variant="soft"
                  :ui="{ base: 'rounded-sm rounded-l-none min-w-12' }"
                  @update:model-value="set(optionsValues, option.name, $event)"
                />
              </UFormField>
            </div>

            <iframe
              v-if="iframe"
              v-bind="typeof iframe === 'object' ? iframe : {}"
              :src="`/examples/${name}?${urlSearchParams}`"
              class="relative w-full"
              :class="[props.class, { 'dark:bg-neutral-950/50 rounded-t-md': props.elevated }, !iframeMobile && 'lg:left-1/2 lg:-translate-x-1/2 lg:w-[1024px]']"
            />

            <div
              v-else-if="resolvedComponent"
              ref="componentContainer"
              class="p-4"
              :class="[props.class, { 'dark:bg-neutral-950/50 rounded-t-md': props.elevated }]"
            >
              <component :is="resolvedComponent" v-bind="effectiveProps" />
            </div>
          </div>

          <ClientOnly>
            <ComponentExampleExtras
              :name="name"
              :camel-name="camelName"
              :pascal-name="data?.pascalName ?? ''"
              :effective-props="effectiveProps"
              :options="props.options"
              :wrapper-container="wrapperContainer"
              :component-container="componentContainer"
            />
          </ClientOnly>
        </div>
      </template>
    </template>

    <template v-if="props.source">
      <div
        class="border border-muted bg-default"
        :class="[props.preview ? 'rounded-b-md' : 'rounded-md']"
      >
        <ComponentExampleToolbar
          ref="toolbarRef"
          v-model:source-visible="sourceVisible"
          class="bg-elevated/20"
          :source="sourceRawCode"
          :source-icon="sourceToggleIcon"
          :view-source-text="sourceOpenText"
          :hide-source-text="sourceCloseText"
        />

        <ElCollapseTransition>
          <ComponentExampleSourceBlock :visible="sourceVisible" :ast="ast">
            <template v-if="!!slots.code" #code>
              <slot name="code" />
            </template>
          </ComponentExampleSourceBlock>
        </ElCollapseTransition>

        <ComponentExampleFloatControl
          :visible="sourceVisible"
          :label="sourceCloseText"
          @hide="hideSourceFromFloatControl"
        />
      </div>
    </template>
  </div>
</template>
