import { rest } from 'msw';

const apiURL = process.env.REACT_APP_API_URL;

const userTable = [
  {
    id: 123,
    user_name: '张三',
    user_id: 123,
    user_mail: 'xxxxx@iflytek.com',
    user_phone: '1223444555',
    user_structuer: '清华',
    user_type: '角色1',
    user_status: 1,
    user_structureId: 10,
    user_structures: {
      id: 10,
      lable: '清华',
    },
    user_types: {
      id: 1,
      lable: '角色1',
    },
    user_selectStatus: {
      status: 1,
      lable: '启用',
    },
  },
  {
    id: 345,
    user_name: '张三',
    user_id: 345,
    user_mail: 'xxxxx@iflytek.com',
    user_phone: '1223444555',
    user_structuer: 'xxxx',
    user_type: '角色2',
    user_status: 1,
    user_structureId: 20,
    user_structures: {
      id: 20,
      lable: 'xxxx',
    },
    user_types: {
      id: 2,
      lable: '角色2',
    },
    user_selectStatus: {
      status: 1,
      lable: '启用',
    },
  },
  {
    id: 456,
    user_name: '张三',
    user_id: 456,
    user_mail: 'xxxxx@iflytek.com',
    user_phone: '1223444555',
    user_structuer: 'gggg',
    user_type: '角色3',
    user_status: 1,
    user_structureId: 30,
    user_structures: {
      id: 30,
      lable: 'gggg',
    },
    user_types: {
      id: 3,
      lable: '角色3',
    },
    user_selectStatus: {
      status: 1,
      lable: '启用',
    },
  },
  {
    id: 678,
    user_name: '张三',
    user_id: 678,
    user_mail: 'xxxxx@iflytek.com',
    user_phone: '1223444555',
    user_structuer: '清华',
    user_type: '角色4',
    user_status: 1,
    user_structureId: 10,
    user_structures: {
      id: 10,
      lable: '清华',
    },
    user_types: {
      id: 4,
      lable: '角色4',
    },
    user_selectStatus: {
      status: 1,
      lable: '启用',
    },
  },
  {
    id: 890,
    user_name: '张三',
    user_id: 890,
    user_mail: 'xxxxx@iflytek.com',
    user_phone: '1223444555',
    user_structuer: '清华',
    user_type: '角色5',
    user_status: 1,
    user_structureId: 10,
    user_structures: {
      id: 10,
      lable: '清华',
    },
    user_types: {
      id: 5,
      lable: '角色5',
    },
    user_selectStatus: {
      status: 1,
      lable: '启用',
    },
  },
  {
    id: 134,
    user_name: '张三',
    user_id: 134,
    user_mail: 'xxxxx@iflytek.com',
    user_phone: '1223444555',
    user_structuer: '清华',
    user_type: '角色6',
    user_status: undefined,
    user_structureId: 10,
    user_structures: {
      id: 10,
      lable: '清华',
    },
    user_types: {
      id: 6,
      lable: '角色6',
    },
    user_selectStatus: {
      status: undefined,
      lable: '禁用',
    },
  },
];
const handlers = [
  rest.get(`${apiURL}/getUsers`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(2000),
      ctx.json({
        code: 0,
        mesg: 'ok',
        data: userTable,
      }),
    );
  }),
  rest.post<{ id: number }>(`${apiURL}/getUser`, (req, res, ctx) => {
    const { id } = req.body;
    return res(
      ctx.status(200),
      ctx.delay(2000),
      ctx.json({
        code: 0,
        mesg: 'ok',
        data: userTable.find((user) => user.id === id),
      }),
    );
  }),
];

export default handlers;
