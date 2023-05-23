/*
 * @Date: 2023-04-29 18:10:01
 * @LastEditors: jinyuan
 * @LastEditTime: 2023-05-23 14:25:46
 * @FilePath: \umi_dva\config\routes.js
 */

//路由配置
export const routes = [
    {
      path: '/',
      redirect: '/home',
      icon: 'testicon'
    },
    
    {
      name: '首页统计',
      path: '/home',
      component: '@/pages/home',
    
     
    },
    {
        name: '登入',
        path: '/login',
        component: '@/pages/login',
        //左边侧边栏不显示
        layout:false,
      },
  
    {
      name: '用户管理',
      path: '/user',
      component: '@/pages/user',
    
    },
    {
      name: '分类管理',
      path: '/category',
      component: '@/pages/category',

    }
    
  ];