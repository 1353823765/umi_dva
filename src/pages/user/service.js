/*
 * @Date: 2023-05-18 10:22:37
 * @LastEditors: jinyuan
 * @LastEditTime: 2023-05-25 11:33:23
 * @FilePath: \umi_dva\src\pages\user\service.js
 */

import { request } from "umi";
//获取用户信息
export const getuserlist = async () => {
  const usersdatalist = await request("/api/admin/users")
  return usersdatalist
}
//新增用户信息
export const getadduser = async (user) => {
  const adduser = await request("/api/admin/users", {
    method: "post",
    data: user
  })
  return adduser
}
//用户禁用启用
export const getlockuser = async (id) => {
  // console.log(id)
  const lockuser = await request(`/api/admin/users/${id}/lock`, {
    method: "PATCH",
  })
  return lockuser
}
//修改更新数据
export const getedituser = async (id, user) => {
  //id为用户的id字段
  //user为更新的name和email字段信息
  const edituser = await request(`/api/admin/users/${id}`, {
    method: "PUT",
    data: user
  })
  return edituser
}


