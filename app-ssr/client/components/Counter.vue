<script lang="ts">
import { reactive } from 'vue'

export default {
  setup () {
    const state = reactive({ count: 0 })
    return {
      state,
    }
  },
}
</script>

<template>
  <button type="button" @click="state.count++">
    Counter {{ state.count }}
  </button>
</template>
