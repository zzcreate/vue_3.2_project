import axios from 'axios'

import { ElMessage } from 'element-plus'

import { diffTokenTime } from '@/utils/auth'
import store from '@/store' // 通过vuex退出登录

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

service.interceptors.request.use(config => {
  if (localStorage.getItem('token')) { // 有token
    if (diffTokenTime()) { // 过期  退出登录
      store.dispatch('app/logout')
      return Promise.reject(new Error('token 已失效'))
    }
  }
  config.headers.Authorization = localStorage.getItem('token')
  return config
}, error => Promise.reject(new Error(error)))

service.interceptors.response.use(response => {
  // console.log(response)
  const { data, meta } = response.data
  if (meta.status === 200 || meta.status === 201) {
    return data
  } else {
    ElMessage.error(meta.msg)
    return Promise.reject(new Error(meta.msg))
  }
}, error => {
  error.response && ElMessage.error(error.response.data)
  return Promise.reject(new Error(error.response.data))
})

export default service
