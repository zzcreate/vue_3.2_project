<template>
  <!-- 容器布局 -->
  <el-container class="app-wrapper">
    <!-- 侧边 -->
    <el-aside
      :width="asideWidth"
      class="sidebar-container"
    >
      <!-- 菜单 -->
      <Menu />
    </el-aside>
    <!-- 容器右边的容器 -->
    <el-container
      class="container"
      :class="{ hidderContainer: !$store.state.app.siderType }"
    >
      <!-- 头部 -->
      <el-header>
        <Headers />
      </el-header>
      <!-- 主体 -->
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

import Menu from './menu'
import Headers from './headers'

import variables from '@/styles/variables.scss' // 模板里使用 要导入

const store = useStore()

// （调节）侧边栏的宽度
const asideWidth = computed(() => store.state.app.siderType ? variables.sideBarWidth : variables.hideSideBarWidth)

</script>

<style lang="scss" scoped>
.app-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.container {
  width: calc(100% - $sideBarWidth);
  height: 100%;

  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  transition: all 0.28s;

  &.hidderContainer {
    width: calc(100% - $hideSideBarWidth); // main.js 已经导入了
  }
}

::v-deep .el-header {
  padding: 0;
}
</style>
