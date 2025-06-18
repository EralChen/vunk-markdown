<script lang="ts" setup>

</script>

<template>
  <div
    pa-page
    class="h-page"
  >
    <div class="bg-bg-overlay h-100% relative">
      <slot></slot>
      <RouterView></RouterView>
    </div>
  </div>
</template>
