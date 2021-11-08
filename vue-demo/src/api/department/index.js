import request from "@configs/request";

const api = {
  getRecruitJob: "demand/getDemandList", // 获取招聘管理列表数据
  getRemandPartitionById: 'job/getRemandPartitionById', // 查看职位详情
  closeJob: 'job/closeJob', // 关闭招聘需求
  suspendJob: 'job/suspendJob', // 暂停招聘需求
  renewJob: 'job/restartJob', // 恢复招聘需求
  getSameDemandJob: 'job/getSameDemandJob', // 获取相同需求任务内容
  getResumesList: 'job/getResumesList', // 获取匹配简历列表
  recommendToJob: 'job/recommendToJob', // 批量推荐候选人
  getRecruitJobList: "job/getRecruitDemandList", // 获取招聘管理列表数据
  addDemandRemark: 'demand/addDemandRemark', // 增加备注
  getDemandRemark: 'demand/getDemandRemark', // 查看备注
  getCooperator: 'job/getCooperator', // 获取用户列表
  mtnCooperator: 'demand/mtnCooperator', // 提交新增协作人
  changeSpecialis: 'job/changeSpecialist', // 招聘负责人变更完成
  abnormalClose: 'job/abnormalClose', // 异常关闭按钮
  getDemandCooperator: 'demand/getCooperator', // 获取用户列表
  toTop:'demand/updateDemandIsTop', //置顶和取消置顶
  toOpen:'/demand/updateDemandGlobal',
  delDemandById:'/demand/deleteDemandById',//删除需求
  recordById:'record/demand',//查看操作记录
  clearCooperator:'demand/cancelCooperator',//取消协作人
  
};

/*
  获取招聘管理列表数据
*/
export function getRecruitJob(params) {
  return request({
    url: api.getRecruitJob,
    method: "get",
    params: params
  });
}
/*
查看操作记录
 */
export function getRecord(params) {
  return request({
    url: api.recordById,
    method: "get",
    params: params
  });
}
/*
  获取招聘管理列表数据
*/
export function getRecruitJobList(params) {
  return request({
    url: api.getRecruitJobList,
    method: "get",
    params: params
  });
}

/*
  查看职位详情
*/
export function getRemandPartitionById(params) {
  return request({
    url: api.getRemandPartitionById,
    method: "get",
    params: params
  });
}
/*
  获取相同需求任务内容
*/
export function getSameDemandJob(params) {
  return request({
    url: api.getSameDemandJob,
    method: "get",
    params: params
  });
}

/*
  关闭招聘需求
*/
export function closeJob(data) {
  return request({
    url: api.closeJob,
    method: "post",
    data: data
  });
}
/*
  置顶和取消置顶
*/ 
export function toTop(data) {
  return request({
    url: api.toTop,
    method: "post",
    data: data
  });
}
/*
全局开放和关闭开放
*/
export function toOpen(data) {
  return request({
    url: api.toOpen,
    method: "post",
    data: data
  });
}
/*
 删除需求
*/
export function delDepartment(data) {
  return request({
    url: api.delDemandById,
    method: "post",
    data: data
  });
}
/*
  暂停招聘需求
*/
export function suspendJob(data) {
  return request({
    url: api.suspendJob,
    method: "post",
    data: data
  });
}

/*
  恢复招聘需求
*/
export function renewJob(data) {
  return request({
    url: api.renewJob,
    method: "post",
    data: data
  });
}
/*
  获取匹配简历列表
*/
export function getResumesList(params) {
  return request({
    url: api.getResumesList,
    method: "post",
    data: params
  });
}
/*
  批量推荐候选人
*/
export function recommendToJob(params) {
  return request({
    url: api.recommendToJob,
    method: "post",
    data: params
  });
}
/*
  增加备注
*/
export function addDemandRemark(params) {
  return request({
    url: api.addDemandRemark,
    method: "post",
    data: params
  });
}
/*
  查看备注
*/

export function getDemandRemark(params) {
  return request({
    url: api.getDemandRemark,
    method: "post",
    data: params
  });
}
/*
  新增协作人
*/
export function mtnCooperator(params) {
  return request({
    url: api.mtnCooperator,
    method: "post",
    data: params
  });
}
/*
  招聘负责人变更完成
*/
export function changeSpecialis(params) {
  return request({
    url: api.changeSpecialis,
    method: "post",
    data: params
  });
}
/*
  异常关闭按钮
*/
export function abnormalClose(params) {
  return request({
    url: api.abnormalClose,
    method: "post",
    data: params
  });
}
/*
  获取用户列表
*/
export function getCooperator(params) {
  return request({
    url: api.getCooperator,
    method: "get",
    params: params
  });
}
export function getDemandCooperator(params) {
  return request({
    url: api.getDemandCooperator,
    method: "get",
    params: params
  });
}
export function candelCooperretor(data){
  return request({
    url:api.clearCooperator,
    method:"post",
    data:data
  })
}
