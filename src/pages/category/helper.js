/*
 * @Date: 2023-05-27 15:58:13
 * @LastEditors: jinyuan
 * @LastEditTime: 2023-06-01 19:02:36
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
};1
//配置添加商品分类
export  const Gettree = (arr) => {
  if (arr instanceof Array && arr?.length > 0) {
    let newArr = arr.map((item) => {
      let obj = {};
      //创建一个对象格式
      if (item.children.length > 0) {
        obj['value'] = item.name;
        obj['label'] = item.name;
        obj['children'] = item.children.map((child) => {
          return { value: child.name, label: child.name };
        });
      }
      return obj;
    });
    //过滤对象中为空对象的一项
    const fifternewArr = newArr?.filter(
      (value) => Object.keys(value).length !== 0,
    );
   //去重第一层数据
    const unnewArr = Array.from(
      new Set(fifternewArr?.map((obj) => JSON.stringify(obj))),
    ).map((str) => JSON.parse(str));
     //去重children中的数据
   const uniqueArr = unnewArr .map((item) => {
      const uniqueChildren = item.children.filter((child, index) => {
        return item.children.findIndex(obj => obj.value === child.value) === index;
      });
      return {...item, children: uniqueChildren};
    });
    return uniqueArr;
  }
};