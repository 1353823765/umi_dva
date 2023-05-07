/*
 * @Date: 2023-05-07 14:42:05
 * @LastEditors: jinyuan
 * @LastEditTime: 2023-05-07 15:36:48
 * @FilePath: \umi_dva\src\pages\home\model.js
 */
import { gethomelist } from './service';
const initial_state = {
  table_list: {},
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
    //获取数据
    *GET_LIST({ pyload }, { put, call }) {
      const { data } = yield call(gethomelist);
      console.log(data);
      console.log(pyload);
      yield put({ type: 'updataState', pyload: { table_list: data } });
    },
  },
};
