/*
 * @Date: 2023-05-07 16:00:21
 * @LastEditors: jinyuan
 * @LastEditTime: 2023-05-08 10:56:12
 * @FilePath: \umi_dva\src\pages\login\index.jsx
 */
import {  Button, Checkbox, Form, Input } from 'antd';

import styles from "./index.less"
const onFinish = (values) => {
  console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
}

const View = () => (

 <div className={styles.main}>
 <div className={styles.main_container}>
  <Form
    name="basic"
    labelCol={{
      span: 16,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: 600,
  
    }}
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="用户名"
      name="username"
      rules={[
        {
          required: true,
          message: 'Please input your username!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="密码"
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item
      name="remember"
      valuePropName="checked"
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Checkbox>Remember me</Checkbox>
    </Form.Item>

    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>

  
  </div>
 </div>

);
export default View;