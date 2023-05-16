/*
 * @Date: 2023-05-07 14:42:05
 * @LastEditors: jinyuan
 * @LastEditTime: 2023-05-16 16:17:56
 * @FilePath: \umi_dva\src\pages\home\model.js
 */

import { gethomelist ,gethomedata} from './service';
const initial_state = {
  table_list: {},
  home_data:{},
   loading:true

};
export default {
  //命名空间
  namespace: 'home_list',
  //初始化状态
  state: initial_state,
  //reducer
  reducers: {
    updataState: (state, { pyload }) => {
      console.log(state, pyload);
      return { ...state, ...pyload };
    },
  },
  //处理异步
  effects: {
    //获取用户信息数据
    *GET_LIST({ pyload }, { put, call }) { 
      const  data  = yield call(gethomelist);
      yield put({ type: 'updataState', pyload: { table_list: data } });
    },
    //获取首页数据
    *GET_HOME({ pyload }, { put, call }) { 
      //  console.log("负载",pyload)
      const  data  = yield  call( gethomedata);
      yield put({ type: 'updataState', pyload: { home_data:data ,loading:pyload } });
    },



  },
};
