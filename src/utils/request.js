/*
 * @Date: 2023-05-02 14:22:01
 * @LastEditors: jinyuan
 * @LastEditTime: 2023-05-03 17:16:14
 * @FilePath: \umi_dva\src\utils\request.js
 */
import {codeMessage} from  "./helper";
import {notification} from "antd";

//异常处理
export const errorHandler=(error)=>{
const {response}=error,
 {config}=response
if(response&&response.status){
  //判断状态码是多少
const errorText=codeMessage[response.status]||response.statusText,
{status}=response
//status状态吗
//url 请求地址
console.log("response:",response,"errorText",errorText)
//提示错误信息
notification.error({
message:`请求错误${status}:${config.url}`,
description:errorText,
})
}else if(!response){
  notification.error({
  message:"您的网络异常，无法连接到服务器",
  description:"网络异常"
  })
  return response
}

}
