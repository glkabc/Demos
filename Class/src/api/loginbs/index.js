import request  from '@/configs/request.js'
export function zeroLogin(id){
    console.log(id)
    return request({
        url:'/user/zeroLogin?id='+id,
        method:'get',
        // data:data
    })
}