<script lang="ts">
import type { AnyFunc } from '@vunk/core'
import type { PropType } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { VkSpreadTo } from '@vunk/core/components/spread-to'
import { defineComponent, nextTick } from 'vue'

export default defineComponent({
  components: {
    VkSpreadTo,
  },
  props: {
    data: {
      type: Object as PropType<RouteRecordRaw>,
      required: true,
    },
    isMenu: {
      type: Boolean,
      default: false,
    },
    to: {
      type: String,
      default: '',
    },
  },
  setup (props) {
    const doNav = (navigate: AnyFunc) => {
      if (!props.isMenu) {
        navigate()
      }
    }
    const getSpreadTarget = async (vnode: any) => {
      if (!vnode.el) {
        await nextTick()
      }
      return vnode.el?.parentElement
    }
    return {
      doNav,
      getSpreadTarget,
    }
  },
})
</script>

<template>
  <RouterLink
    :to="to"
    custom
  >
    <template #default="{ navigate, isActive, isExactActive, href }">
      <VkSpreadTo
        :target="getSpreadTarget"
        type="class"
        :data="{
          'is-active': isActive,
          'is-exact-active': isExactActive,
        }"
      ></VkSpreadTo>

      <a
        class="layout-default-aside-link"
        :href="href"
        :class="{
          'is-active': isActive,
          'is-exact-active': isExactActive,
        }"
        @click.prevent="doNav(navigate)"
      ></a>
      <slot
        :is-active="isActive"
        :is-exact-active="isExactActive"
      >
        <!-- {{ data.meta?.name }} -->
        <span></span>
      </slot>
    </template>
  </RouterLink>
</template>

<style>
.layout-default-aside-link {
  text-decoration: none;
  color: var(--el-menu-text-color);
}
.layout-default-aside-link{ /* link 热区 */
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  color: var(--el-color-primary);
}
.layout-default-aside-link.is-active {
  color: var(--el-menu-item-active-color);
}
</style>
