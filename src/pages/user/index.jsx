/*
 * @Date: 2023-05-18 10:21:47
 * @LastEditors: jinyuan
 * @LastEditTime: 2023-05-18 18:49:48
 * @FilePath: \umi_dva\src\pages\user\index.jsx
 */
import {Button, Form, Input ,Table} from 'antd'
import React, { memo ,useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'umi';
import Banner from '../../components/banner'
import "./index.less"
const View = memo(() => {
  const [form] = Form.useForm(),
   [, forceUpdate] = useState({}),
    dispatch=useDispatch(),
    {tablelist}= useSelector((state)=>state.user_list)
 

  useEffect(() => {
    forceUpdate({});
  }, []);

  useEffect(()=>{
   dispatch({type:"user_list/GET_LIST",pyload:null})
  },[])

  const onFinish = (values) => {
    console.log('Finish:', values);
  };
console.log( tablelist)
  return (
    <div>
      <Banner name={"用户管理"}></Banner>
     <div className='main'>
  
     <Form form={form} name="horizontal_login" layout="inline" onFinish={onFinish} style={{
    height:"100%",alignItems:"center",
     }}>
      <Form.Item
        name="user"
        label="姓名"
        // rules={[
        //   {
        //     required: true,
        //     message: 'Please input your username!',
        //   },
        // ]}
      >
        <Input  placeholder="请输入" />
      </Form.Item>
      <Form.Item
        name="email"
        label="邮箱"
    
      >
     <Input    placeholder="请输入" 
        />
      
      
      </Form.Item>
      <Form.Item shouldUpdate>
        {() => (
          <Button
            type="primary"
            htmlType="submit"
        
          >
            查询
          </Button>
        )}
        
      </Form.Item>
      <Form.Item shouldUpdate>
      {() => (
        <Button
          type="primary"
          htmlType="submit"
      
        >
          重置
        </Button>
      )}
      
    </Form.Item>
    </Form>
    <Table style={{"marginTop":"10px"}}></Table>
    </div>
     </div>
    
   
  )
})

export default View
