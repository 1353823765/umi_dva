import mockjs from 'mockjs';
const users = [
  { id: 0, name: 'Umi', nickName: 'U', gender: 'MALE' },
  { id: 1, name: 'Fish', nickName: 'B', gender: 'FEMALE' },
];

export default {
  'GET /api/v1/queryUserList': (req: any, res: any) => {
    res.json({
      success: true,
      data: { list: users },
      errorCode: 0,
    });
  },
  'PUT /api/v1/user/': (req: any, res: any) => {
    res.json({
      success: true,
      errorCode: 0,
    });
  },
  'GET /api/classes/stu': mockjs.mock({
    code: 200,
    msg: '学员信息',
    'data|100': [
      {
        name: '@cname',
        age: '@integer(20,30)',
        stu: '北京大学',
        time: '@date',
        city: '@city',
      },
    ],
  }),
};
