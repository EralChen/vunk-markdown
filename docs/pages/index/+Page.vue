<script lang="ts">
import { navigate } from 'vike/client/router'
import { defineComponent, onBeforeMount } from 'vue'

export default defineComponent({
  setup () {
    onBeforeMount(() => {
      navigate(`${import.meta.env.BASE_URL}zh-CN/guide/introduction`)
    })

    return () => null
  },
})
</script>
