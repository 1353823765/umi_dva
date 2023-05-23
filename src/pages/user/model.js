/*
 * @Date: 2023-05-18 10:22:37
 * @LastEditors: jinyuan
 * @LastEditTime: 2023-05-23 13:22:21
 * @FilePath: \umi_dva\src\pages\user\model.js
 */

import { getadduser, getlockuser, getuserlist } from './service';
const initial_state = {
  tablelist: {},
  loading: true,
  islock: false,
  messageinfo: '请输入查询姓名或邮箱',
  messagelock: '修改成功',
};
export default {
  namespace: 'user_list',
  state: initial_state,
  reducers: {
    updataState: (state, { pyload }) => {
      //  console.log(state, pyload);
      return { ...state, ...pyload };
    },
  },
  effects: {
    //获取table列表数据
    *GET_LIST({ pyload }, { put, call }) {
      console.log('GET_LIST', pyload);
      const data = yield call(getuserlist);
      //  console.log(data)
      yield put({
        type: 'updataState',
        pyload: {
          tablelist: data,
          loading: pyload.loading,
          islock: pyload.islock,
        },
      });
    },
    //搜索查询数据
    *SEARCH_LIST({ pyload }, { put, call }) {
      console.log('SEARCH_LIST', pyload);
      const data = yield call(getuserlist);

      const { name, email, loading } = pyload;
      if (name === undefined && email === undefined) {
        yield put({
          type: 'updataState',
          pyload: { messageinfo: initial_state.messageinfo },
        });
      } else {
        const newdatalist = data?.data.filter((item) => {
          if (item.name === name) {
            return item;
          }
          if (item.email === email) {
            return item;
          }
        });
        yield put({
          type: 'updataState',
          pyload: { tablelist: { data: newdatalist }, islock: true },
        });
      }
    },
    //重置数据
    *RESET_LIST({ pyload }, { put, call }) {
      console.log(pyload);
      const data = yield call(getuserlist);
      yield put({
        type: 'updataState',
        pyload: { tablelist: data, islock: pyload },
      });
    },
    //新增数据
    *ADD_LIST({ pyload }, { put, call }) {
      console.log(pyload);
      //添加新增数据
      getadduser(pyload);
      //获取更新数据
      const data = yield call(getuserlist);
      console.log(data);
      yield put({
        type: 'updataState',
        pyload: { tablelist: data },
      });
    },
    //启用禁用
    *LOCK_LIST({ pyload }, { put, call }) {
      yield getlockuser(pyload);
      yield put({
        type: 'updataState',
        pyload: { messagelock: initial_state.messagelock },
      });
    },
  },
};
