import { getuserlist } from "./service"


const initial_state={
  tablelist:{}

}


export default {
    namespace:"user_list",
  state:initial_state,
  reducers:{
    updataState:(state,{pyload})=>{
      console.log(state,pyload)
 return {...state,...pyload}
    }
  },
  effects:{
*GET_LIST({pyload},{put,call}){
    console.log("GET_LIST",pyload)
 const data=yield call(getuserlist)
 console.log(data)
   yield put({type:"updataState",pyload:pyload})

}

  }



}