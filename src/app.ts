
/*
 * @Date: 2023-04-29 18:09:52
 * @LastEditors: jinyuan
 * @LastEditTime: 2023-05-08 18:14:06
 * @FilePath: \umi_dva\src\app.ts
 */
// layout运行时配置
// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate

import type { RequestConfig } from 'umi';
import { history } from 'umi';
import { errorHandler } from './utils/request';

//运行时初始化数据配置
export async function getInitialState() {
  return { islogin: false };
}
//运行时layout配置，初始化状态initialState通过getInitialState方法透传给运行时配置layout
//自定义layout渲染
export const layout = ({ initialState }) => {
  const { location } = history
  return {
    //左侧图标默认图标
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: {
      locale: false,
    },
    onPageChange: () => {
      //判断登入权限，判断用户状态来进行路由的权限管理
      if (initialState && location.pathname !== '/login') {
        history.push('/login')
      }


    }
  };
};

export const request: RequestConfig = {
  timeout: 1000,
  // other axios options you want
  errorConfig: {
    //异常处理
    errorHandler,
    errorThrower() { },
  },
  //请求拦截器注册
  requestInterceptors: [
    // 直接写一个 function，作为拦截器
    [
      (url, options) => {
        //获取请求头
        const {
          headers: { common },
        } = options;
        //获取设置token
        const token = 'hellow';
        //设置请求头+token认证
        const ADDheadersToken = {
          Authorization: `Bearer ${token}`,
        };

        return {
          url,
          options: {
            ...options,
            //重新设置请求头
            headers: Object.assign(common, ADDheadersToken),
          },
        };
      },
      //错误处理
      // (error) => {
      //   return Promise.reject(error);
      // },
    ],
  ],
  responseInterceptors: [
    // 一个二元组，第一个元素是 request 拦截器，第二个元素是错误处理
    [
      (response) => {
        // 不再需要异步处理读取返回体内容，可直接在data中读出，部分字段可在 config 中找到
        const { data = {}, config } = response;
        return response;
      },
    ],
  ],
};
