/*
 * @Date: 2023-05-07 14:41:14
 * @LastEditors: jinyuan
 * @LastEditTime: 2023-05-07 14:55:29
 * @FilePath: \umi_dva\src\pages\home\service.js
 */
//获取首页数据
import { request } from "umi";
export const gethomelist=async()=>{
    const homedatalist=await request("/api/admin/index")
 return homedatalist
}