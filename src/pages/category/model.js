/*
 * @Date: 2023-05-23 14:23:28
 * @LastEditors: jinyuan
 * @LastEditTime: 2023-05-28 17:34:46
 * @FilePath: \umi_dva\src\pages\category\model.js
 */
import { getshoplist, getshopison, getshoprecommend } from "./service"
const initial_state = {
  table_list: {},
  loading: true,
  messageinfo: "修改成功"
};

export default {
  namespace: "category_list",
  state: initial_state,
  reducers: {
    updataState: (state, { pyload }) => {
      // console.log(state, pyload);
      return { ...state, ...pyload };
    },


  },
  effects: {
    //获取初始化数据
    *GET_LIST({ pyload }, { put, call }) {
      console.log(pyload)
      const data = yield call(getshoplist)
      yield put({
        type: "updataState", pyload: {
          loading: pyload,
          table_list: data
        }
      })
    },
    //是否上架
    *ISON_LIST({ pyload }, { put, call }) {
      //  console.log(pyload)
      yield getshopison(pyload)
      const data = yield call(getshoplist)
      yield put({
        type: "updataState", pyload: {
          table_list: data
        }
      })
    },
    //是否推荐
    *RECOMMEND_LIST({ pyload }, { put, call }) {
      yield getshoprecommend(pyload)
      const data = yield call(getshoplist)
      yield put({
        type: "updataState", pyload: {
          table_list: data,
          messageinfo: initial_state.messageinfo
        }
      })
    },
    //查询数据
    *SEARCH_LIST({ pyload }, { put, call }) {
      console.log(pyload.title)
      const { data } = yield call(getshoplist)
      const newdatalist = data?.filter((item, index) => {
        if (item.title === pyload.title) {
          return item
        }
      })
      yield put({
        type: 'updataState',
        pyload: {
          tablelist: newdatalist,
        },
      });




    }



  }


}