<script lang="ts">
import { navigate } from 'vike/client/router'
import { defineComponent, nextTick, onBeforeMount } from 'vue'

export default defineComponent({
  setup () {
    onBeforeMount(() => {
      nextTick(() => {
        navigate(`${import.meta.env.BASE_URL}zh-CN/guide/introduction`, { overwriteLastHistoryEntry: true })
      })
    })
  },
})
</script>
