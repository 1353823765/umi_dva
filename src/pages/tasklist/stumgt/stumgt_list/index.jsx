/*
 * @Date: 2023-04-29 18:09:52
 * @LastEditors: jinyuan
 * @LastEditTime: 2023-05-01 16:50:40
 * @FilePath: \umi_dva\src\pages\tasklist\stumgt\stumgt_list\index.jsx
 */

import { Button } from 'antd';

import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'umi';
const View = memo(() => {
  const dispatch = useDispatch(),
    { table_list } = useSelector((select) => select.stumgt_list);
  console.log(table_list);
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      {
        <Button
          type="primary"
          size="large"
          style={{ width: '100px' }}
          onClick={getData}
        >
          按钮
        </Button>
      }
    </div>
  );

  function getData() {
    dispatch({
      type: 'stumgt_list/GET_LIST',
      pyload: '携带的pyload',
    });
  }
});

export default View;
