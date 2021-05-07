import request from '@/api/request'
// 登录
export function login(query) {
    return request({
      url: '/user/login',
      method: 'post',
      data: query
    })
}
//获取用户
export function getUserList(params) {
  return request({
    url: '/user/getUserList',
    method: 'get',
    data: params
  })
}
//新增用户
export function addUserList(query) {
  return request({
    url: '/user/addUserList',
    method: 'post',
    data: query
  })
}
//删除用户
export function deleteRole(query) {
  return request({
    url: '/user/deleteRole',
    method: 'post',
    data: query
  })
}
//批量删除
export function batchDelete(query) {
  return request({
    url: '/user/batchDelete',
    method: 'post',
    data: query
  })
}
//批量删除
export function updateRole(query) {
  return request({
    url: '/user/updateRole',
    method: 'post',
    data: query
  })
}
