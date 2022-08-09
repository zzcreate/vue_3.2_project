<template>
  <!-- 面包屑 分隔符 -->
  <el-breadcrumb separator="/">
    <el-breadcrumb-item
      v-for="(item, index) in breadcrumbList"
      :key="index"
    >
      <span
        class="no-redirect"
        v-if="index === breadcrumbList.length - 1"
      >
        {{ $t('menus.' + item.name.toLowerCase()) }}</span>
      <span
        class="redirect"
        v-else
        @click="handleRedirect(item.path)"
      >{{ $t(`menus.${item.name}`) }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'

const route = useRoute()
const router = useRouter()
const store = useStore()

// 面包屑数据
const breadcrumbList = ref([])
const initBreadcrumbList = () => {
  breadcrumbList.value = route.matched
  // console.log('route', route.matched)
}

// 监听前路由改变
watch(route, () => {
  initBreadcrumbList()
}, { deep: true, immediate: true })

// 面包屑 除最后一项 可以点击跳转路由
const handleRedirect = path => {
  // sessionStorage.setItem('path', path)
  // console.log(' ', path)
  if (path === '/') { path = '/users' }
  // 更新左侧菜单的活动项
  store.commit('app/setMenuPath', path)
  router.push(path)
  // console.log('path', path)
}

</script>

<style lang="scss" scoped>
.no-redirect {
  color: #97a8be;
}

.redirect {
  color: #666;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    color: $menuBg;
  }
}
</style>
