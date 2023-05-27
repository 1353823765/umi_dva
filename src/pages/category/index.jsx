/*
 * @Date: 2023-05-23 14:23:01
 * @LastEditors: jinyuan
 * @LastEditTime: 2023-05-27 16:32:39
 * @FilePath: \umi_dva\src\pages\category\index.jsx
 */
import { Button, Form, Image, Input, Switch, Table } from 'antd';
import { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'umi';
import Banner from '../../components/banner';
import { Tabledatalist } from './helper';
import './index.less';
const View = memo(() => {
  const dispatch = useDispatch(),
    [dataSource, setdataSource] = useState([]),
    { table_list, loading } = useSelector((state) => state.category_list),
    { data } = table_list,
    columns = [
      {
        title: '商品图',
        dataIndex: ' cover_url',
        key: 'cover_url',
        render: (item, record) => <Image width={50} src={record.cover_url} />,
      },
      {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: '价格',
        dataIndex: 'price',
        key: 'price',
      },
      {
        title: '库存',
        dataIndex: 'stock',
        key: 'stock',
      },
      {
        title: '销量',
        dataIndex: 'sales',
        key: 'sales',
      },
      {
        title: '是否上架',
        dataIndex: 'is_on',
        key: 'is_on ',
        render: (item, record) => (
          //  console.log(item)
          <Switch
            onChange={() => console.log(record)}
            // defaultChecked={record.is_locked === 0}
          />
        ),
      },
      {
        title: '是否推荐',
        dataIndex: 'is_recommend',
        key: 'is_on ',
        render: (item, record) => (
          //  console.log(item)
          <Switch
            onChange={() => console.log(record)}
            // defaultChecked={record.is_locked === 0}
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
        dataIndex: 'id',
        render: (item, record) => (
          <a onClick={() => console.log(record, item)}>编辑</a>
        ),
      },
    ];

  const onFinish = () => {
    console.log('onFinish');
  };
  const onReset = () => {
    console.log('onReset');
  };
  const showModal = () => {
    console.log('showModal');
  };
  //初始化数据
  useEffect(() => {
    dispatch({ type: 'category_list/GET_LIST', pyload: false });
  }, []);
  //更新数据
  useEffect(() => {
    setdataSource(Tabledatalist(data));
    console.log(dataSource);
  }, [data]);

  return (
    <div>
      <Banner title="分类管理"></Banner>
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
          <Form.Item name="name" label="标题">
            <Input placeholder="请输入" />
          </Form.Item>
          {/*  <Form.Item name="email" label="邮箱">
          <Input placeholder="请输入" />
        </Form.Item> */}
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
          loading={loading}
          columns={columns}
          pagination={{ pageSize: 5, position: ['topRight'] }}
          dataSource={dataSource}
          rowKey={(item) => item.id}
        />
      </div>
    </div>
  );
});

export default View;
