/*
 * @Date: 2023-05-02 14:22:01
 * @LastEditors: jinyuan
 * @LastEditTime: 2023-05-15 14:25:25
 * @FilePath: \umi_dva\src\services\request.js
 */
import { message } from 'antd';
import { codeMessage } from './helper';
//异常处理
export const errorHandler = (error) => {
  const { response } = error;
  // 监控请求信息错误
  if (error.name === 'AxiosError') {
    console.log('网络请求超时错误信息', error);
    // notification.error({
    //   message: "请求超时请重试",
    //   description: message
    // })
  }
  if (!response) {
    message.error('您的网络异常，无法连接到服务器');
    return response;
  }
  if (response && response?.status) {
    //判断状态码是多少
    let errorText = codeMessage[response.status] || response.statusText,
      {
        status,
        data: { errors },
      } = response;
    //验证422错误提示
    if (status === 422) {
      for (let key in errors) {
        errorText = errorText + errors[key][0];
      }
    }

    //验证400错误提示
    if (status === 400) {
      errorText = errorText + `${response.data.message}`;
    }
    //验证401错误提示
    if (status === 401) {
      errorText = `用户名密码不正确,没有权限访问`;
    }
    message.error(errorText);
  }
};
