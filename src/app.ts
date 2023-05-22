import { createLoading } from 'C:/Users/Administrator/OneDrive/桌面/umi_dva/node_modules/dva-loading/dist/index.js';
import { message } from 'antd';
import { useRequest } from 'node_modules/ahooks/lib/index';

/*
 * @Date: 2023-04-29 18:09:52
 * @LastEditors: jinyuan
 * @LastEditTime: 2023-05-22 17:38:20
 * @FilePath: \umi_dva\src\app.ts
 */
// layout运行时配置
// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate

//  

import { history,useModel,RequestConfig} from 'umi';
import { errorHandler } from './services/request';

//运行时初始化数据配置
export async function getInitialState() {
//  
//  console.log(access);

  return {
    //初始值
    // isLogin:false
  };
}
//运行时layout配置，初始化状态initialState通过getInitialState方法透传给运行时配置layout
//自定义layout渲染
export const layout = ({ initialState }) => {
//  console.log(initialState.isLogin); 

  const { location } = history,
  access_token=localStorage.getItem('access_token')
  // console.log(access_token)

 

  return {
    //左侧图标默认图标
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: {
      locale: false,
    },
    onPageChange: () => {
      //判断登入权限，判断用户状态来进行路由的权限管理
   if(access_token===null){
    history.push('/login');
   }
 
}


}}
export const request: RequestConfig = {
  // other axios options you want
  //限制请求接口时间,限制请求时间为30秒
  //超过30秒显示错误信息
 timeout: 30000,
  errorConfig: {
    //异常处理
    errorHandler,
    errorThrower() {},
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
        const token = JSON.stringify(localStorage.getItem("access_token"))       ;
        //设置请求头+token认证
        const ADDheadersToken = {
          Authorization:`Bearer ${token.substring(1,token.length-1)}`
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
      //   console.log(error);
      //   return Promise.reject(error);
      // },
    ],
  ],
  //响应拦截器
  responseInterceptors: [
    // 一个二元组，第一个元素是 request 拦截器，第二个元素是错误处理
    [
      (response) => {
      //console.log(response);
      
        // 不再需要异步处理读取返回体内容，可直接在data中读出，部分字段可在 config 中找到
        const { status,data} = response;
        // console.log(data.access_token)


        if(status===200&&data.access_token){
          history.push("./")
           localStorage.setItem('access_token', data.access_token)
        }
        return response;
      },
    ],
  ],
};
//dva数据流错误信息配置
export const dva = {
  config: {
    onError(e) {
      //监控错误信息
      console.log(e)
      e.preventDefault();
      console.error(e.message);
    },
    
    
  },
};



