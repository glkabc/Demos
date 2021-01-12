import {rest} from 'msw'
import {res} from '../utils'

const apiURL = process.env.VUE_APP_BASE_API;
export const handlers = [
    // rest.get(`/course/getCourseList`, (req, res, ctx) => {
    //     // console.log(req)
    //     return res(
    //         ctx.delay(1000),
    //         ctx.status(200),
    //         ctx.json({
    //             code: 0,
    //             data: {
    //                 "code": 0,
    //                 "mesg": "success",
    //                 "data": {
    //                  "meta": {
    //                   "total": 42,
    //                   "pageSize": 14,
    //                   "pageNum": 1
    //                  },
    //                  "courseList": [{ 
    //                   "id": 2128,
    //                   "name": "ewre",
    //                   "imgfileId": null,
    //                   "createType": "2",
    //                   "imgUrl": null
    //                  }, {
                      
    //                   "id": 2042,
    //                   "name": "我叫尚九熙",
    //                   "imgfileId": "842",
    //                   "createType": "2",
    //                   "imgUrl": "http://47.99.96.51:9992/downloadfile/2020-12/863c8ddf-96e4-49a4-b000-6cdbe91f7878.jfif"
    //                  },{ 
    //                     "id": 2128,
    //                     "name": "ewre",
    //                     "imgfileId": null,
    //                     "createType": "2",
    //                     "imgUrl": null
    //                    }, {
                        
    //                     "id": 2042,
    //                     "name": "我叫尚九熙",
    //                     "imgfileId": "842",
    //                     "createType": "2",
    //                     "imgUrl": "http://47.99.96.51:9992/downloadfile/2020-12/863c8ddf-96e4-49a4-b000-6cdbe91f7878.jfif"
    //                    },{ 
    //                     "id": 2128,
    //                     "name": "ewre",
    //                     "imgfileId": null,
    //                     "createType": "2",
    //                     "imgUrl": null
    //                    }, {
                        
    //                     "id": 2042,
    //                     "name": "我叫尚九熙",
    //                     "imgfileId": "842",
    //                     "createType": "2",
    //                     "imgUrl": "http://47.99.96.51:9992/downloadfile/2020-12/863c8ddf-96e4-49a4-b000-6cdbe91f7878.jfif"
    //                    },{ 
    //                     "id": 2128,
    //                     "name": "ewre",
    //                     "imgfileId": null,
    //                     "createType": "2",
    //                     "imgUrl": null
    //                    }, {
                        
    //                     "id": 2042,
    //                     "name": "我叫尚九熙",
    //                     "imgfileId": "842",
    //                     "createType": "2",
    //                     "imgUrl": "http://47.99.96.51:9992/downloadfile/2020-12/863c8ddf-96e4-49a4-b000-6cdbe91f7878.jfif"
    //                    },{ 
    //                     "id": 2128,
    //                     "name": "ewre",
    //                     "imgfileId": null,
    //                     "createType": "2",
    //                     "imgUrl": null
    //                    }, {
                        
    //                     "id": 2042,
    //                     "name": "我叫尚九熙",
    //                     "imgfileId": "842",
    //                     "createType": "2",
    //                     "imgUrl": "http://47.99.96.51:9992/downloadfile/2020-12/863c8ddf-96e4-49a4-b000-6cdbe91f7878.jfif"
    //                    },{ 
    //                     "id": 2128,
    //                     "name": "ewre",
    //                     "imgfileId": null,
    //                     "createType": "2",
    //                     "imgUrl": null
    //                    }, {
                        
    //                     "id": 2042,
    //                     "name": "我叫尚九熙",
    //                     "imgfileId": "842",
    //                     "createType": "2",
    //                     "imgUrl": "http://47.99.96.51:9992/downloadfile/2020-12/863c8ddf-96e4-49a4-b000-6cdbe91f7878.jfif"
    //                    }]
    //                 }
    //                },
    //             mesg: 'success',
    //         })
    //     );
    // }),
    // rest.post(`/uploadFile`, (req, res, ctx) => {
    //     return res(
    //         ctx.delay(2000),
    //         ctx.status(200),
    //         ctx.json({
    //             code: 0,
    //             data: {
    //                 "code":0,
    //                 "mesg":"success",
    //                 "data":
    //                     {
    //                     "id":1080,//(文件id)
    //                     "fileName":"2.jpg",//(文件名字)
    //                     "fileType":1,//（文件类型 1：课程封面图片）
    //                     "url":"http://47.99.96.51:9992/downloadfile/2020-12/6bc2ff08-cf81-4480-9393-8440f57a1f37.jpg"
    //                     }
    //                 },
    //             mesg: 'success',
    //         })
    //     );
    // }),
    // rest.get('/course/addCourse', (req, res, ctx) => {
    //     return res(
    //         ctx.status(200),
    //         ctx.json({
    //             code: 0,
    //             data: {
    //                 "code":0,
    //                 "mesg":"success",
    //                 "data":"课程添加成功"
    //                 },
    //             mesg: 'success',
    //         })
    //     );
    // }),
    // rest.get('/course/updateCourse', (req, res, ctx) => {
    //     return res(
    //         ctx.status(200),
    //         ctx.json({
    //             code: 0,
    //             data: {
    //                 "code":0,
    //                 "mesg":"success",
    //                 "data":"课程修改成功"
    //                 },
    //             mesg: 'success',
    //         })
    //     );
    // }),
    // rest.post('/user/getPublicKey', (req, res, ctx) => {
    //     return res(
    //         ctx.status(200),
    //         ctx.json({
    //             code: 0,
    //             mesg: "success",
    //             data: 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCKaSwZcocKg4NpvMbwd6zpkzkHdihgiSzlDjlI+Qb6MYMxcJ4zmmayu1kENvm1yHbkhou7GAuMeKs3hLQgyNy7xN9gAQ2Uu8T+pQSPuxUvv36/rTy05U625pmE78UIckm5vYHBKwcOUrfZj1TX45Z6lbBQezB+qt79B/TTgXKWfQIDAQAB'
    //         })
    //     )
    // }),
    // rest.get('/user/generateVerificationCode', (req, res, ctx) => {
    //     return res(
    //         ctx.status(200),
    //         ctx.json({
    //             code: 0,
    //             mesg: "success",
    //             data: {
    //                 id: "9191112baf1d784ef69c01724e153097",
    //                 base64Str: "iVBORw0KGgoAAAANSUhEUgAAAGQAAAAoCAIAAACHGsgUAAAO+ElEQVR42u3aZ9QV1RUGYEFEQbAidsXeFVFRLCgqFiyIBbsidgXsvfeuSxQFRbEAKlZUUMRCiimmmJiEmGJMMyQmpphId60862w432Tu3Pt9omT5w/1j1ty5Z05597vfvc+5d5FFvrLPZFOmTPlasq8n+0aybyZ78803v5Xs28m+k+y7yd56663vJft+sh8k+2Gyt5P9KNmPk73zzjs/SfbTZD9LNjXZz5O9++67v0j2y2S/SvbrZO+9995vkr2f7LfJfpfs98n+kOyPyT744IM/JZuW7M/J/pLsww8//GuyvyX7KNnfk/0j2T+T/SvZxx9//O9k/0n2ySef1AUrI1ULVkaqHlhvz7ciUrVglZCqBSsj1RisElK1YGWkasEqIhVgZaSaAauSVgFWJa2KYDVLqwCrAa0CrEpaBVjvz7fGtAqwKmkVYLWQVgFWRqoJrMoYrKRVgNWAVrVgVdIqwGpAqwCrWVoVwaqkVYBVSasAq0irAKuSVhVgVdIqwGpAqwCrWVoFWA1oFWBV0qoWrAa0CrAqaRVgtZBWAVYgNX369CawvpL2BtJeF6z/v7S/8cYbX3Jpn55sHlgNpD3uX331VfduPr+0uxoLQLLK4Ycfrv/JkycPHTp0/PjxeuOVzyntXof4Pffc8wVKeyOwikjdf//9++yzzyGHHHLRRRfde++9r7322ssvv2xJCyDtGqDw66+/fs011zz88MO9evU69thjH3nkkT333HPXXXcdPHiwRWq2YNLuxlsTJkx49NFH4X722WdXSrv7zKyWSzukZsyY0QRWPWkfNGhQmzZtFl10Udd27dqttdZa/fv3v/XWW03IsjVoobRrMGnSJB8vvvjiM888c9ttt1177bV79+69/vrrL7300nvssQdnbL311n379n3ppZc+q7T79sknnxw2bJie+/Xrd/XVVz/77LMmk8HSlWaecLbp8Yp+fNtCaW8GrKxWZl+s9Vu3bt2+ffsll1yya9euhx12GLYjmleCXw2kffTo0c8999wpp5xy3nnnbbfddh06dNhqq61WXXXVVq1arbfeeiuuuOJiiy12xRVXPPDAA2PHjqVfLaeVlYNp880333jjjfW2zDLL3HbbbZZg3AzWuHHjRo4cOWTIkP3339+0DzzwwBtuuOGxxx4zECITuCBaPVpVgFUp7bydkUKu4v0SSyxhfptuuin23XHHHSbkRXhVSvv1119/7rnnLr/88iussEIgZXmoOmDAAEN40qVLFx/FI+rdd999FM0ympV2MzTP7t27g8mszjrrrDXWWOOpp56CoNgMpEaNGnXJJZdwzFJLLdW2bVte4W/Nll12WQozcODAF198kachW0/aZySbt/IGVbsxMkBbbrkljCwYv+KJKbpfZZVVNtpoo4MPPviJJ55AH0KGXAGWSbjuvPPOEydOXG211YSbSBF3N998s+kSrxNOOOGkk0464ogjdtttt44dO6655pp8IIi8JRiblfbbb78dTUAQYLFtttkGNPKsxUtHIOvWrdull17aqVOnaGPCrebb4osvjol9+vShcfQOsvCqpFUFWLUVQ5FNPgoTK0SoDTbYwGAYEXi5ctTxxx9/0EEHASjAwilBilYWIzloBqZDDz2UP3FZsKgbuN2I9N4iNYvAJJG77767pTaOQUEkutsly2BBEHeCVr519fHII4/kA2122mmn5ZZbzs1KK60UrwRqK6+8MmHBR5OvlXY2c+bMJrAqY5DWZqSMoWKI0gFNqPVxxx3Hq0YKQN3Qsu23337EiBE5Buk67lBcrEH+Bx98kIc9h07UolFtWRU+etHCdMXbXKJeEYn1pN1Xer777rtjtfGiGOcbV7SSDVUqOge9J65iAvdPPPFEskizuFx64UJY85Mg5VFTraRVNVgZKfdmb94aGGmzzTZTlxYrBrWSF63KV1tssYUZm41kJKB8Kx4VUE8//bSsZ4o9e/ZERh932GEHCL7yyiulQpTM3XTTTdTHWLrq0aOH7AFEUlhJK1UI1RP+kaw7d+5sngTUK2eccUau2lEYCsH9TTbZRCfQ962KDP0lR5M3lnexft9998XBWrBmJpsHViWtVAZXXXUVEdEALwT2888/X1teecWqKJFJy2t77bUXciGFrEcpSLX1SEPUapdddgliVu6c3RuXuoe4GFHIoCd21Eq751RP/62TaRxgefeoo47ySkg7XIj93nvvHaFtLdzmeS6vQPb4448bNLI88aUStdLeCKxQKzFowYiqgY5URjfeeKPVwqtUiHqIX8SSZpsQ/yDdQw89ZB6qAVpGERRo2kCq3oGM51ytgtPYiOJClkRDqy3SCnAao498cvnll6+77rq4XxRW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"
    //             }
    //         })
    //     )
    // }),
    // rest.post('/user/login', (req, res, ctx) => {
    //     return res(
    //         ctx.status(200),
    //         ctx.json({
    //             "code": 0,
    //             "mesg": "success",
    //             "data": {
    //                 "expireTime": 20000,
    //                 "user": {
    //                     "createUserId": "202001343",
    //                     "createUserName": "admin",
    //                     "sysUserId": 10008700108,
    //                     "userName": "程",
    //                     "mail": "cheng@ibest.com"
    //                 },
    //                 "modules": [{
    //                     "moduleId": 2,
    //                     "moduleUrl": "courses",
    //                     "moduleName": "我的课程",
    //                     "moduleCode": "wdkc"
    //                 }],
    //             }
    //         })
    //     )
    // }),
    // rest.get('/user/checkVerificationCode', (req, res, ctx) => {
    //     return res(
    //         ctx.status(200),
    //         ctx.json({
    //             "code": 0,
    //             "mesg": "success",
    //             "data": {
    //                 "expireTime": 36000000,
    //                 "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJtYWlsIjoidXNlcjFAaWJlc3QuY29tIiwiZXhwIjoxNjA5MzUyNjc2LCJ1c2VySWQiOiIxMDAwODcwMDA5NCJ9.7ACtkwzSiWfqDuIFev1k5QgkAGpPzBsq7t1LBNs8Gh8"
    //             }
    //         })
    //     )
    // }),
    // rest.get('/user/refreshToken', (req, res, ctx) => {
    //     return res(
    //         ctx.status(200),
    //         ctx.json({
    //             "code": 0,
    //             "mesg": "success",
    //             "data": {
    //                 "expireTime": 20000,
    //                 "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJtYWlsIjoidXNlcjFAaWJlc3QuY29tIiwiZXhwIjoxNjA5MzUyNjc2LCJ1c2VySWQiOiIxMDAwODcwMDA5NCJ9.7ACtkwzSiWfqDuIFev1k5QgkAGpPzBsq7t1LBNs8Gh8"
    //             }
    //         })
    //     )
    // })
];
