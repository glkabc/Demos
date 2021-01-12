import {rest} from 'msw';
import {res} from '../utils';

const apiURL = process.env.VUE_APP_BASE_API;

const easyId = () =>
  Math.random()
    .toString(36)
    .slice(2);
export const handlers = [
  rest.post(`${apiURL}/createMainTaskCard`, (_, _1, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        code: 0,
        mesg: 'OK',
        data: {id: easyId()},
      })
    );
  }),
  rest.post(`${apiURL}/editMainTaskCard`, (_, _1, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        code: 0,
        mesg: 'success',
        data: '编辑成功！',
      })
    );
  }),
  rest.post(`${apiURL}/createSubTaskCard`, (_, _1, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        code: 0, // 0 请求成功 1 请求失败
        mesg: 'OK',
        data: {id: easyId()},
      })
    );
  }),
  rest.post(`${apiURL}/editSubTaskCard`, (_, _1, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        code: 0,
        mesg: 'success',
        data: '编辑成功！',
      })
    );
  }),
  // 创建激活卡
  rest.post(`${apiURL}/createIntroductionCard`, (_, _1, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        code: 0,
        mesg: 'OK',
        data: {id: easyId()},
      })
    );
  }),
  rest.post(`${apiURL}/editIntroductionCard`, (_, _1, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        code: 0,
        mesg: 'OK',
        data: null,
      })
    );
  }),
  rest.post(`${apiURL}/createSubTask`, (req, _1, ctx) => {
    const {classId} = req.body;
    return res(
      ctx.status(200),
      ctx.json({
        code: 0,
        mesg: 'success',
        data: {
          classId,
          capsule: {
            createUserId: '1232312312321',
            createUserName: '马保国',
            createTime: null,
            modifyUserId: '1232312312321',
            modifyUserName: '马保国',
            modifyTime: null,
            isDelete: 0,
            isValid: 1,
            comments: null,
            id: easyId(),
            classId: 11,
            orderNum: 4,
            groups: [
              {
                modifyUserName: '马保国',
                createUserId: '1232312312321',
                isDelete: 0,
                isValid: 1,
                modifyUserId: '1232312312321',
                orderNum: 1,
                createUserName: '马保国',
                capsuleId: 18,
                id: easyId(),
              },
            ],
          },
        },
      })
    );
  }),

  rest.post(`${apiURL}/deleteSubTask`, (req, _1, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        code: 0,
        mesg: 'success',
        data: null,
      })
    );
  }),
  rest.post(`${apiURL}/reorderingCapsule`, (req, _1, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        code: 1,
        mesg: 'success',
        data: null,
      })
    );
  }),
  rest.post(`${apiURL}/saveClassName`, (req, _1, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        code: Math.random() > 0.5 ? 1 : 0,
        mesg: 'success',
        data: null,
      })
    );
  }),
  // 获取教学方法字典数据
  rest.get(`${apiURL}/fetchTeachingMethod`, (req, _1, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        code: 0,
        mesg: 'success',
        data: [
          {label: '形式A', value: '1'},
          {label: '形式B', value: '2'},
          {label: '形式C', value: '3'},
          {label: '形式D', value: '4'},
          {label: '形式E', value: '5'},
        ],
      })
    );
  }),
  // 获取激活方法字典数据
  rest.get(`${apiURL}/fetchIntroductionMethod`, (req, _1, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        code: 0,
        mesg: 'success',
        data: [
          {label: '激活方法A', value: '1'},
          {label: '激活方法B', value: '2'},
          {label: '激活方法C', value: '3'},
          {label: '激活方法D', value: '4'},
          {label: '激活方法E', value: '5'},
        ],
      })
    );
  }),
  // 获取示证方法字典数据
  rest.get(`${apiURL}/fetchDescriptionMethod`, (req, _, ctx) => {
    console.log('matched mock');
    return res(
      ctx.status(200),
      ctx.json({
        code: 0,
        mesg: 'success',
        data: [
          {label: '示证方法A', value: '1'},
          {label: '示证方法B', value: '2'},
          {label: '示证方法C', value: '3'},
          {label: '示证方法D', value: '4'},
          {label: '示证方法E', value: '5'},
        ],
      })
    );
  }),
  // 获取应用方法字典数据
  rest.get(`${apiURL}/fetchApplicationMethod`, (req, _, ctx) => {
    console.log('matched mock');
    return res(
      ctx.status(200),
      ctx.json({
        code: 0,
        mesg: 'success',
        data: [
          {label: '应用方法A', value: '1'},
          {label: '应用方法B', value: '2'},
          {label: '应用方法C', value: '3'},
          {label: '应用方法D', value: '4'},
          {label: '应用方法E', value: '5'},
        ],
      })
    );
  }),
  // 获取活动耗时字典数据
  rest.get(`${apiURL}/fetchTimeCost`, (req, _1, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        code: 0,
        mesg: 'success',
        data: [
          {key: '1', label: '1 - 3 min', value: '1', mid: 1.5, type: 1},
          {key: '2', label: '3 - 5 min', value: '2', mid: 4, type: 1},
          {key: '3', label: '5 - 8 min', value: '3', mid: 6.5, type: 1},
          {key: '4', label: '8 - 12 min', value: '4', mid: 10, type: 1},
          {key: '5', label: '12 - 15 min', value: '5', mid: 13.5, type: 1},

          {key: '6', label: '1 - 3 min', value: '6', mid: 1.5, type: 2},
          {key: '7', label: '3 - 5 min', value: '7', mid: 4, type: 2},
          {key: '8', label: '5 - 8 min', value: '8', mid: 6.5, type: 2},
          {key: '9', label: '8 - 12 min', value: '9', mid: 10, type: 2},
          {key: '10', label: '12 - 15 min', value: '10', mid: 13.5, type: 2},

          {key: '11', label: '1 - 3 min', value: '11', mid: 1.5, type: 3},
          {key: '12', label: '3 - 5 min', value: '12', mid: 4, type: 3},
          {key: '13', label: '5 - 8 min', value: '13', mid: 6.5, type: 3},
          {key: '14', label: '8 - 12 min', value: '14', mid: 10, type: 3},
          {key: '15', label: '12 - 15 min', value: '15', mid: 13.5, type: 3},
        ],
      })
    );
  }),
  // 删除主任务卡
  rest.post(`${apiURL}/deleteMainTaskCard`, (req, _1, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        code: 0,
        mesg: 'success',
        data: null,
      })
    );
  }),
  // 删除子任务卡
  rest.post(`${apiURL}/deleteSubTaskCard`, (req, _1, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        code: 0,
        mesg: 'success',
        data: null,
      })
    );
  }),
  // 创建胶囊
  rest.post(`${apiURL}/createCapsule`, (req, _1, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        code: 0,
        mesg: 'success',
        data: {
          groups: [
            {
              modifyUserName: '马保国',
              createUserId: '1232312312321',
              isDelete: 0,
              isValid: 1,
              modifyUserId: '1232312312321',
              orderNum: 3,
              createUserName: '马保国',
              capsuleId: 19,
              id: easyId(),
            },
          ],
        },
      })
    );
  }),
  // 删除胶囊
  rest.post(`${apiURL}/deleteCapsule`, (req, _1, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        code: 0,
        mesg: 'success',
        data: null,
      })
    );
  }),
  // 移动胶囊
  rest.post(`${apiURL}/reorderingGroup`, (req, _1, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        code: 1,
        mesg: 'success',
        data: null,
      })
    );
  }),
  // 文件上传
  rest.post(`${apiURL}/uploadFileCanvas`, (req, res, ctx) => {
    console.log({req});
    return res(
      ctx.status(200),
      ctx.json({
        code: Math.random() > 0.5 ? 0 : 1,
        mesg: 'success',
        data: {
          comments: '文件上传',
          createTime: '2020-11-27 18:50:01',
          createUserId: '202001343',
          createUserName: '程阔',
          fileName: '标签 (1).png',
          id: easyId(),
          isDelete: 0,
          isValid: 1,
          modifyTime: '2020-11-27 18:50:01',
          modifyUserId: '202001343',
          modifyUserName: '程阔',
          url: `http://10.7.100.16:8999\\2020-1187e487e1-24ad-4a9c-9cf1-37c1eb58388e.png`,
        },
      }),
      ctx.delay(2000)
    );
  }),
  // 创建示证卡
  rest.post(`${apiURL}/createDescriptionCard`, (req, _1, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        code: Math.random() > 0.5 ? 0 : 1,
        mesg: 'success',
        data: {
          id: easyId(),
        },
      })
    );
  }),
  // 更新示证卡
  rest.post(`${apiURL}/updateDescriptionCard`, (req, _1, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        code: Math.random() > 0.5 ? 0 : 1,
        mesg: 'success',
        data: null,
      })
    );
  }),
  // 创建应用卡
  rest.post(`${apiURL}/createApplicationCard`, (req, _1, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        code: Math.random() > 0.5 ? 0 : 1,
        mesg: 'success',
        data: {
          id: easyId(),
        },
      })
    );
  }),
  // 更新应用卡
  rest.post(`${apiURL}/updateApplicationCard`, (req, _1, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        code: Math.random() > 0.5 ? 0 : 1,
        mesg: 'success',
        data: null,
      })
    );
  }),
  // 模糊搜索关联胶囊
  rest.post(`${apiURL}/capsuleFuzzySearch`, (req, _1, ctx) => {
    const {string} = req.body;
    const fakeData = [
      {
        id: easyId(),
        label: 'JavaScript',
        value: easyId(),
        person: '张三',
        used: 3,
        createdAt: '2020-11-20',
      },
      {
        id: easyId(),
        label: 'HTML',
        value: easyId(),
        person: '张三',
        used: 3,
        createdAt: '2020-11-20',
      },
      {
        id: easyId(),
        label: 'CSS',
        value: easyId(),
        person: '张三',
        used: 3,
        createdAt: '2020-11-20',
      },
      {
        id: easyId(),
        label: 'React',
        value: easyId(),
        person: '张三',
        used: 3,
        createdAt: '2020-11-20',
      },
      {
        id: easyId(),
        label: 'React-router-dom',
        value: easyId(),
        person: '张三',
        used: 3,
        createdAt: '2020-11-20',
      },
      {
        id: easyId(),
        label: 'React-query',
        value: easyId(),
        person: '张三',
        used: 3,
        createdAt: '2020-11-20',
      },
      {
        id: easyId(),
        label: 'React-recoil',
        value: easyId(),
        person: '张三',
        used: 3,
        createdAt: '2020-11-20',
      },
      {
        id: easyId(),
        label: 'Xstate',
        value: easyId(),
        person: '张三',
        used: 3,
        createAt: '2020-11-20',
      },
      {
        id: easyId(),
        label: 'emotion',
        value: easyId(),
        person: '张三',
        used: 3,
        createdAt: '2020-11-20',
      },
      {
        id: easyId(),
        label: 'react-form-hooks',
        value: easyId(),
        person: '张三',
        used: 3,
        createdAt: '2020-11-20',
      },
      {
        id: easyId(),
        label: 'Object',
        value: easyId(),
        person: '张三',
        used: 3,
        createdAt: '2020-11-20',
      },
      {
        id: easyId(),
        label: 'async function',
        value: easyId(),
        person: '张三',
        used: 3,
        createdAt: '2020-11-20',
      },
      {
        id: easyId(),
        label: 'Array',
        value: easyId(),
        person: '张三',
        used: 3,
        createdAt: '2020-11-20',
      },
    ];
    let result;
    if (string) {
      result = fakeData.filter((item) => item.label.includes(string)).slice(0, 5);
    } else {
      result = fakeData.slice(0, 5);
    }
    return res(
      ctx.status(200),
      ctx.json({
        code: 0,
        mesg: 'success',
        data: result,
      })
    );
  }),
  // 获取关联胶囊示证卡数据
  rest.post(`${apiURL}/getCapsuleDescriptionCard`, (req, _1, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        code: 0,
        mesg: 'success',
        data: null,
      })
    );
  }),
  // 重置课程
  rest.post(`${apiURL}/resetClass`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        code: 0,
        mesg: 'success',
        data: {
          className: '这是一个默认的课堂名称',
        },
      }),
      ctx.delay(3000)
    );
  }),
  // 发布课程
  rest.post(`${apiURL}/publish`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        code: 0,
        mesg: 'success',
        data: null,
      }),
      ctx.delay(2000)
    );
  }),
  // 删除讲解卡
  rest.post(`${apiURL}/canvasCard/deleteDescriptionCard`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        code: 0,
        mesg: 'success',
        data: null,
      }),
      ctx.delay(2000)
    );
  }),
];
