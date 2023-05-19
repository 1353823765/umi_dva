/*
 * @Date: 2023-05-18 13:23:24
 * @LastEditors: jinyuan
 * @LastEditTime: 2023-05-19 14:07:02
 * @FilePath: \umi_dva\src\pages\user\helper.js
 */
//table表格dataSource配置项
export const Tabledatalist = (arr) => {
  let newdata = [];
  if (arr?.length) {
    arr.forEach((item, index) =>
      newdata.push({
        avatar_url: item.avatar_url,
        name: item.name,
        email: item.email,
        is_locked: item.is_locked,
        created_at: item.created_at,
      }),
    );
    return newdata;
  }
};
