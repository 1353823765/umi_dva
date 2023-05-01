/*
 * @Date: 2023-04-30 14:17:54
 * @LastEditors: jinyuan
 * @LastEditTime: 2023-04-30 14:21:30
 * @FilePath: \umi_dva\config\proxy.js
 */
//代理配置
export const proxy = {
  proxy: {
    '/api': {
      //代理目标地址
      target: 'http://jsonplaceholder.typicode.com/',
      //
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
};
