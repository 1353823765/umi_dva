/*
 * @Date: 2023-05-07 14:41:14
 * @LastEditors: jinyuan
 * @LastEditTime: 2023-05-15 14:27:12
 * @FilePath: \umi_dva\src\pages\home\service.js
 */

import { request } from "umi";
//获取用户信息
export const gethomelist=async()=>{
    const homedatalist=await request("api/admin/user")
 
 return homedatalist
}
//获取首页数据
export const gethomedata=async()=>{ 
    const homedata=await request("api/admin/index")
 return homedata
}
