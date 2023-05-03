/*
 * @Date: 2023-04-30 16:06:45
 * @LastEditors: jinyuan
 * @LastEditTime: 2023-05-03 14:28:36
 * @FilePath: \umi_dva\src\pages\tasklist\stumgt\stumgt_list\model.js
 */
import { getList } from './service';
const initial_state = {
  table_list: {},
};
export default {
  //命名空间
  namespace: 'stumgt_list',
  //初始状态
  state: initial_state,
  //reducers更新状态
  reducers: {
    updataState(state, { pyload }) {
      // console.log(state, pyload);
      return { ...state, ...pyload };
    },
  },
  //effect
  effects: {
    //获取数据方法
    *GET_LIST({ pyload }, { put, call }) {
      // console.log(pyload, '1111');

      const { data } = yield call(getList);
      yield put({ type: 'updataState', pyload: { table_list: data } });
    },
  },
};
