/*
 * @Date: 2023-05-18 10:22:37
 * @LastEditors: jinyuan
 * @LastEditTime: 2023-05-18 10:30:16
 * @FilePath: \umi_dva\src\pages\user\service.js
 */

import { request } from "umi";
//获取用户信息
export const getuserlist=async()=>{
    const usersdatalist=await request("/api/admin/users")
 
 return usersdatalist
}