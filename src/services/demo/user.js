/*
 * @Date: 2023-05-02 16:06:15
 * @LastEditors: jinyuan
 * @LastEditTime: 2023-05-03 17:31:56
 * @FilePath: \umi_dva\src\services\demo\user.js
 */
import { request } from "umi";
export const getlist=async()=>{
    const datalist=await request("/api/auth/login") 
  console.log(datalist)
 return datalist
}
