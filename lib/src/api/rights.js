import request from './request'

export const getRoleListAPI = () => { // 获取角色列表
  request({
    url: '/roles'
  })
}
