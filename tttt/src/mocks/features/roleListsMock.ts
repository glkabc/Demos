import { rest } from 'msw';

const apiURL = process.env.REACT_APP_API_URL;

const roleListTable = [
  {
    id: 1,
    role_name: '张三',
    role_code: 321,
    role_comments: '包含所有角色的权限, 不支持修改权限',
  },
  {
    id: 2,
    role_name: '李四',
    role_code: 111,
    role_comments: '包含所有角色的权限, 不支持修改权限',
  },
  {
    id: 3,
    role_name: 'xxx',
    role_code: 333,
    role_comments: 'xiohuiw@iflytek.com',
  },
  {
    id: 4,
    role_name: 'fff',
    role_code: 321,
    role_comments: '包含所有角色的权限, 不支持修改权限',
  },
  {
    id: 5,
    role_name: 'wwww',
    role_code: 444,
    role_comments: 'xiohuiw@iflytek.com',
  },
  {
    id: 6,
    role_name: 'ccccc',
    role_code: 123,
    role_comments: '包含所有角色的权限, 不支持修改权限',
  },
  {
    id: 7,
    role_name: 'dvvv',
    role_code: 999,
    role_comments: 'xiohuiw@iflytek.com',
  },
];

const handlers = [
  rest.get(`${apiURL}/getRoleLists`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(2000),
      ctx.json({
        code: 0,
        mesg: 'ok',
        data: roleListTable,
      }),
    );
  }),
  rest.post<{ id: number }>(`${apiURL}/getRoleList`, (req, res, ctx) => {
    const { id } = req.body;
    return res(
      ctx.status(200),
      ctx.delay(2000),
      ctx.json({
        code: 0,
        mesg: 'ok',
        data: roleListTable.find((role) => role.id === id),
      }),
    );
  }),
];

export default handlers;
