/*
 * @Date: 2023-04-29 18:10:01
 * @LastEditors: jinyuan
 * @LastEditTime: 2023-05-07 16:19:16
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
      name: '学员管理',
      path: '/stumgt',
  
      routes: [
        {
          name: '学员列表',
          path: '/stumgt/list',
          component: './tasklist/stumgt/stumgt_list',
         
        },
        {
          name: '发布学员',
          path: '/stumgt/sub',
          component: './tasklist/stumgt/stumgt_sub',
        },
      ],
    },
    
  ];