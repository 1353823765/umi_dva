/*
 * @Date: 2023-05-02 16:06:15
 * @LastEditors: jinyuan
 * @LastEditTime: 2023-05-06 13:16:43
 * @FilePath: \umi_dva\src\services\demo\user.js
 */
import { request } from "umi";
export const getlist=async()=>{
    const datalist=await request("/api/auth/login",{
      method:"post",
    }) 

 return datalist
}
