/*
 * @Date: 2023-04-29 18:09:52
 * @LastEditors: jinyuan
 * @LastEditTime: 2023-05-13 17:58:23
 * @FilePath: \umi_dva\src\pages\home\index.jsx
 */

import { memo, useEffect } from 'react';
import {useDispatch,useSelector} from "umi"
import { Dropdown, message, Space , Avatar} from 'antd';
import {items} from "./helper"
import  "./index.less"
const View = memo((props) => {
  
  const onClick = ({ key }) => {
    message.info(`Click on item ${key}`);
  };
  const dispatch=useDispatch(),
 {table_list}=useSelector((state)=>state.home_list)

  useEffect(()=>{
   dispatch({type:"home_list/GET_LIST",pyload:null})
  },[])
 
console.log(table_list)
  return <div>
  <Dropdown 
  menu={{
    items,
    onClick,
  }}
  style={{"height":"50px"}}
>
  <a onClick={(e) => e.preventDefault()}>
    <Space>
      <Avatar.Group
      size="small"
    >
      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" style={{"height":"32px","width":"32px"}}/>
   <span style={{"lineHeight":"30px","fontSize":"16px"}}>账户管理</span>
    </Avatar.Group>
    </Space>
  </a>
</Dropdown>

  
  </div>;
});

export default View;
