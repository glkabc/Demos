import {rest} from 'msw';
import {res} from '../utils';
const apiURL = process.env.VUE_APP_BASE_API;
export const handlers = [
  rest.get(`${apiURL}/user/checkVerificationCode`, (_, _1, ctx) => {
    console.log('msw handle login');
    return res(
      ctx.status(200),
      ctx.json({
        code: 0,
        data: null,
        mesg: 'success',
      })
    );
  }),
  // rest.get(`${apiURL}/user/login`, (_, _1, ctx) => {
  //   console.log('msw handle login');
  //   return res(
  //     ctx.status(200),
  //     ctx.json({
  //       code: 0,
  //       data: {
  //         expireTime: 36000000,
  //         user: {
  //           createUserId: '202001343',
  //           createUserName: 'admin',
  //           createTime: '2020-11-25 11:14:50',
  //           modifyUserId: '',
  //           modifyUserName: '',
  //           modifyTime: '2020-11-25 11:14:56',
  //           isDelete: 0,
  //           isValid: 1,
  //           comments: 'zzZ',
  //           sysUserId: 10008700103,
  //           userName: '孙凯',
  //           userNo: '13',
  //           mail: 'kaisun6@ibest.com',
  //           phone: '123456789',
  //           customId: 0,
  //           customOrgId: 0,
  //           dataAuthority: 0,
  //           roleId: null,
  //         },
  //         modules: [
  //           {
  //             createUserId: '10005700001',
  //             createUserName: 'admin',
  //             createTime: '2020-11-23 13:37:36',
  //             modifyUserId: '202001343',
  //             modifyUserName: '程阔',
  //             modifyTime: '2020-11-23 13:38:03',
  //             isDelete: 0,
  //             isValid: 1,
  //             comments: '',
  //             moduleId: 2,
  //             moduleType: 0,
  //             moduleUrl: 'courses',
  //             moduleName: '我的课程',
  //             parentId: 1,
  //             dataAuthority: 0,
  //             children: [],
  //             moduleCode: 'wdkc',
  //           },
  //           {
  //             createUserId: '10005700001',
  //             createUserName: 'admin',
  //             createTime: '2020-11-23 13:37:36',
  //             modifyUserId: '202001343',
  //             modifyUserName: '程阔',
  //             modifyTime: '2020-11-23 13:38:03',
  //             isDelete: 0,
  //             isValid: 1,
  //             comments: '',
  //             moduleId: 3,
  //             moduleType: 0,
  //             moduleUrl: 'quality',
  //             moduleName: '质控评分',
  //             parentId: 1,
  //             dataAuthority: 0,
  //             children: [],
  //             moduleCode: 'zkpf',
  //           },
  //         ],
  //         token:
  //           'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJtYWlsIjoia2Fpc3VuNkBpYmVzdC5jb20iLCJleHAiOjE2MDg4OTYxNTksInVzZXJJZCI6IjEwMDA4NzAwMTAzIn0.T748DZfqG5ZLgwI5CVnb9MtfQxCW35QP0LAhneAYNbA',
  //       },
  //       mesg: 'success',
  //     })
  //   );
  // }),
];
