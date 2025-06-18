<script lang="ts" setup>
import { logout } from '@skzz/platform/api/login'
import DarkSwitch from '_c/DarkSwitch/index.vue'
import SizeCtrl from '_c/SizeCtrl/index.vue'
import { ElAvatar } from 'element-plus'
import { defineAsyncComponent } from 'vue'
import { useThemeStore } from '@/stores/theme'

defineEmits({
  load: null,
})
const LayoutTopMenu = defineAsyncComponent(() => import('_c/LayoutTopMenu/index.vue'))
const { layoutTopClassName } = useThemeStore()
</script>

<template>
  <div
    sk-flex="row-between-center"
    class="layout-top text-white"
    :class="{
      [layoutTopClassName]: true,
    }"
  >
    <div sk-flex="row_center">
      <div class="layout-top-title f-xxxl font-600 plr-l ptb-s">
        @vunk/markdown
      </div>
      <LayoutTopMenu
        @load="$emit('load')"
      ></LayoutTopMenu>
    </div>

    <div
      class="pr-l sub-ml-widget-space "
      sk-flex="row_center"
    >
      <DarkSwitch></DarkSwitch>

      <SizeCtrl></SizeCtrl>

      <ElDropdown>
        <ElAvatar
          :size="32"
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        >
          user
        </ElAvatar>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>Action 1</el-dropdown-item>
            <el-dropdown-item>Action 2</el-dropdown-item>
            <el-dropdown-item>Action 3</el-dropdown-item>
            <!-- <el-dropdown-item disabled>Action 4</el-dropdown-item> -->
            <el-dropdown-item divided>
              <ElLink
                type="danger"
                @click="logout"
              >
                退出登录
              </ElLink>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </ElDropdown>

      <!-- <ElButton @click="logout">退出</ElButton> -->
    </div>
  </div>
</template>

<style>
.layout-top{
  background: var(--layout-top-bg, var(--el-color-primary));
  min-height: 60px;
}
.layout-top-title{
  min-width: var(--layout-aside-width);
}
</style>
