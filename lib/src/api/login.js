import request from './request'

// 登录
export const loginAPI = (data) => {
  return request({
    url: '/login',
    method: 'POST',
    data
  })
}
