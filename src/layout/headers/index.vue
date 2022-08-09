<template>
  <div class="navbar">
    <!-- 汉堡按钮 -->
    <Hamburger />
    <!-- 面包屑导航 -->
    <Breadcrumb />
    <div class="navbar-right">
      <!-- 引导功能处 -->
      <Driver class="navbar-item" />
      <!-- 全屏组件 -->
      <ScreenFull class="navbar-item" />
      <!-- 切换语言 -->
      <Lang class="navbar-item" />
      <!-- 头像 -->
      <Avatar class="navbar-item" />
    </div>
  </div>
</template>

<script setup>
import Hamburger from './components/Hamburger'
import Breadcrumb from './components/Breadcrumb'
import Avatar from './components/Avatar'
import Lang from './components/Lang'
import ScreenFull from './components/ScreenFull'
import Driver from './components/driver'

</script>

<style lang="scss" scoped>
.navbar {
  width: 100%;
  height: 60px;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  padding: 0 16px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  position: relative;

  .navbar-right {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    ::v-deep .navbar-item {
      display: inline-block;
      margin-left: 18px;
      font-size: 22px;
      color: #5a5e66;
      box-sizing: border-box;
      cursor: pointer;
    }
  }
}
</style>
