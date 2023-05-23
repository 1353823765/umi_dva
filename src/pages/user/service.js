/*
 * @Date: 2023-05-18 10:22:37
 * @LastEditors: jinyuan
 * @LastEditTime: 2023-05-23 13:23:40
 * @FilePath: \umi_dva\src\pages\user\service.js
 */

import { request } from "umi";
//获取用户信息
export const getuserlist=async()=>{
    const usersdatalist=await request("/api/admin/users")
 
 return usersdatalist
}
  //新增用户信息
export const getadduser=async(user)=>{
  // console.log(user)
    const adduser=await request("/api/admin/users",{
      method:"post",
       data: user
    }) 
    // console.log(adduser)
 return  adduser
}
//用户禁用启用
export const getlockuser=async(id)=>{
  console.log(id)
    const lockuser=await request(`/api/admin/users/${id}/lock`,{
      method:"PATCH",
     
    }) 
    // console.log(id)
    // console.log(lockuser)
 return  lockuser
}


