/*
 * @Date: 2023-04-29 18:09:52
 * @LastEditors: jinyuan
 * @LastEditTime: 2023-05-14 14:29:48
 * @FilePath: \umi_dva\src\pages\tasklist\stumgt\stumgt_list\index.jsx
 */

import { Button } from 'antd';

import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'umi';



const View = memo(() => {
  const dispatch = useDispatch()
 
 

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
