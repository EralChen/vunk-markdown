<script lang="ts" setup>
import { VkAgentChatProvider } from '@vunk/plus/components/agent-chat-provider'
import { useRequest } from './useRequest'

const { ready, request, parser } = useRequest()
</script>

<template>
  <VkAgentChatProvider
    :parser="parser"
    :request="request"
  >
    <slot v-if="ready"></slot>
  </VkAgentChatProvider>
</template>
