<template>
  <h1>My Vike app</h1>
  <p>This page is:</p>
  <ul>
    <li>Rendered to HTML.</li>
    <li>Interactive. <Counter /></li>
  </ul>

  <VkfConfirmInput></VkfConfirmInput>
</template>

<script setup lang="ts">
import Counter from "../../components/Counter.vue";
import { VkfConfirmInput } from '@vunk-formaker/components/confirm-input'
</script>
