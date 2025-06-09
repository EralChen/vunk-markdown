<script lang="ts" setup>
import { VkChatIndependent } from '@vunk/plus/components/chat-independent'
import ChatProvider from './provider/index.vue'
</script>

<template>
  <div h-600px>
    <ChatProvider>
      <VkChatIndependent></VkChatIndependent>
    </ChatProvider>
  </div>
</template>
