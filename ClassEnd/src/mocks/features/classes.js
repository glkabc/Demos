import {rest} from 'msw';
import {res} from '../utils';

const apiURL = process.env.VUE_APP_BASE_API;

const easyId = () =>
  Math.random()
    .toString(36)
    .slice(2);
    export const handlers = [
        // rest.post(`${apiURL}/course/getCourseList`, (_, _1, ctx) => {
        //     return res(
        //       ctx.status(200),
        //       ctx.json({
        //         code: 0,
        //         mesg: 'OK',
        //         data: {
        //             "meta": {
        //                 "total": 3,
        //                 "pageSize": null,
        //                 "pageNum": null
        //             },
        //             "courseList": [
        //                 {
        //                     "createUserId": "10008700094",
        //                     "createUserName": "用户1",
        //                     "createTime": "2020-11-27 09:25:35",
        //                     "modifyUserId": "10008700094",
        //                     "modifyUserName": "syvia",
        //                     "modifyTime": "2020-11-27 09:25:35",
        //                     "isDelete": 0,
        //                     "isValid": 0,
        //                     "comments": null,
        //                     "id":easyId(),
        //                     "name": "无图片",
        //                     "imgfileId": null,
        //                     "source": 1,
        //                     "authorizeType": null,
        //                     "objectId": null,
        //                     "type": "1",
        //                     "createType": null
        //                 },
        //                 {
        //                     "createUserId": "10008700094",
        //                     "createUserName": "用户1",
        //                     "createTime": "2020-11-27 09:19:34",
        //                     "modifyUserId": "10008700094",
        //                     "modifyUserName": "用户1",
        //                     "modifyTime": "2020-11-27 09:19:34",
        //                     "isDelete": 0,
        //                     "isValid": 0,
        //                     "comments": null,
        //                     "id":easyId(),
        //                     "name": "mysql",
        //                     "imgfileId": "http://172.31.63.30:9991/2020-11/7e604375-66d2-4ffe-87c1-48ed6d2f9529.jpg",
        //                     "source": 1,
        //                     "authorizeType": null,
        //                     "objectId": null,
        //                     "type": "1",
        //                     "createType": null
        //                 },
        //                 {
        //                     "createUserId": "10008700094",
        //                     "createUserName": "用户1",
        //                     "createTime": "2020-11-27 09:18:57",
        //                     "modifyUserId": "10008700094",
        //                     "modifyUserName": "用户1",
        //                     "modifyTime": "2020-11-27 09:18:57",
        //                     "isDelete": 0,
        //                     "isValid": 0,
        //                     "comments": null,
        //                     "id":easyId(),
        //                     "name": "java课程",
        //                     "imgfileId": "http://172.31.63.30:9991/2020-11/7a8e7448-64c2-4222-900c-bb3f7cbe15f0.jfif",
        //                     "source": 1,
        //                     "authorizeType": null,
        //                     "objectId": null,
        //                     "type": "1",
        //                     "createType": null
        //                 }
        //             ]
        //         },
        //       })
        //     );
        //   }),
        //   rest.post(`${apiURL}/class/getClassList`,(_,_1,ctx)=>{
        //       return res(
        //           ctx.status(200),
        //           ctx.json({
        //               code:0,
        //               mesg:'success',
        //               data:{
        //                 "meta": {
        //                     "total": 5,
        //                     "pageSize": 4,
        //                     "pageNum": 1
        //                 },
        //                 "classList":[
        //                     {
                                
        //                        "mainTask":null,
        //                         "capsuleList":[
        //                             {
        //                                 "capsule":{
        //                                     "createUserId":null,
        //                                     "createUserName":null,
        //                                     "createTime":null,
        //                                     "modifyUserId":null,
        //                                     "modifyUserName":null,
        //                                     "modifyTime":null,
        //                                     "isDelete":0,
        //                                     "isValid":0,
        //                                     "comments":null,
        //                                     "id":easyId(),
        //                                     "classId":12,
        //                                     "orderNum":4
        //                                 },
        //                                 "subTask":{"id":easyId(),'orderNum':3,'type':'subTask','average':3,},
        //                                 // "subTask":null,
        //                                 "groupList":[
        //                                     {
        //                                         "group":{
        //                                             "createUserId":null,
        //                                             "createUserName":null,
        //                                             "createTime":null,
        //                                             "modifyUserId":null,
        //                                             "modifyUserName":null,
        //                                             "modifyTime":null,
        //                                             "isDelete":0,
        //                                             "isValid":0,
        //                                             "comments":null,
        //                                             "id":easyId(),
        //                                             "capsuleId":9,
        //                                             "orderNum":2
        //                                         },
        //                                         "activationCard":[
        //                                                 // {
        //                                                 //     "id":1,
        //                                                 //     "cardType":1,
        //                                                 //     'average':3
        //                                                 // },
                                                        
        //                                         ],
        //                                         "demonstrationCard":[
        //                                             // {
        //                                             //     "id":easyId(),
        //                                             //     "cardType":3,
        //                                             //     'average':3
        //                                             // },
                                                   
        //                                         ],
        //                                         "applicationCard":[
        //                                             // {
        //                                             //     "id":2,
        //                                             //     "cardType":2,
        //                                             //     'average':3

        //                                             // },
        //                                             // {
        //                                             //     "id":easyId(),
        //                                             //     "cardType":2,
        //                                             //     'average':3

        //                                             // },
        //                                             // {
        //                                             //     "id":easyId(),
        //                                             //     "cardType":2,
        //                                             //     'average':3

        //                                             // },
                
        //                                         ],
                                               
        //                                     }
        //                                 ]
        //                             },
        //                             {
        //                                 "capsule":{
        //                                     "createUserId":null,
        //                                     "createUserName":null,
        //                                     "createTime":null,
        //                                     "modifyUserId":null,
        //                                     "modifyUserName":null,
        //                                     "modifyTime":null,
        //                                     "isDelete":0,
        //                                     "isValid":0,
        //                                     "comments":null,
        //                                     "id":easyId(),
        //                                     "classId":96,
        //                                     "orderNum":4
        //                                 },
        //                                 // "subTask":{"id":easyId(),'orderNum':3,'type':'subTask','average':3},
        //                                "subTask":null,
        //                                 "groupList":[
        //                                     {
        //                                         "group":{
        //                                             "createUserId":null,
        //                                             "createUserName":null,
        //                                             "createTime":null,
        //                                             "modifyUserId":null,
        //                                             "modifyUserName":null,
        //                                             "modifyTime":null,
        //                                             "isDelete":0,
        //                                             "isValid":0,
        //                                             "comments":null,
        //                                             "id":6,
        //                                             "capsuleId":94,
        //                                             "orderNum":2
        //                                         },
        //                                         "activationCard":[
        //                                             {
        //                                                 "id":easyId(),
        //                                                 "cardType":1,
        //                                                 'average':2,
        //                                                 "orderNum":2
        //                                             },
        //                                             {
        //                                                 "id":easyId(),
        //                                                 "cardType":1,
        //                                                 'average':3,
        //                                                 "orderNum":1
        //                                             }
        //                                     ],
        //                                     "demonstrationCard":[
        //                                         {
        //                                             "id":easyId(),
        //                                             "cardType":3,
        //                                             'average':5,
        //                                             "orderNum":3
        //                                         },
                                               
        //                                     ],
        //                                     "applicationCard":[
        //                                         {
        //                                             "id":easyId(),
        //                                             "cardType":2,
        //                                             'average':4,
        //                                             "how":'就这样',
        //                                             "orderNum":4
        //                                         },
                                            
            
        //                                     ],
                                            
                                                
                                               
        //                                     }
        //                                 ]
        //                             },
        //                             {
        //                                 "capsule":{
        //                                     "createUserId":null,
        //                                     "createUserName":null,
        //                                     "createTime":null,
        //                                     "modifyUserId":null,
        //                                     "modifyUserName":null,
        //                                     "modifyTime":null,
        //                                     "isDelete":0,
        //                                     "isValid":0,
        //                                     "comments":null,
        //                                     "id":easyId(),
        //                                     "classId":47,
        //                                     "orderNum":4
        //                                 },
        //                                 "subTask":{"id":easyId(),'orderNum':3,'type':'subTask','average':3},
        //                                 "groupList":[
        //                                     {
        //                                         "group":{
        //                                             "createUserId":null,
        //                                             "createUserName":null,
        //                                             "createTime":null,
        //                                             "modifyUserId":null,
        //                                             "modifyUserName":null,
        //                                             "modifyTime":null,
        //                                             "isDelete":0,
        //                                             "isValid":0,
        //                                             "comments":null,
        //                                             "id":easyId(),
        //                                             "capsuleId":45,
        //                                             "orderNum":2
        //                                         },
        //                                         "activationCard":[
        //                                             {
        //                                                 "id":easyId(),
        //                                                 "cardType":1,
        //                                                 'average':2
        //                                             },
        //                                             {
        //                                                 "id":easyId(),
        //                                                 "cardType":1,
        //                                                 'average':4
        //                                             }
        //                                     ],
        //                                     "demonstrationCard":[
        //                                         {
        //                                             "id":easyId(),
        //                                             "cardType":3,
        //                                             'average':5
        //                                         },
                                               
        //                                     ],
        //                                     "applicationCard":[
        //                                         {
        //                                             "id":easyId(),
        //                                             "cardType":2,
        //                                             'average':6
        //                                         },
                                            
            
        //                                     ],
                                           
                                                
                                               
        //                                     }
        //                                 ]
        //                             }
        //                         ],
        //                         "aclass":{
        //                             "createUserId":"1232312312321",
        //                             "createUserName":"马保国",
        //                             "createTime":"2020-11-23 16:42:34",
        //                             "modifyUserId":"1232312312321",
        //                             "modifyUserName":"马保国",
        //                             "modifyTime":"2020-11-23 16:42:34",
        //                             "isDelete":0,
        //                             "isValid":1,
        //                             "comments":null,
        //                             "id":easyId(),
        //                             "courseId":1,
        //                             "name":"从WEB到JAVA",
        //                             "chapter":null,
        //                             "section":"2",
        //                             "duration":0,
        //                             "subtaskNum":0,
        //                             "orderNum":1,
        //                             "status":1,
        //                             "totalScore":null,
        //                             "quoteNum":0,
        //                             "statusDesc":"创作中",
        //                             "scoreDesc":null
        //                         }
        //                     },
        //                     {
        //                         "mainTask":{"id":easyId(),'orderNum':12,"dictionaryExcepttime":3},
        //                         "capsuleList":[
        //                             {
        //                                 "capsule":{
        //                                     "createUserId":null,
        //                                     "createUserName":null,
        //                                     "createTime":null,
        //                                     "modifyUserId":null,
        //                                     "modifyUserName":null,
        //                                     "modifyTime":null,
        //                                     "isDelete":0,
        //                                     "isValid":0,
        //                                     "comments":null,
        //                                     "id":easyId(),
        //                                     "classId":12,
        //                                     "orderNum":4
        //                                 },
        //                                 "subTask":{"id":easyId(),'orderNum':3,'type':'subTask','average':3},
        //                                 "groupList":[
        //                                     {
        //                                         "group":{
        //                                             "createUserId":null,
        //                                             "createUserName":null,
        //                                             "createTime":null,
        //                                             "modifyUserId":null,
        //                                             "modifyUserName":null,
        //                                             "modifyTime":null,
        //                                             "isDelete":0,
        //                                             "isValid":0,
        //                                             "comments":null,
        //                                             "id":easyId(),
        //                                             "capsuleId":9,
        //                                             "orderNum":2
        //                                         },
        //                                         "activationCard":[
        //                                                 {
        //                                                     "id":easyId(),
        //                                                     "cardType":1,
        //                                                     'average':1
        //                                                 },
                                                        
        //                                         ],
        //                                         "demonstrationCard":[
        //                                             {
        //                                                 "id":easyId(),
        //                                                 "cardType":3,
        //                                                 'average':3
        //                                             },
                                                   
        //                                         ],
        //                                         "applicationCard":[
        //                                             {
        //                                                 "id":easyId(),
        //                                                 "cardType":2,
        //                                                 'average':3
        //                                             },
        //                                             {
        //                                                 "id":easyId(),
        //                                                 "cardType":2,
        //                                                 'average':3
        //                                             },
                
        //                                         ],
                                                
        //                                     }
        //                                 ]
        //                             },
        //                             {
        //                                 "capsule":{
        //                                     "createUserId":null,
        //                                     "createUserName":null,
        //                                     "createTime":null,
        //                                     "modifyUserId":null,
        //                                     "modifyUserName":null,
        //                                     "modifyTime":null,
        //                                     "isDelete":0,
        //                                     "isValid":0,
        //                                     "comments":null,
        //                                     "id":easyId(),
        //                                     "classId":96,
        //                                     "orderNum":4
        //                                 },
        //                                 "subTask":{"id":easyId(),'orderNum':3,'type':'subTask','average':3},
        //                                 "groupList":[
        //                                     {
        //                                         "group":{
        //                                             "createUserId":null,
        //                                             "createUserName":null,
        //                                             "createTime":null,
        //                                             "modifyUserId":null,
        //                                             "modifyUserName":null,
        //                                             "modifyTime":null,
        //                                             "isDelete":0,
        //                                             "isValid":0,
        //                                             "comments":null,
        //                                             "id":easyId(),
        //                                             "capsuleId":94,
        //                                             "orderNum":2
        //                                         },
        //                                         "activationCard":[
        //                                             {
        //                                                 "id":easyId(),
        //                                                 "cardType":1,
        //                                                 'average':3
        //                                             },
        //                                             {
        //                                                 "id":easyId(),
        //                                                 "cardType":1,
        //                                                 'average':3
        //                                             }
        //                                     ],
        //                                     "demonstrationCard":[
        //                                         {
        //                                             "id":easyId(),
        //                                             "cardType":3,
        //                                             'average':5
        //                                         },
                                               
        //                                     ],
        //                                     "applicationCard":[
        //                                         {
        //                                             "id":easyId(),
        //                                             "cardType":2,
        //                                             'average':3
        //                                         },
                                            
            
        //                                     ],
                                            
                                                
                                               
        //                                     }
        //                                 ]
        //                             },
        //                             {
        //                                 "capsule":{
        //                                     "createUserId":null,
        //                                     "createUserName":null,
        //                                     "createTime":null,
        //                                     "modifyUserId":null,
        //                                     "modifyUserName":null,
        //                                     "modifyTime":null,
        //                                     "isDelete":0,
        //                                     "isValid":0,
        //                                     "comments":null,
        //                                     "id":easyId(),
        //                                     "classId":47,
        //                                     "orderNum":4
        //                                 },
        //                                 "subTask":{"id":easyId(),'orderNum':3,'type':'subTask','average':2},
        //                                 "groupList":[
        //                                     {
        //                                         "group":{
        //                                             "createUserId":null,
        //                                             "createUserName":null,
        //                                             "createTime":null,
        //                                             "modifyUserId":null,
        //                                             "modifyUserName":null,
        //                                             "modifyTime":null,
        //                                             "isDelete":0,
        //                                             "isValid":0,
        //                                             "comments":null,
        //                                             "id":easyId(),
        //                                             "capsuleId":45,
        //                                             "orderNum":2
        //                                         },
        //                                         "activationCard":[
        //                                             {
        //                                                 "id":easyId(),
        //                                                 "cardType":1,
        //                                                 'average':3
        //                                             },
        //                                             {
        //                                                 "id":easyId(),
        //                                                 "cardType":1,
        //                                                 'average':3
        //                                             }
        //                                     ],
        //                                     "demonstrationCard":[
        //                                         {
        //                                             "id":easyId(),
        //                                             "cardType":3,
        //                                             'average':3
        //                                         },
                                               
        //                                     ],
        //                                     "applicationCard":[
        //                                         {
        //                                             "id":easyId(),
        //                                             "cardType":2,
        //                                             'average':3

        //                                         },
                                            
            
        //                                     ],
                                           
                                                
                                               
        //                                     }
        //                                 ]
        //                             }
        //                         ],
        //                         "aclass":{
        //                             "createUserId":"1232312312321",
        //                             "createUserName":"马保国",
        //                             "createTime":"2020-11-23 16:42:34",
        //                             "modifyUserId":"1232312312321",
        //                             "modifyUserName":"马保国",
        //                             "modifyTime":"2020-11-23 16:42:34",
        //                             "isDelete":0,
        //                             "isValid":1,
        //                             "comments":null,
        //                             "id":easyId(),
        //                             "courseId":1,
        //                             "name":"从入门到放弃",
        //                             "chapter":null,
        //                             "section":"2",
        //                             "duration":0,
        //                             "subtaskNum":0,
        //                             "orderNum":1,
        //                             "status":3,
        //                             "totalScore":60,
        //                             "quoteNum":0,
        //                             "statusDesc":"待改进",
        //                             "scoreDesc":null
        //                         }
        //                     },
        //                 ]
        //             }
        //           })
        //       )
        //   }),
        //   rest.post(`${apiURL}/`)
    ]