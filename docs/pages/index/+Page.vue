<script lang="ts">
import { redirect } from 'vike/abort'
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    throw redirect(
      `${import.meta.env.BASE_URL}zh-CN/guide/introduction`,
      301,
    )
  },
})
</script>
