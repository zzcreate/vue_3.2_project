<template>
  <div
    @click="handleFull"
    id="screenFull"
  >
    <svg-icon :icon="icon ? 'exit-fullscreen' : 'fullscreen'"></svg-icon>
  </div>
</template>

<script setup>
import screenfull from 'screenfull'

import { ref, onMounted, onBeforeUnmount } from 'vue'

// 点击处理全屏 先判断是否可以全屏
const handleFull = () => {
  if (screenfull.isEnabled) {
    screenfull.toggle()
  }
}

const icon = ref(screenfull.isFullscreen)
// 切换全屏功能的时候 把全屏状态给到icon
const changeIcon = () => {
  icon.value = screenfull.isFullscreen
}

onMounted(() => {
  screenfull.on('change', changeIcon)
})
onBeforeUnmount(() => {
  screenfull.off('change', changeIcon)
})
</script>
