/*
 * @Date: 2023-05-23 14:47:21
 * @LastEditors: jinyuan
 * @LastEditTime: 2023-05-27 16:30:26
 * @FilePath: \umi_dva\src\pages\category\service.js
 */
import { request } from "umi";
//获取分类信息
export const getshoplist=async()=>{
    const shopdatalist=await request("/api/admin/goods")
 return shopdatalist
}