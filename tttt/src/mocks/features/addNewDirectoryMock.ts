import { rest } from 'msw';

const apiURL = process.env.REACT_APP_API_URL;

const DirectoryTree = [
  {
    id: 1,
    label: 'AI能力',
    children: [
      {
        id: 4,
        label: '云识别',
        children: [
          {
            id: 9,
            label: '人脸识别',
            children: [],
          },
          {
            id: 10,
            label: '活体识别',
            children: [],
          },
        ],
      },
      {
        id: 5,
        label: '工单管理',
        children: [
          {
            id: 8,
            label: '火兔',
            children: [],
          },
        ],
      },
      {
        id: 6,
        label: '应用管理',
        children: [
          {
            id: 7,
            label: '火兔',
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: '信息能力整合系统',
    children: [
      {
        id: 11,
        label: '撒大',
        children: [
          {
            id: 12,
            label: '达撒',
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: 3,
    label: '技术能力整合系统',
    children: [
      {
        id: 13,
        label: '撒大',
        children: [
          {
            id: 14,
            label: '达撒',
            children: [],
          },
        ],
      },
    ],
  },
];

const handlers = [
  rest.get(`${apiURL}/getDirectoryList`, (req, res, ctx) => {
    return res(
      ctx.delay(2000),
      ctx.status(200),
      ctx.json({
        code: 0,
        mesg: 'ok',
        data: Array.from({ length: 25 }, (_, i) => {
          return {
            id: i,
            name: '去去阿莎' + i,
            type: '阿松大' + i + '期',
            can_use: i / 2 === 0 ? true : false,
          };
        }),
      }),
    );
  }),
  rest.get(`${apiURL}/getDirectoryTree`, (req, res, ctx) => {
    return res(
      ctx.delay(2000),
      ctx.status(200),
      ctx.json({
        code: 0,
        mesg: 'ok',
        data: DirectoryTree,
      }),
    );
  }),
];

export default handlers;
