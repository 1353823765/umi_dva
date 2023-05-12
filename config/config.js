/*
 * @Date: 2023-04-29 18:10:01
 * @LastEditors: jinyuan
 * @LastEditTime: 2023-05-09 12:02:52
 * @FilePath: \umi_dva\config\config.js
 */

import { defineConfig } from '@umijs/max';
import { proxy } from './proxy';
import { routes } from './routes';
import { theme } from './theme';
//构建时配置
export default defineConfig({
  antd: {
    //antd配置
    theme,
  },
  dva: {},
  access: {},
  hash: true,
  model: {},
  initialState: {},
  request: {},
  layout: {
    //侧边栏名字
    title: '管理平台',
    locale: false, // 默认开启，如无需菜单国际化可关闭
  },
  //路由配置
  routes,
  npmClient: 'npm',
  //打包生成dist目录带hash值配置
  hash: true,
  //兼容性配置最高兼容到ie11
  targets: {
    ie: 11,
  },
  //代理配置
  proxy,
  //是否开启mock数据
  // mock: false,
  codeSplitting: {
    jsStrategy: 'granularChunks'
  }
 
});
