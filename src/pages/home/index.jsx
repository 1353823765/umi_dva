/*
 * @Date: 2023-04-29 18:09:52
 * @LastEditors: jinyuan
 * @LastEditTime: 2023-05-12 19:21:42
 * @FilePath: \umi_dva\src\pages\home\index.jsx
 */

import { memo, useEffect } from 'react';
import {useDispatch,useSelector} from "umi"

const View = memo((props) => {
  const dispatch=useDispatch(),
 {table_list}=useSelector((state)=>state.home_list)

  useEffect(()=>{
   dispatch({type:"home_list/GET_LIST",pyload:null})
  },[])
 
console.log(table_list)
  return <div>
  

  
  </div>;
});

export default View;
