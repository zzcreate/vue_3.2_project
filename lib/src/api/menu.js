import request from './request'

export const getMenuListAPI = () => {
  return request({
    url: '/menus'
  })
}
