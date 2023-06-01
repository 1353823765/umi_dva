/*
 * @Date: 2023-05-23 14:47:21
 * @LastEditors: jinyuan
 * @LastEditTime: 2023-06-01 19:06:00
 * @FilePath: \umi_dva\src\pages\category\service.js
 */
import { request } from "umi";
//获取分类信息
export const getshoplist=async()=>{
    const shopdatalist=await request("/api/admin/goods")
 return shopdatalist
}
//是否上架
export const getshopison=async(id)=>{

    const shopdataison=await request(`/api/admin/goods/${id}/on`,{
      method:"PATCH"
    })
 return shopdataison
}
//是否推荐 
export const getshoprecommend=async(id)=>{
    const shopdatarecommend=await request(`/api/admin/goods/${id}/recommend`,{
      method:"PATCH"
    })
 return shopdatarecommend
}

export const getshopgroup=async()=>{
  const shopdatagroup=await request(`/api/admin/category`)
  // console.log(shopdatagroup)
return shopdatagroup
}