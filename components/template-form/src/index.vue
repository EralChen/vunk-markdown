<script lang="ts" setup>
import { VkResolverJson } from '@vunk-markdown/components/resolver-json'
import { VkRendererTemplate } from '@vunk-markdown/components/strategy-renderer'
import { VkfFormItemRenderer } from '@vunk/form/components/form-item-renderer'
import { VkfTemplatesDefault } from '@vunk/form/components/templates-default'

defineOptions({
  name: 'VkTemplateForm',
})
</script>

<template>
  <VkRendererTemplate
    type="container:form"
  >
    <template #default="{ raw }">
      <VkResolverJson
        :source="raw.children"
      >
        <template #default="{ json }">
          <VkfFormItemRenderer
            :source="json ?? []"
          >
            <VkfTemplatesDefault />
          </VkfFormItemRenderer>
        </template>
      </VkResolverJson>
    </template>
  </VkRendererTemplate>
</template>
