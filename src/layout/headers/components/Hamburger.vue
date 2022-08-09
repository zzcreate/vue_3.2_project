<template>
  <div
    class="hamburger_container"
    @click="toggle"
    id="hamburger"
  >
    <svg-icon :icon="icon"></svg-icon>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const icon = computed(() => store.state.app.siderType ? 'hamburger-opened' : 'hamburger-closed')

const toggle = () => {
  store.commit('app/changeSiderType')
}

</script>

<style>
.hamburger_container {
  margin-right: 16px;
  box-sizing: border-box;
  cursor: pointer;
}
</style>
