/*
 * @Date: 2023-05-23 14:16:52
 * @LastEditors: jinyuan
 * @LastEditTime: 2023-05-24 15:52:40
 * @FilePath: \umi_dva\src\pages\user\user_modal\index.jsx
 */
import { Form, Input, Modal } from 'antd';
import { forwardRef } from 'react';
import { useDispatch } from 'umi';
const UserModal = forwardRef((props, ref) => {
  const { isModalOpen, setIsModalOpen } = props,
    dispatch = useDispatch(),
    [form] = Form.useForm();
  //新建from表单提交验证
  const handleOk = async () => {
    const values = await form.validateFields();
    form.resetFields();
    setIsModalOpen(false);

    dispatch({ type: 'user_list/ADD_LIST', pyload: values });
    dispatch({ type: 'user_list/GET_LIST', pyload: { islock: true } });
  };
  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };
  return (
    <>
      <Modal
        title="添加用户"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
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
          <Form.Item
            label="密码"
            name="password"
            rules={[
              {
                required: true,
                message: '输入密码',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item></Form.Item>
        </Form>
      </Modal>
    </>
  );
});

export default UserModal;
