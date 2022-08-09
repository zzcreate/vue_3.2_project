import { loginAPI } from '@/api/login'
import router from '@/router'
import { setTokenTime } from '@/utils/auth'

export default {
  namespaced: true,
  state: () => ({
    token: localStorage.getItem('token') || '',
    siderType: true,
    lang: localStorage.getItem('lang') || 'zh',
    menuPath: sessionStorage.getItem('menuPath') || '/users'
  }),
  mutations: {
    setToken(state, token) {
      state.token = token
      localStorage.setItem('token', token)
    },
    changeSiderType(state) {
      state.siderType = !state.siderType
    },
    changeLang(state, lang) {
      state.lang = lang
    },
    setMenuPath(state, path) {
      state.menuPath = path
      sessionStorage.setItem('menuPath', path)
    }
  },
  actions: {
    login({ commit }, userInfo) { // 登录 发送请求 保存token 设置登录时间
      return new Promise((resolve, reject) => {
        loginAPI(userInfo)
          .then(res => {
            console.log(res)
            commit('setToken', res.token)
            setTokenTime()
            router.replace('/')
            resolve()
          })
          .catch(err => reject(err))
      })
    },
    logout({ commit }) { // 登出 state的token设置为空 清楚本体存的token 跳转登录页
      commit('setToken', '')
      // localStorage.removeItem('token')
      localStorage.clear()
      sessionStorage.clear()
      router.replace('/login')
    }
  }
}
