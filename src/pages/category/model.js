/*
 * @Date: 2023-05-23 14:23:28
 * @LastEditors: jinyuan
 * @LastEditTime: 2023-05-27 15:50:12
 * @FilePath: \umi_dva\src\pages\category\model.js
 */
import {getshoplist} from "./service"
 const initial_state = {
    table_list: {},
     loading:true
  
  };

export default {
     namespace:"category_list",
     state:initial_state,
     reducers:{
        updataState: (state, { pyload }) => {
            // console.log(state, pyload);
            return { ...state, ...pyload };
          },
   

     },
     effects:{
      //获取初始化数据
      *GET_LIST({pyload},{ put, call }){
        console.log(pyload)
          const data= yield call(getshoplist)
         yield put({type:"updataState",pyload:{
          loading:pyload,
          table_list:data
         }})
      }
    
    
    
    
        }


}