/*
 * @Date: 2023-05-18 10:21:47
 * @LastEditors: jinyuan
 * @LastEditTime: 2023-05-19 18:24:31
 * @FilePath: \umi_dva\src\pages\user\index.jsx
 */
import { Avatar, Button, Form, Input, Switch, Table, message } from 'antd';
import { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'umi';
import Banner from '../../components/banner';
import { Tabledatalist } from './helper';
import './index.less';
const View = memo(() => {
  const [form] = Form.useForm(),
    [, forceUpdate] = useState({}),
    [dataSource, setdataSource] = useState([]),
    [isloading,setisloading]=useState(false),
    dispatch = useDispatch(),
    { tablelist, loading, messageinfo } = useSelector(
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
        render: (item) => (
          <Switch onChange={onChange} defaultChecked checked={item}></Switch>
        ),
      },
      {
        title: '创建时间',
        dataIndex: 'created_at',
        key: 'created_at',
      },
      {
        title: '编辑',
        // dataIndex:"id",
        // render:(item)=><a>{item}</a>
      },
    ];
  // 开关方法
  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };
// console.log(data)
  useEffect(() => {
    forceUpdate({});
  }, []);

  useEffect(() => {
    dispatch({ type: 'user_list/GET_LIST', pyload: false });
  }, []);
  useEffect(() => {
    setdataSource(Tabledatalist(data));
  }, [loading]);
  //搜索方法
  const onFinish = (values) => {
    dispatch({ type: 'user_list/SEARCH_LIST', pyload: {...values}});
    console.log('Finish:', values);
    const { name, email } = values;
    if (name === undefined && email === undefined) {
      message.error(messageinfo);
    }
    if (name === '' && email === '') {
      message.error(messageinfo);
    }
  };
  //重置
const  onReset=()=>{

  dispatch({ type: 'user_list/GET_LIST', pyload:null});
}
console.log("LOADING",loading)
  return (
    <div>
      <Banner name={'用户管理'}></Banner>
      <div className="main">
        <Form
          form={form}
          name="horizontal_login"
          layout="inline"
          onFinish={onFinish}
          style={{
            height: '100%',
            alignItems: 'center',
          }}
        >
          <Form.Item
            name="name"
            label="姓名"
            // rules={[
            //   {
            //     required: true,
            //     message: 'Please input your username!',
            //   },
            // ]}
          >
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
              <Button type="primary" htmlType="submit">
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
        ></Table>
      </div>
    </div>
  );
});

export default View;
