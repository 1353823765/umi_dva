/*
 * @Date: 2023-04-30 15:55:51
 * @LastEditors: jinyuan
 * @LastEditTime: 2023-05-03 17:25:46
 * @FilePath: \umi_dva\src\pages\tasklist\stumgt\stumgt_list\service.js
 */
import { request } from 'umi';
export const getList = () => {
  return request('/api/admin/users');
};
