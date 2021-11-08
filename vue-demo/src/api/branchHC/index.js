import request from "@configs/request";
/*************************** 首页 *******************************************/
// 获取需求部门信息
export function getDepartmentInfo() {
  return request({
    url: 'org/getAllInfo',
    method: 'get'
  })
}
// 获取简历筛选人信息
export function getLeaderInfo() {
  return request({
    url: 'api/getCustomUser',
    method: 'get'
  })
}

export function getPrivilegeOwner() {
  return request.get('/sysOrganize/getUserInfo');
}
// 需求部门
// export function getAllCustomOrg() {
//   return request.get('/org/getAllCustomOrg');
// }
export const getAllCustomOrg = sysCustomOrgId => {
  let params = {
    sysCustomOrgId
  }
  return request.get('/org/getAllCustomOrgList',{params});
}
//公司
export function getOrgInfo(){
  return request.get('org/getOrgInfo')
}
//获取公司需求部门
export function getComponyInfo(params){
  return request({
    url:'org/getOrgStructure',
    method:'get',
    params:params
  })
}
// 获取需求负责人信息
export function getUserInfo() {
  return request({
    url: 'sysOrganize/getUserInfo',
    method: 'get'
  })
}
// 获取部门HC需求列表
export function getBranchHCList(listQuery = {}) {
  return request({
    url: 'demand/getDemandList',
    method: "get",
    params: listQuery
  });
}
/*************************** 新增需求页 *******************************************/
// 新增需求
export function addDemand(listQuery = {}) {
  return request({
    url: 'demand/saveDemand',
    method: 'post',
    data: listQuery
  })
}
// 根据需求id,获取需求内容
export function getDemand(params) {
  return request({
    url: 'demand/getDemand',
    method: 'get',
    params: params
  })
}
export function postDemandPartition(params) {
  return request({
    url: 'demand/postDemandPartition',
    method: 'post',
    data: params
  })
}

export function updateDemand(params) {
  return request({
    url: 'demand/updateDemand',
    method: 'post',
    data: params
  })
}


/*************************** 需求拆分页 *******************************************/
// 根据需求id,获取需求拆分内容
export function getDemandPartitionList(params) {
  return request({
    url: 'demand/getDemandPartitionList',
    method: 'get',
    params: params
  })
}
// 需求分拆
export function saveDemandPartition(listQuery = {}) {
  return request({
    url: 'demand/saveDemandPartition',
    method: 'post',
    data: listQuery
  })
}
// 需求分拆修改
export function updateDemandPartition(listQuery = {}) {
  return request({
    url: 'demand/updateDemandPartition',
    method: 'post',
    data: listQuery
  })
}
// 需求分拆删除
export function deleteDemandPartition(listQuery = {}) {
  return request({
    url: 'demand/deleteDemandPartition',
    method: 'post',
    data: listQuery
  })
}
// 提交需求审核
export function reviewDemand(data) {
  return request({
    url: 'demand/assignDemandAuditor',
    method: 'post',
    data: data
  })
}
// 需求审核
export function checkDemand(data) {
  return request({
    url: 'demand/checkDemand',
    method: 'post',
    data: data
  })
}
/*************************** 需求分配页 *******************************************/
// 获取所有分拆以及对应的分配
export function getDemandPartitionDistribution(params) {
  return request({
    url: 'demand/getDemandPartitionDistribution',
    method: 'get',
    params: params
  })
}
// 根据分拆id查询对应的分配结果
export function getDemandDistribution(params) {
  return request({
    url: 'demand/getDemandDistribution',
    method: 'get',
    params: params
  })
}
// 单条需求分配新增
export function addDemandDistribution(listQuery = {}) {
  return request({
    url: 'demand/assignRecruiter',
    method: 'post',
    data: listQuery
  })
}
// 单条需求分配更新
export function updateDemandDistribution(listQuery = {}) {
  return request({
    url: 'demand/updateDemandDistribution',
    method: 'post',
    data: listQuery
  })
}
// 单条需求删除
export function deletedemandDistribution(id) {
  return request({
    url: 'demand/deleteDemandDistribution',
    method: 'post',
    data: id
  })
}
// 需求分配发布
export function postDemand(id) {
  return request({
    url: 'demand/releaseDemand',
    method: 'post',
    data: id
  })
}

export function getDemandStatistic(id) {
  return request({
    url: 'demand/getDemandStatistics',
    method: 'GET',
    params: { demandId: id }
  });
}
export function getTreeList(params) {
  return request({
    url: 'api/categoryJobs/getTree',
    method: 'GET',
    params: params
  });
}
export function getPrimaryDepartment(params) {
  return request({
    url: 'api/getPrimaryDepartment',
    method: 'GET',
    params: params
  });
}
// 职位名称详情
export function getRemandPartitionById(params) {
  return request({
    url: 'demand/getDemandPartitionDistribution',
    method: "get",
    params: params
  });
}
// 上线、
export function getOnLineDemand(id) {
  return request({
    url:'demand/onLineDemand',
    method:'post',
    data:id
  })
}
// 暂停
export function getsuspendDemand(id) {
  return request({
    url:'demand/suspendJob',
    method:'post',
    data:id
  })
}
// 下线 demand/exportDemandStatisticsAll
export function offLineAll(id) {
  console.log(id,'id')
  return request({
    url:'demand/offLineAll',
    method:'post',
    data:id
  })
}
// 获取详情
export function getDemandById(id) {
  return request({
    url:'demand/getDemandById',
    method:'get',
    params:id
  })
}
//异常详情
export function getDemandClose(id) {
  return request({
    url:'job/getDemandByDemndId',
    method:'get',
    params:id
  })
}
// 删除
export function deleteDemandById(id) {
  return request({
    url:'/demand/deleteDemandById',
    method:'post',
    data:id,
  })
}
// 变更
export function updateDemandById(id) {
  return request({
    url:'/demand/updateDemandById',
    method:'post',
    data:id,
  })
}
// 异常关闭demand/abnormalClose
export function abnormalClose(id) {
  return request({
    url:'/demand/abnormalClose',
    method:'post',
    data:id,
  })
}