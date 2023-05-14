/*
 * @Date: 2023-04-29 18:09:52
 * @LastEditors: jinyuan
 * @LastEditTime: 2023-05-14 18:00:07
 * @FilePath: \umi_dva\src\pages\home\index.jsx
 */

import { Avatar, Dropdown, Modal, Space, Table } from 'antd';
import { memo, useEffect, useState } from 'react';
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
    { table_list } = useSelector((state) => state.home_list),
    [isModalOpen, setIsModalOpen] = useState(false),
    name = table_list?.name,
    img = table_list?.avatar_url,
    createdTime = table_list?.created_at,
    updatedTime = table_list?.updated_at,
    email = table_list?.email,
    id = table_list?.openid,
    total = table_list?.total,
    token = localStorage.getItem('access_token'),
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
    }
  }, [token]);

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
    </div>
  );
});
export default View;
