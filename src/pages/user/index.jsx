/*
 * @Date: 2023-05-18 10:21:47
 * @LastEditors: jinyuan
 * @LastEditTime: 2023-05-25 13:27:17
 * @FilePath: \umi_dva\src\pages\user\index.jsx
 */
import {  Avatar, Button,Form,  Input,  Switch,  Table,  message,} from 'antd';
import { memo, useEffect, useState,useRef } from 'react';
import { useDispatch, useSelector } from 'umi';
import Banner from '../../components/banner';
import { Tabledatalist } from './helper';
import UserEditModal from './user_edit_modal';
import UserModal from './user_modal';
import './index.less';
const View = memo(() => {
  const 
    [, forceUpdate] = useState({}), 
    // userEditRef=useRef()
    [dataSource, setdataSource] = useState([]),
    [isModalOpen, setIsModalOpen] = useState(false),
    [EditModalOpen,setEditModalOpen]=useState(false),
    inputinfo=useRef(null),
    showinfo=useRef(),
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
        render: (item) => <Avatar src={item}/>,
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
          />
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
        render:(item,record)=><a onClick={()=>
          showUpdateModal(record)}>编辑</a>
      },
    ];
  // 开关方法
  const onChangeSwitch = (item, record) => {
  //  console.log(item, record.id);
    if (record.id === 2) {
      message.warning('没有权限操作');
    } else {
      dispatch({ type: 'user_list/LOCK_LIST', pyload: record.id });
      message.success(messagelock);
    }
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
    // console.log('Finish:', values);
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
  //新建模态框显示状态
  const showModal = () => {
    setIsModalOpen(true);
  };
//UserEditModal子组件传过来的方法用于回显表单数据
  const showUpdateModal=(record)=>{
   showinfo.current.showEditModal(record)
  
  }
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
      {/* 新建弹窗 */}
      <UserModal  
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      />
      {/* 编辑弹窗 */}
     <UserEditModal 
     showinfo={showinfo}
     inputinfo={ inputinfo}
     EditModalOpen={EditModalOpen}
     setEditModalOpen={setEditModalOpen}
     />
    </div>
  );
});

export default View;
