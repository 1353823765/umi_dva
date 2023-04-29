/*
 * @Date: 2023-04-29 18:10:01
 * @LastEditors: jinyuan
 * @LastEditTime: 2023-04-29 19:02:38
 * @FilePath: \umi_dva\config\config.js
 */

import { defineConfig } from '@umijs/max';
import { routes } from './routes';
const WebpackBar = require('webpackbar');
export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    //侧边栏名字
    title: '管理平台',
    locale: false, // 默认开启，如无需菜单国际化可关闭
  },
  routes,
  npmClient: 'npm',
});
