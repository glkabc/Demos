import request from "@configs/request";

const api = {
  getDemandList: "org/getOrgInfo", // 获取公司部门列表
  addOrgInfo: 'org/addOrgInfo', // 新增公司组织机构
  getStructureList: 'org/getOrgStructure', // 获取组织机构列表
  addOrg: 'org/addOrg', // 新增组织机构
  addOrgStructure: 'org/addOrgStructure', // 新增下级组织机构
  editStructure: 'org/alterOrganizationStructure', // 修改组织机构
  delOrgStructure: 'org/delOrgStructure', // 删除组织机构
  getUserInfo: 'org/getUserInfo', // 获取机构下的成员信息
  addUserInfo: 'org/addUserInfo', // 增加机构下的成员信息
  editUserInfo: 'org/alterUserInfo', // 修改机构下的成员信息
  delUserInfo: 'org/delUserInfo', // 删除机构下的成员信息
  deleteOrgInfo:'org/delOrgInfo',//删除公司
};

/*
  获取部门列表
*/
export function getDemandList(params) {
  return request({
    url: api.getDemandList,
    method: "get",
    params: params
  });
}

/*
  获取组织机构
*/
export function getStructureList(params) {
  return request({
    url: api.getStructureList,
    method: "get",
    params: params
  });
}

/*
  新增公司组织机构
*/
export function addOrgInfo(data) {
  return request({
    url: api.addOrgInfo,
    method: "post",
    data: data
  });
}

/*
  新增组织机构
*/
export function addOrg(data) {
  return request({
    url: api.addOrg,
    method: "post",
    data: data
  });
}

/*
  新增下级组织机构
*/
export function addOrgStructure(data) {
  return request({
    url: api.addOrgStructure,
    method: "post",
    data: data
  });
}

/*
  修改组织机构
*/
export function editStructure(data) {
  return request({
    url: api.editStructure,
    method: "post",
    data: data
  });
}

/*
  删除组织机构
*/
export function delOrgStructure(params) {
  return request({
    url: api.delOrgStructure,
    method: "get",
    params: params
  });
}

/*
  获取机构下的成员列表
*/
export function getUserInfo(params) {
  return request({
    url: api.getUserInfo,
    method: "get",
    params: params
  });
}

/*
  增加机构下的成员
*/
export function addUserInfo(data) {
  return request({
    url: api.addUserInfo,
    method: "post",
    data: data
  });
}

/*
  编辑机构下的成员
*/
export function editUserInfo(data) {
  return request({
    url: api.editUserInfo,
    method: "post",
    data: data
  });
}

/*
  删除机构下的成员
*/
export function delUserInfo(params) {
  return request({
    url: api.delUserInfo,
    method: "get",
    params: params
  });
}
// 删除公司
export function deleteOrgInfo(data) {
  return request({
    url:api.deleteOrgInfo,
    method:'post',
    data:data
  })
}