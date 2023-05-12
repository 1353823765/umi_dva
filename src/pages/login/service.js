/*
 * @Date: 2023-05-02 16:06:15
 * @LastEditors: jinyuan
 * @LastEditTime: 2023-05-12 18:37:21
 * @FilePath: \umi_dva\src\pages\login\service.js
 */
//登入接口
import { request } from "umi";
export const getlogin=async(user)=>{
    const datalist=await request("/api/auth/login",{
      method:"post",
      data:user
    }) 
 return datalist
}
