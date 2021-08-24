import { rest } from 'msw';

const apiURL = process.env.REACT_APP_API_URL;

const roleTable = [
  {
    id: 1,
    role_name: '好人',
    resource_number: 'good',
    resource_name: '智慧城市',
    role_description: '好人长生不老',
    role_status: true,
  },
  {
    id: 2,
    role_name: '坏人',
    resource_number: 'bad',
    resource_name: '智慧星球',
    role_description: '坏人很猥琐',
    role_status: true,
  },
  {
    id: 3,
    role_name: '小偷',
    resource_number: 'good',
    resource_name: '智慧平民窟',
    role_description: '偷出一片天地',
    role_status: false,
  },
  {
    id: 4,
    role_name: '好人',
    resource_number: 'good',
    resource_name: '智慧城市',
    role_description: '好人长生不老',
    role_status: true,
  },
  {
    id: 5,
    role_name: '好人',
    resource_number: 'good',
    resource_name: '智慧城市',
    role_description: '好人长生不老',
    role_status: true,
  },
  {
    id: 6,
    role_name: '好人',
    resource_number: 'good',
    resource_name: '智慧城市',
    role_description: '好人长生不老',
    role_status: true,
  },
  {
    id: 7,
    role_name: '坏人',
    resource_number: 'bad',
    resource_name: '智慧星球',
    role_description: '坏人很猥琐',
    role_status: true,
  },
  {
    id: 8,
    role_name: '小偷',
    resource_number: 'good',
    resource_name: '智慧平民窟',
    role_description: '偷出一片天地',
    role_status: false,
  },
  {
    id: 9,
    role_name: '好人',
    resource_number: 'good',
    resource_name: '智慧城市',
    role_description: '好人长生不老',
    role_status: true,
  },
  {
    id: 10,
    role_name: '好人',
    resource_number: 'good',
    resource_name: '智慧城市',
    role_description: '好人长生不老',
    role_status: true,
  },
];

const handlers = [
  rest.get(`${apiURL}/getRoles`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(2000),
      ctx.json({
        code: 0,
        mesg: 'ok',
        data: roleTable,
      }),
    );
  }),
  rest.post<{ id: number }>(`${apiURL}/getRole`, (req, res, ctx) => {
    const { id } = req.body;
    return res(
      ctx.status(200),
      ctx.delay(2000),
      ctx.json({
        code: 0,
        mesg: 'ok',
        data: roleTable.find((role) => role.id === id),
      }),
    );
  }),
];

export default handlers;
