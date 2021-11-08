import request from "@configs/request";

// 查询候选人信息
export function getCandidate(listQuery = {}) {
  return request({
    url: 'candidate/getCandidate',
    method: 'get',
    params: listQuery
  })
}
//查询操作记录
export function getRecord(params){
  return request({
    url:'record/recruit',
    method:'get',
    params:params
  })
}
//查询面试官或复试官
export function getCandidateReview(revierwList={}){
   return request({
    url:'/demand/getParameterList',
    method:"post",
    data:revierwList
   })
}
// 查询当前候选人应聘信息
export function getCandidateInfo(params) {
  return request({
    url: 'candidate/getCandidateInfo',
    method: 'get',
    params: params
  })
}
// 查询当前候选人面试信息
export function getInterviewInfo(params) {
  return request({
    url: 'candidate/getInterviewInfo',
    method: 'get',
    params: params
  })
}
// 候选人面试通过offer确认
export function updateAffirmOffer(offerList = {}) {
  return request({
    url: 'candidate/updateAffirmOffer',
    method: 'post',
    data: offerList
  })
}
// 候选人确认上岗
export function updateAffirmWork(workList = {}) {
  return request({
    url: 'candidate/updateAffirmWork',
    method: 'post',
    data: workList
  })
}
// 候选人放弃
export function multiGiveUp(giveUpList = {}) {
  return request({
    url: 'candidate/multiGiveUp',
    method: 'post',
    data: giveUpList
  })
}