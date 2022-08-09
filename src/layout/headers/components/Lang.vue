<template>
  <!-- 下拉菜单 点击菜单项触发事件回调 -->
  <el-dropdown @command="handleCommand">
    <svg-icon icon="language"></svg-icon>
    <template #dropdown>
      <el-dropdown-menu>
        <!-- 派发到command回调函数的参数 -->
        <el-dropdown-item
          command="zh"
          :disabled="currentLanguage === 'zh'"
        >中文（简体）</el-dropdown-item>
        <el-dropdown-item
          command="en"
          :disabled="currentLanguage === 'en'"
        >English</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import { useStore } from 'vuex'

const i18n = useI18n()
const store = useStore()
const currentLanguage = computed(() => i18n.locale.value)

// 更改语言的操作
const handleCommand = (val) => {
  // console.log('val', val)
  i18n.locale.value = val
  store.commit('app/changeLang', val)
  localStorage.setItem('lang', val)
}

</script>
