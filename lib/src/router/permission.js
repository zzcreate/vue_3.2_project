import router from './index'
import store from '@/store'

const whiteList = ['/login'] // 白名单 不用登录

router.beforeEach((to, from, next) => { // 全局前置守卫
  if (store.getters.token) { // 有token
    if (to.path === '/login') { // 跳转登录页 因为有token 直接去首页吧
      next('/')
    } else {
      next() // 有token 要去的不是登录页 放行
    }
  } else { // 无token
    if (whiteList.includes(to.path)) { // 白名单 放行
      next()
    } else {
      next('/login') // 不在白名单 就是说要让他登录
    }
  }
})
