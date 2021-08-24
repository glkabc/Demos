import { rest } from 'msw';

const treeData = [
  {
    id: 1,
    label: '北京大学',
    children: [
      {
        id: 9,
        label: '蔡元培',
        children: [],
      },
      {
        id: 10,
        label: '陈独秀',
        children: [],
      },
    ],
  },
  {
    id: 2,
    label: '天津大学',
    children: [
      {
        id: 3,
        label: '李老师',
        children: [
          {
            id: 6,
            label: '小明',
            children: [],
          },
          {
            id: 7,
            label: '大名',
            children: [],
          },
          {
            id: 8,
            label: '天明',
            children: [],
          },
        ],
      },
      {
        id: 4,
        label: '王老师',
        children: [],
      },
      {
        id: 5,
        label: '郭老师',
        children: [],
      },
    ],
  },
];

const apiURL = process.env.REACT_APP_API_URL;
const handlers = [
  rest.post(`${apiURL}/getOrgManagement`, (req, res, ctx) => {
    // const {superUserId} = req.body;
    return res(
      ctx.status(200),
      ctx.delay(2000),
      ctx.json({
        code: 0,
        mesg: 'ok',
        data: {
          superUserId: 1,
          list: Array.from({ length: 20 }, (v, i) => {
            return {
              id: i,
              org_name: '你好' + i,
              org_role_description: '你好' + Math.random() * 1000,
            };
          }),
        },
      }),
    );
  }),
  rest.post(`${apiURL}/getTreeData`, (req, res, ctx) => {
    // const {superUserId} = req.body;
    return res(
      ctx.status(200),
      ctx.delay(2000),
      ctx.json({
        code: 0,
        mesg: 'ok',
        data: treeData,
      }),
    );
  }),
];

export default handlers;
