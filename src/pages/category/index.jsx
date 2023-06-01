/*
 * @Date: 2023-05-23 14:23:01
 * @LastEditors: jinyuan
 * @LastEditTime: 2023-06-01 19:05:49
 * @FilePath: \umi_dva\src\pages\category\index.jsx
 */
import {
  Button,
  Cascader,
  Form,
  Image,
  Input,
  Modal,
  Switch,
  Table,
  Upload,
  message,
} from 'antd';
import { memo, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'umi';
import Banner from '../../components/banner';
import { Tabledatalist,Gettree} from './helper';
import './index.less';
const View = memo(() => {
  const dispatch = useDispatch(),
    [dataSource, setdataSource] = useState([]),
    [form] = Form.useForm(),
    [fileList, setFileList] = useState([
      {
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
    ]),
    [isModalOpen, setIsModalOpen] = useState(false),
    [imgLoading, setimgLoading] = useState(false),
    [imageUrl, setImageUrl] = useState(),
    { table_list, loading, messageinfo, create_list } = useSelector(
      (state) => state.category_list,
    ),
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
            onChange={() => onChangeIsOn(record.id)}
            defaultChecked={record.is_on === 1}
          />
        ),
      },
      {
        title: '是否推荐',
        dataIndex: 'is_recommend',
        key: 'is_on ',
        render: (item, record) => (
          <Switch
            onChange={() => onChangeRecommend(record.id)}
            defaultChecked={record.is_recommend === 1}
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

  

  const onFinish = (values) => {
    console.log('onFinish', values);
    if (values?.title === undefined || values?.title === '') {
      message.error('请输入标题');
    } else {
      dispatch({ type: 'category_list/SEARCH_LIST', pyload: { ...values } });
    }
  };
  //重置功能
  const onReset = () => {
    dispatch({ type: 'category_list/RESET_LIST', pyload: null });
    console.log('onReset');
  };
  const showModal = () => {
    console.log(111);
    setIsModalOpen(true);
    dispatch({ type: 'category_list/GET_CREATELIST', pyload: null });
    console.log('showModal');
  };
  //是否上架
  const onChangeIsOn = (id) => {
    dispatch({ type: 'category_list/ISON_LIST', pyload: id });
    message.success(messageinfo);
  };
  //是否推荐
  const onChangeRecommend = (id) => {
    dispatch({ type: 'category_list/RECOMMEND_LIST', pyload: id });
    message.success(messageinfo);
  };
  //新建modal
  const handleOk = () => {
    console.log('handleOk');
    setIsModalOpen(false);
  };
  //关闭modal
  const handleCancel = () => {
    console.log('handleCancel');
    setIsModalOpen(false);
  };
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  //初始化table数据
  useEffect(() => {
    dispatch({ type: 'category_list/GET_LIST', pyload: false });
  }, []);
  //更新table数据
  useEffect(() => {
    setdataSource(Tabledatalist(data));
    // console.log(data);
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
          <Form.Item name="title" label="标题">
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
          loading={loading}
          columns={columns}
          pagination={{ pageSize: 5, position: ['topRight'] }}
          dataSource={dataSource}
          rowKey={(item) => item.id}
        />
        <Modal
          title="添加商品"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form form={form} name="basic" autoComplete="off">
            <Form.Item
              label="分类"
              name="name"
              rules={[
                {
                  required: true,
                  message: '输入用户',
                },
              ]}
            >
              <Cascader placeholder="请填写" options={Gettree(create_list)} />
            </Form.Item>
            <Form.Item
              label="商品"
              name="shopname"
              rules={[
                {
                  required: true,
                  message: '输入商品名',
                },
              ]}
            >
              <Input placeholder="请输入" />
            </Form.Item>
            <Form.Item
              name="intro"
              label="描述"
              rules={[
                {
                  required: true,
                  message: '请添加商品信息',
                },
              ]}
            >
              <Input.TextArea placeholder="请输入" showCount />
            </Form.Item>
            <Form.Item
              label="价格"
              name="shopprice"
              rules={[
                {
                  required: true,
                  message: '输入商品价格',
                },
              ]}
            >
              <Input placeholder="请输入" />
            </Form.Item>
            <Form.Item
              label="库存"
              name="shopstock"
              rules={[
                {
                  required: true,
                  message: '输入库存数量',
                },
              ]}
            >
              <Input placeholder="请输入" />
            </Form.Item>
            <Form.Item
              label="上传"
              name="updataimg"
              rules={[
                {
                  required: true,
                  message: '请添加上传图片',
                },
              ]}
            >
              <Upload fileList={fileList}></Upload>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
});

export default View;
