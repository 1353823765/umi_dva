/*
 * @Date: 2023-05-18 10:22:37
 * @LastEditors: jinyuan
 * @LastEditTime: 2023-05-19 18:22:38
 * @FilePath: \umi_dva\src\pages\user\model.js
 */

import { getuserlist } from './service';

const initial_state = {
  tablelist: {},
  loading: true,
  messageinfo: '请输入查询姓名或邮箱',
};

export default {
  namespace: 'user_list',
  state: initial_state,
  reducers: {
    updataState: (state, { pyload }) => {
      console.log(state, pyload);
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
        pyload: { tablelist: data, loading: pyload },
      });
    },
    //搜索查询数据
    *SEARCH_LIST({ pyload }, { put, call }) {
      console.log('SEARCH_LIST', pyload);
      const { name, email,loading } = pyload;
      if (name === undefined && email === undefined) {
        yield put({
          type: 'updataState',
          pyload: { messageinfo: initial_state.messageinfo },
        });
      }
      const data = yield call(getuserlist)
      const newdatalist = data?.data.filter((item) => {
        if (item.name === name) {
          return item;
        }
        if (item.email === email) {
          return item
        }
      }) 
      yield put({type: 'updataState',pyload:{tablelist:{data:newdatalist},loading}})
    },
    *RESET_LIST({pyload},{put,call}){
 


    }
  },
};
