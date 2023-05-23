/*
 * @Date: 2023-05-18 10:21:47
 * @LastEditors: jinyuan
 * @LastEditTime: 2023-05-23 14:31:06
 * @FilePath: \umi_dva\src\pages\user\index.jsx
 */
import {  Avatar, Button,Form,  Input,  Switch,  Modal,  Table,  message,} from 'antd';
import { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'umi';
import Banner from '../../components/banner';
import { Tabledatalist } from './helper';
import './index.less';
const View = memo(() => {
  const [form] = Form.useForm(),
    [, forceUpdate] = useState({}),
    [dataSource, setdataSource] = useState([]),
    [isModalOpen, setIsModalOpen] = useState(false),
    [isloading, setIsLoading] = useState(false),
    dispatch = useDispatch(),
    { tablelist, loading, messageinfo, islock, messagelock } = useSelector(
      (state) => state.user_list,
    ),
    { data } = tablelist,
    //table表格配置
    columns = [
      {
        title: '头像',
        dataIndex: 'avatar_url',
        key: 'avatar_url',
        render: (item) => <Avatar src={item}></Avatar>,
      },
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
      },
      ,
      {
        title: '是否禁用',
        dataIndex: 'is_locked',
        key: 'is_locked  ',
        render: (item, record) => (
          //  console.log(item)
          <Switch
            onChange={() => onChangeSwitch(item, record)}
            defaultChecked={record.is_locked === 0}
          ></Switch>
        ),
      },
      {
        title: '创建时间',
        dataIndex: 'created_at',
        key: 'created_at',
      },
      {
        title: '编辑',
        dataIndex:"id",
        render:(item,record)=><a onClick={()=>{console.log(item,record)}}>编辑</a>
      },
    ];
  // 开关方法
  const onChangeSwitch = (item, record) => {
    console.log(item, record.id);
    if (record.id === 2) {
      message.warning('没有权限操作');
    } else {
      dispatch({ type: 'user_list/LOCK_LIST', pyload: record.id });
      message.success(messagelock);
    }

    // console.log(`switch to ${record.id}`);
  };

  useEffect(() => {
    forceUpdate({});
  }, []);
  //table初始化数据
  useEffect(() => {
    dispatch({ type: 'user_list/GET_LIST', pyload: { loading: false } });
  }, []);
  //更新table数据
  useEffect(() => {
    setdataSource(Tabledatalist(data));
  }, [data]);
  //查询table数据
  const onFinish = (values) => {
    const { name, email } = values;
    dispatch({
      type: 'user_list/SEARCH_LIST',
      pyload: { ...values, islock: true },
    });
    console.log('Finish:', values);
    if (name === undefined && email === undefined) {
      message.error(messageinfo);
    }
    if (name === '' && email === '') {
      message.error(messageinfo);
    }
  };
  //重置
  const onReset = () => {
    dispatch({ type: 'user_list/RESET_LIST', pyload: { islock: false } });
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  //新建from表单提交验证
  const handleOk = async () => {
    const values = await form.validateFields();
    form.resetFields();
    // console.log('Failed:',values);
    setIsModalOpen(false);

    dispatch({ type: 'user_list/ADD_LIST', pyload: values });
    dispatch({ type: 'user_list/GET_LIST', pyload: { islock: true } });
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  console.log('Loading', loading, islock);

  return (
    <div>
      <Banner title='用户管理'></Banner>
      <div className="main">
        <Form
          name="horizontal_login"
          layout="inline"
          onFinish={onFinish}
          style={{
            height: '100%',
            alignItems: 'center',
          }}
        >
          <Form.Item name="name" label="姓名">
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item name="email" label="邮箱">
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item shouldUpdate>
            {() => (
              <Button type="primary" htmlType="submit">
                查询
              </Button>
            )}
          </Form.Item>
          <Form.Item shouldUpdate>
            {() => (
              <Button type="primary" htmlType="reset" onClick={onReset}>
                重置
              </Button>
            )}
          </Form.Item>
          <Form.Item shouldUpdate>
            {() => (
              <Button type="primary" onClick={showModal}>
                新建
              </Button>
            )}
          </Form.Item>
        </Form>

        <Table
          style={{ marginTop: '10px' }}
          columns={columns}
          loading={loading}
          pagination={{ pageSize: 5 }}
          dataSource={dataSource}
          rowKey={(item) => item.email}
        />
      </div>
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
    </div>
  );
});

export default View;
