/*
 * @Date: 2023-05-18 10:36:52
 * @LastEditors: jinyuan
 * @LastEditTime: 2023-05-23 14:29:26
 * @FilePath: \umi_dva\src\components\banner\index.jsx
 */

import React, { memo } from 'react'
 import {history} from "umi"
 import {bannerlist} from "./helper"
import "./index.less"
const Banner= memo((props) => {
    const {title}=props

  return (
    <div className='main_container'>
     {
      bannerlist.map((item,index)=><span 
      key={item.path} 
      onClick={()=>{history.push(item.path)}}
       className={title===item.title?"span_state":""}>
      {item.title}</span>

      )
     }


 
    <h3>{name}</h3>
    </div>
  )
})

export default  Banner