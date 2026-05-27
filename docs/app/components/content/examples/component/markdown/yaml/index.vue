<script lang="ts" setup>
import { VkChatIndependent } from '@vunk/plus/components/chat-independent'
import ChatProvider from './provider/index.vue'
import { RendererTemplates } from './templates'
</script>

<template>
  <div h-600px>
    <ChatProvider>
      <VkChatIndependent>
        <template #bubble_renderer>
          <RendererTemplates />
        </template>
      </VkChatIndependent>
    </ChatProvider>
  </div>
</template>
