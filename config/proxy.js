/*
 * @Date: 2023-04-30 14:17:54
 * @LastEditors: jinyuan
 * @LastEditTime: 2023-05-06 13:13:39
 * @FilePath: \umi_dva\config\proxy.js
 */
//代理配置
export const proxy = {

    '/api': {
      target: 'https://api.shop.eduwork.cn/',
      changeOrigin: true,
     
    }
  
};
