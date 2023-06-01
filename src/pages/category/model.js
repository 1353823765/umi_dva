/*
 * @Date: 2023-05-23 14:23:28
 * @LastEditors: jinyuan
 * @LastEditTime: 2023-06-01 19:06:14
 * @FilePath: \umi_dva\src\pages\category\model.js
 */
import { getshoplist, getshopison, getshoprecommend,getshopgroup} from "./service"
const initial_state = {
  table_list: {},
  loading: true,
  messageinfo: "修改成功",
  create_list:{}
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
      // console.log(pyload)
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
      const { data } = yield call(getshoplist)
      const newdatalist = data?.filter((item, index) => {
        if (item.title === pyload.title) {
          return item
        }
      })
      yield put({
        type: 'updataState',
        pyload: {
          table_list:{data:newdatalist},
        },
      });
    },
    //重置功能
     *RESET_LIST({ pyload }, { put, call }) {
      const data = yield call(getshoplist)
      yield put({
        type: "updataState", pyload: {
         
          table_list: data
        }
      })
     },
     //获取新建列表数据
     *GET_CREATELIST({ pyload }, { put, call }) {
      const data=yield call(getshopgroup)
    //  console.log(data)
     yield put({
      type: "updataState", pyload: {
      
        create_list  : data
      }
    })
      }



  }


}