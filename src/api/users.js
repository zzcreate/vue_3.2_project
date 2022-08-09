import request from './request'

export const getUserListAPI = (params) => { // 获取用户列表
  return request({
    url: '/users',
    params
  })
}

export const changeUserStateAPI = (uId, type) => request({ // 修改用户状态
  url: `users/${uId}/state/${type}`,
  method: 'PUT'
})

export const addUserAPI = data => request({
  url: '/users',
  method: 'POST',
  data
}) // 添加用户

export const editUserAPI = data => request({ // 编辑用户
  url: `users/${data.id}`,
  method: 'PUT',
  data
})

export const deleteUserAPI = id => request({
  url: `users/${id}`,
  method: 'delete'
})
