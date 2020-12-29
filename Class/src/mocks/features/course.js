import {rest} from 'msw'
import {res} from '../utils'

const apiURL = process.env.VUE_APP_BASE_API;
export const handlers = [
    rest.get(`/classMessage`, (req, res, ctx) => {
        // console.log(req)
        return res(
            ctx.delay(2000),
            ctx.status(200),
            ctx.json({
                code: 0,
                data: {
                    "code": 0,
                    "mesg": "success",
                    "data": {
                     "meta": {
                      "total": 42,
                      "pageSize": 14,
                      "pageNum": 1
                     },
                     "courseList": [{ 
                      "id": 2128,
                      "name": "ewre",
                      "imgfileId": null,
                      "createType": "2",
                      "imgUrl": null
                     }, {
                      
                      "id": 2042,
                      "name": "我叫尚九熙",
                      "imgfileId": "842",
                      "createType": "2",
                      "imgUrl": "http://47.99.96.51:9992/downloadfile/2020-12/863c8ddf-96e4-49a4-b000-6cdbe91f7878.jfif"
                     },{ 
                        "id": 2128,
                        "name": "ewre",
                        "imgfileId": null,
                        "createType": "2",
                        "imgUrl": null
                       }, {
                        
                        "id": 2042,
                        "name": "我叫尚九熙",
                        "imgfileId": "842",
                        "createType": "2",
                        "imgUrl": "http://47.99.96.51:9992/downloadfile/2020-12/863c8ddf-96e4-49a4-b000-6cdbe91f7878.jfif"
                       },{ 
                        "id": 2128,
                        "name": "ewre",
                        "imgfileId": null,
                        "createType": "2",
                        "imgUrl": null
                       }, {
                        
                        "id": 2042,
                        "name": "我叫尚九熙",
                        "imgfileId": "842",
                        "createType": "2",
                        "imgUrl": "http://47.99.96.51:9992/downloadfile/2020-12/863c8ddf-96e4-49a4-b000-6cdbe91f7878.jfif"
                       },{ 
                        "id": 2128,
                        "name": "ewre",
                        "imgfileId": null,
                        "createType": "2",
                        "imgUrl": null
                       }, {
                        
                        "id": 2042,
                        "name": "我叫尚九熙",
                        "imgfileId": "842",
                        "createType": "2",
                        "imgUrl": "http://47.99.96.51:9992/downloadfile/2020-12/863c8ddf-96e4-49a4-b000-6cdbe91f7878.jfif"
                       },{ 
                        "id": 2128,
                        "name": "ewre",
                        "imgfileId": null,
                        "createType": "2",
                        "imgUrl": null
                       }, {
                        
                        "id": 2042,
                        "name": "我叫尚九熙",
                        "imgfileId": "842",
                        "createType": "2",
                        "imgUrl": "http://47.99.96.51:9992/downloadfile/2020-12/863c8ddf-96e4-49a4-b000-6cdbe91f7878.jfif"
                       },{ 
                        "id": 2128,
                        "name": "ewre",
                        "imgfileId": null,
                        "createType": "2",
                        "imgUrl": null
                       }, {
                        
                        "id": 2042,
                        "name": "我叫尚九熙",
                        "imgfileId": "842",
                        "createType": "2",
                        "imgUrl": "http://47.99.96.51:9992/downloadfile/2020-12/863c8ddf-96e4-49a4-b000-6cdbe91f7878.jfif"
                       }]
                    }
                   },
                mesg: 'success',
            })
        );
    }),
    rest.post(`/uploadFile`, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                code: 0,
                data: {
                    "code":0,
                    "mesg":"success",
                    "data":
                        {
                        "id":1080,//(文件id)
                        "fileName":"2.jpg",//(文件名字)
                        "fileType":1,//（文件类型 1：课程封面图片）
                        "url":"http://47.99.96.51:9992/downloadfile/2020-12/6bc2ff08-cf81-4480-9393-8440f57a1f37.jpg"
                        }
                    },
                mesg: 'success',
            })
        );
    }),
    rest.get('/course/addCourse', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                code: 0,
                data: {
                    "code":0,
                    "mesg":"success",
                    "data":"课程添加成功"
                    },
                mesg: 'success',
            })
        );
    }),
    rest.get('/course/updateCourse', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                code: 0,
                data: {
                    "code":0,
                    "mesg":"success",
                    "data":"课程修改成功"
                    },
                mesg: 'success',
            })
        );
    })
];
