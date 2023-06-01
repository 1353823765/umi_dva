/*
 * @Date: 2023-05-24 15:09:45
 * @LastEditors: jinyuan
 * @LastEditTime: 2023-06-01 19:15:25
 * @FilePath: \umi_dva\src\pages\user\user_edit_modal\index.jsx
 */
import React, { memo,useImperativeHandle } from 'react'
import { useDispatch } from 'umi';
import { Form, Input, Modal,message } from 'antd';
const UserEditModal = memo((props) => {
  const{ EditModalOpen,setEditModalOpen,inputinfo,showinfo}=props,
   dispatch = useDispatch(),
  [form] = Form.useForm()
  // 修改编辑
  const handleEditOk =async  () => {
    const values = await form.validateFields(),
 {name, email,id}=inputinfo.current
 if(name===values.name&&email===values.email ){
  console.log(values)
 message.warning("没有修改编辑")
 setEditModalOpen(true);
 }else{
   dispatch({type:'user_list/EDIT_LIST',pyload:{user:{...values},id}});
  form.resetFields();
  setEditModalOpen(false);
  message.success("修改成功")
 }
  };
  // 编辑模态框数据回显
  const showEditModal = (record) => {
    inputinfo.current=record
  form.setFieldsValue(record)
    setEditModalOpen(true);
  };
  //暴露showEditModal方法给父组件通过useRef
  useImperativeHandle(showinfo,()=>({
    showEditModal:(record)=>showEditModal(record)
  })
  )
  //关闭编辑模态框
  const handleEditCancel = () => {
    setEditModalOpen(false);
    form.resetFields();
  };
  return (
    <> 
          <Modal title="编辑"
           open={EditModalOpen}
           onOk={handleEditOk} 
           onCancel={handleEditCancel}>
      <Form form={form} name="basic" autoComplete="off">
        <Form.Item
          label="姓名"
          name="name"
          rules={[
            {
              required: true,
              message: '输入用户名',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="邮箱"
          name="email"
          rules={[
            {
              required: true,
              message: '输入邮箱地址',
            },

            {
              type: 'email',
              message: '请输入正确的邮箱格式',
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
    </>
  )
})

export default UserEditModal 
