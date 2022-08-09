<template>
  <!-- 菜单 默认打开的子项（index）；以 index 作为 path 进行路由跳转； 只展开一个子菜单；活动菜单项的文本颜色；菜单的背景颜色；文字颜色;是否水平折叠收起菜单 -->
  <el-menu
    :default-active="defaultActive"
    router
    unique-opened
    active-text-color="#ffd04b"
    background-color="#545c64"
    text-color="#fff"
    :collapse="!$store.state.app.siderType"
  >
    <!-- 菜单子项 -->
    <el-sub-menu
      :index="item.id.toString()"
      v-for="(item, index) in menuList"
      :key="item.id"
    >
      <template #title>
        <el-icon>
          <component :is="iconList[index]"></component>
        </el-icon>
        <span>{{ $t(`menus.${item.path}`) }}</span>
      </template>
      <el-menu-item
        :index="'/' + o.path"
        @click="savePath(o.path)"
        v-for="o in item.children"
        :key="o.id"
      >
        <template #title>
          <el-icon>
            <component :is="icon"></component>
          </el-icon>
          <span>{{ $t(`menus.${o.path}`) }}</span>
        </template>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
import { ref, watch } from 'vue'
import { getMenuListAPI } from '@/api/menu'
import { useStore } from 'vuex'

const store = useStore()

// 图标
const iconList = ref(['user', 'setting', 'shop', 'tickets', 'pie-chart'])
const icon = ref('menu')

// 菜单数据
const menuList = ref([])
const initMenuList = async () => {
  menuList.value = await getMenuListAPI()
  // console.log(menuList.value)
}
initMenuList()

// const defaultActive = ref(sessionStorage.getItem('path') || '/users')
// 菜单 默认打开的子项
const defaultActive = ref(store.state.app.menuPath)
// console.log('store.state.app.menuPath', store.state.app.menuPath)
// 点击菜单项 保存菜单项path
const savePath = path => { store.commit('app/setMenuPath', `/${path}`) }

// path变化 菜单打开的项变化
watch(() => store.state.app.menuPath, () => {
  defaultActive.value = store.state.app.menuPath
})
</script>
