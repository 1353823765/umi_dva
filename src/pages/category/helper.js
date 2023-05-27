/*
 * @Date: 2023-05-27 15:58:13
 * @LastEditors: jinyuan
 * @LastEditTime: 2023-05-27 16:21:16
 * @FilePath: \umi_dva\src\pages\category\helper.js
 */

//table表格数据配置
export const Tabledatalist = (arr) => {
  let newdata = [];
  if (arr?.length) {
    arr.forEach((item, index) =>
      newdata.push({
        //id
        id: item.id,
        //封面图
        cover_url: item.cover_url,
        //标题
        title: item.title,
        //库存
        stock: item.stock,
        //价格
        price: item.price,
        created_at: item.created_at,
        //是否上架 0不上架 1上架
        is_on: item.is_on,
        //	是否推荐 0不推荐 1推荐
        is_recommend: item.is_recommend,
        //详情
        details: item.details,
        //销量
        sales:item.sales
      }),
    );
    return newdata;
  }
};
