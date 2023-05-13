/*
 * @Date: 2023-05-07 16:00:21
 * @LastEditors: jinyuan
 * @LastEditTime: 2023-05-13 12:57:36
 * @FilePath: \umi_dva\src\pages\login\index.jsx
 */

import { useState } from 'react';
import { Button, Checkbox, Form, Input, Spin } from 'antd';
import { useModel, useRequest } from 'umi';
import { getlogin} from './service';
import './index.less';

const View = () => {
   //默认值
   const [loginusername,setLoginusername]=useState("")
   const [loginpassword,setLoginpassword]=useState("")
   const [ischeckout,setIscheckout]=useState(true)
  const { setInitialState } = useModel('@@initialState');
  const { loading, run } = useRequest(getlogin, {
    manual: true,
    // throwOnError:true,
  });
  
  //正确表单项处理
  const onFinish = (values) => {
    // console.log(values);
    console.log(localStorage.getItem("access_token"))
     run(values);
    setInitialState({...values,isLogin: true});
 
  
  };
  //错误表单项
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
// 表单默认值设置
const initValues={
  "email":loginusername,
  "password":loginpassword
}
const remebervalve=()=>{
 setIscheckout(!ischeckout)
 console.log(ischeckout)
console.log(loginusername)


}
  return (
    <Spin spinning={loading} size="large" style={{"top":"20%"}}>
      <div className="main">
        <p>后台登入</p>
        <div className="main_container">
          <Form
            // name="basic"
            // labelCol={{
            //   span: 16,
            // }}
            // wrapperCol={{
            //   span: 16,
            // }}
            // style={{
            //   maxWidth: 600,
            // }}
            //表单的默认值
            initialValues={
              initValues
            }
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              // label="用户名"
              name="email"
              rules={[
                {
                  required: true,
                  message: '请输入用户名',
                },
                {
                  type: 'email',
                  message: '请输入正确的邮箱格式',
                },
              ]}
            >
              <Input
               onChange={(e)=>setLoginusername(e.target.value)}
                placeholder="输入邮箱地址"
                style={{ width: '280px', height: '40px' }}
              />
            </Form.Item>

            <Form.Item
            
              // label="密码"
              name="password"
              rules={[
                {
                  required: true,
                  message: '请输入密码',
                },
              ]}
            >
              <Input.Password
                 onChange={(e)=>{setLoginpassword(e.target.value)}}
                placeholder="密码不能少于6位"
                style={{ width: '280px', height: '40px' }}
                
              />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button
                style={{ width: '280px', height: '40px', marginLeft: '-160px' }}
                type="primary"
                htmlType="submit"
                
                block
              >
                登入
              </Button>
            </Form.Item>
            <Form.Item
              // name="remember"
              valuePropName="checked"
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Checkbox style={{ marginLeft: '-320px' }} onClick={remebervalve}
              
              >记住密码</Checkbox>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Spin>
  );
};

export default View;
