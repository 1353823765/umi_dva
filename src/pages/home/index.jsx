/*
 * @Date: 2023-04-29 18:09:52
 * @LastEditors: jinyuan
 * @LastEditTime: 2023-05-16 17:02:09
 * @FilePath: \umi_dva\src\pages\home\index.jsx
 */

import { Chart } from '@antv/g2';
import {
  Avatar,
  Card,
  Col,
  Dropdown,
  Modal,
  Row,
  Space,
  Spin,
  Table,
} from 'antd';
import { memo, useEffect, useRef, useState } from 'react';
import { history, useDispatch, useSelector } from 'umi';
import { items } from './helper';
import './index.less';
const View = memo((props) => {
  const onClick = ({ key }) => {
    //展示用信息
    if (key === '1') {
      setIsModalOpen(true);
    }
    //一键换肤
    if (key === '2') {
      console.log('一键换肤');
    }
    //退出登入
    if (key === '3') {
      localStorage.removeItem('access_token');
      history.push('/login');
    }
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const dispatch = useDispatch(),
    { table_list, home_data, loading } = useSelector(
      (state) => state.home_list,
    ),
    [isModalOpen, setIsModalOpen] = useState(false),
    chartRef = useRef(''),
    chartRefgood = useRef(''),
    name = table_list?.name,
    img = table_list?.avatar_url,
    createdTime = table_list?.created_at,
    updatedTime = table_list?.updated_at,
    email = table_list?.email,
    id = table_list?.openid,
    total = table_list?.total,
    usercount = home_data?.users_count,
    goodscount = home_data?.goods_count,
    ordercount = home_data?.order_count,
    usersinfo = home_data?.users_info,
    goodsinfo = home_data?.goods_info,
    token = localStorage.getItem('access_token'),
    //用户信息usersinfo条形图
    userinfobar = [
      {
        letter: '今日访客',
        frequency: usersinfo?.today_nums,
      },
      {
        letter: '昨日访客',
        frequency: usersinfo?.yesterday_nums,
      },
      {
        letter: '注册用户',
        frequency: usersinfo?.reg_nums,
      },
    ], //商品信息goodsinfo条形图
    goodsinfobar = [
      {
        letter: '上架商品',
        frequency: goodsinfo?.on_nums,
      },
      {
        letter: '下架商品',
        frequency: goodsinfo?.un_nums,
      },
      {
        letter: '缺货商品',
        frequency: goodsinfo?.stock_null,
      },
      {
        letter: '推荐商品数量',
        frequency: goodsinfo?.recommend_nums,
      },
    ],
    //table表格配置项
    dataSource = [
      {
        key: name,
        name: '姓名',
      },

      {
        key: createdTime,
        name: '创建时间',
      },
      {
        key: id,
        name: 'ID',
      },
      {
        key: total,
        name: 'total',
      },
      {
        key: updatedTime,
        name: '修改日期',
      },
    ],
    columns = [
      {
        title: '用户名',
        dataIndex: 'name',
      },
      {
        title: email,
        dataIndex: 'key',
      },
    ];

  useEffect(() => {
    if (token) {
      dispatch({ type: 'home_list/GET_LIST', pyload: null });
      dispatch({ type: 'home_list/GET_HOME', pyload: false });
    }
  }, [token]);

  useEffect(() => {
    //访问量条形图
    const chart = new Chart({
      width: 300, // 图表高度
      height: 300,
      container: document.getElementById('chart'),
      encode: { x: 'letter', y: 'frequency' },
      theme: 'classic',
      autoFit: true,
      axis: { y: { labelFormatter: '1000' } },
    });
    chart
      .interval()
      .data(userinfobar)
      .encode('x', 'letter')
      .encode('y', 'frequency')
      .axis('y', { labelFormatter: '1000' });
    chart.render();
  }, [userinfobar]);
  useEffect(() => {
    //访问量条形图
    const chart = new Chart({
      width: 300, // 图表高度
      height: 300,
      container: document.getElementById('chartgood'),
      encode: { x: 'letter', y: 'frequency' },
      theme: 'classic',
      autoFit: true,
      axis: { y: { labelFormatter: '50' } },
    });
    chart
      .interval()
      .data(goodsinfobar)
      .encode('x', 'letter')
      .encode('y', 'frequency')
      .axis('y', { labelFormatter: '50' });
    chart.render();
  }, [goodsinfobar]);

  return (
    <div>
      <Dropdown
        menu={{
          items,
          onClick,
        }}
        style={{ height: '50px' }}
      >
        <Space>
          <Avatar.Group size="small">
            <Avatar src={img} style={{ height: '32px', width: '32px' }} />
            <span
              style={{
                lineHeight: '32px',
                fontSize: '16px',
                marginLeft: '5px',
              }}
            >
              {name}
            </span>
          </Avatar.Group>
        </Space>
      </Dropdown>
      <Modal
        title="用户信息"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Table columns={columns} dataSource={dataSource} bordered={true} />
      </Modal>

      <Spin spinning={loading} size="large">
        <div>
          <Row gutter={16} style={{ marginTop: '30px' }}>
            <Col span={8}>
              <Card
                title="用户数量"
                bordered={true}
                style={{ background: '#7086c8' }}
              >
                <h2>{usercount}</h2>
              </Card>
            </Col>
            <Col span={8}>
              <Card
                title="产品数量"
                bordered={true}
                style={{ background: '#7086c8' }}
              >
                <h2> {goodscount}</h2>
              </Card>
            </Col>
            <Col span={8}>
              <Card
                title="订单数据"
                bordered={true}
                style={{ background: '#7086c8' }}
              >
                <h2> {ordercount}</h2>
              </Card>
            </Col>
            <Col span={8}>
              <Card style={{ marginTop: '30px' }} title="访问量">
                <div id="chart" style={{ height: '400px' }} ref={chartRef} />
              </Card>
            </Col>
            <Col span={8}>
              <Card style={{ marginTop: '30px' }} title="商品数量">
                <div
                  id="chartgood"
                  style={{ height: '400px' }}
                  ref={chartRefgood}
                />
              </Card>
            </Col>
          </Row>
        </div>
      </Spin>
    </div>
  );
});

export default View;
