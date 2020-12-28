import request from '@/configs/request.js'
// 获取列表
export   function getClassList(listQuery={}){
    return request({
        url:'/class/getClassList',
        method:'post',
        data:listQuery,
    })
}
export   function getClassListInfo(listQuery={}){
    return request({
        url:'/qualityscore/getClassListInfo',
        method:'post',
        data:listQuery,
    })
}
// 排序
export   function changeClassOrder(listQuery={}){
    return request({
        url:'/class/changeClassOrder',
        method:'post',
        data:listQuery,
    })
}
// 编辑
export   function updateEdit(listQuery){
    return request({
        url:'/class/updateEdit',
        method:'post',
        data:listQuery
    })
}
// 删除class
export   function deleteClass(listQuery={}){
    console.log(listQuery,'listQuery')
    return request({
        url:'/class/deleteClass',
        method:'post',
        data:listQuery
    })
}
// 下载p'p't
export function leadingOutPPT(classId) {
    console.log(classId,'classId')
    return request({
        url:'class/leadingOutPPT?classId='+classId,
        // data: {
        //     classId
        // },
        method:'get',
        responseType: 'arraybuffer',
    })
}
// 下载word
export function leadingOutWord(classId) {
    console.log(classId,'classId')
    return request({
        url:'class/leadingOutWord?classId='+classId,
        method:'get',
        responseType: 'blob',
        // data:{
        //     classId
        // }
    })
}
export function createClass(listQuery){
    return request({
        url:'/canvas/createClass',
        method:'post',
        data:listQuery
    })
}

export function publishClass(listQuery){
    return request({
        url:'/canvas/publishClass',
        method:'post',
        data:listQuery
    })
}