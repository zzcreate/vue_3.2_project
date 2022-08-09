<template>
  <!-- 下拉菜单 -->
  <el-dropdown>
    <span>
      <!-- 头像 -->
      <el-avatar
        shape="square"
        :size="40"
        :src="squareUrl"
      />
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">{{ $t('logout.btnText') }}</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const squareUrl = ref('https://img0.baidu.com/it/u=3649456712,2693790686&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400')

const logout = () => {
  store.dispatch('app/logout')
}

</script>
