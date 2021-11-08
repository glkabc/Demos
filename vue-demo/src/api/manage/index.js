import request from '../../configs/request'

const api = {
  getModuleList: "module/getModule", // 获取资源管理列表
  addModule: "module/addModule", // 增加资源管理 parentId默认传0 不新增下级
  updateModule: "module/updateModule", // 编辑资源
  delModule: "module/deleteModule", // 删除资源
  getRole: 'role/getRole', // 查询角色
  addRole: 'role/addRole', // 增加角色
  updateRole: 'role/updateRole', // 修改角色
  deleteRole: 'role/deleteRole', // 删除角色
  addRoleModules: 'role/addRoleModules', // 批量新增角色资源权限
  deleteRoleModules: 'role/deleteRoleModules', // 批量删除角色资源权限
  getOrgInfo: 'sysOrganize/getOrgInfo', // 查询组织机构信息
  addOrgInfo: 'sysOrganize/addOrgInfo', // 新增组织机构信息
  getOrgStructure: 'sysOrganize/getOrgStructure', // 查询组织结构信息
  addOrgStructure: 'sysOrganize/addOrgStructure', // 新增组织结构信息
  delOrgStructure: 'sysOrganize/delOrgStructure', // 新增组织结构信息
  editStructure: 'sysOrganize/alterOrgStructure', // 编辑组织结构信息
  getChildrenOrg: 'sysOrganize/getChildrenOrg', // 查询下级组织
  getUserInfo: 'sysOrganize/getUserInfo', // 查询组织角色
  alterUserInfo: 'sysOrganize/alterUserInfo', // 编辑组织角色
  addUserInfo: 'sysOrganize/addUserInfo', // 增加组织角色
  delUserInfo: 'sysOrganize/delUserInfo', // 删除组织角色
  getModuleByRoleId: 'module/getModuleByRoleId', // 获取角色权限
  addRoleUsers: 'role/addRoleUsers', // 赋予成员角色权限
  getRolesByUserId: 'role/getRolesByUserId', // 查询成员角色权限,
  getPositions:'demand/getOwnerDemand',//获取职位筛选列表
  getDemandIdByInfo:'recruit/getPrimaryPassInfo',
  changeDisUserInfo: 'sysOrganize/disUserInfo' //修改状态
};

/**
 * 修改状态
 */
export function changeDisUserInfo(params) {
  return request({
    url: api.changeDisUserInfo,
    method: "post",
    data: params
  });
}

/*
  获取资源管理列表
*/
export function getModuleList(params) {
  return request({
    url: api.getModuleList,
    method: "post",
    data: params
  });
}

/*
  增加资源管理
*/
export function addModule(params) {
  return request({
    url: api.addModule,
    method: "post",
    data: params
  });
}
/*
  编辑资源管理
*/
export function updateModule(params) {
  return request({
    url: api.updateModule,
    method: "post",
    data: params
  });
}
/*
  删除资源管理
*/
export function delModule(params) {
  return request({
    url: api.delModule,
    method: "post",
    data: params
  });
}
/*
  查询角色
*/
export function getRole(params) {
  return request({
    url: api.getRole,
    method: "post",
    data: params
  });
}

/*
  新增角色
*/
export function addRole(params) {
  return request({
    url: api.addRole,
    method: "post",
    data: params
  });
}
/*
  编辑角色
*/
export function updateRole(params) {
  return request({
    url: api.updateRole,
    method: "post",
    data: params
  });
}
/*
  删除角色
*/
export function deleteRole(params) {
  return request({
    url: api.deleteRole,
    method: "post",
    data: params
  });
}
/*
  批量新增角色资源权限
*/
export function addRoleModules(params) {
  return request({
    url: api.addRoleModules,
    method: "post",
    data: params
  });
}

/*
  批量删除角色资源权限
*/
export function deleteRoleModules(params) {
  return request({
    url: api.deleteRoleModules,
    method: "post",
    data: params
  });
}
/*
  查询组织机构信息
*/
export function getOrgInfo(params) {
  return request({
    url: api.getOrgInfo,
    method: "get",
    params: params
  });
}
/*
  新增组织机构信息
*/
export function addOrgInfo(params) {
  return request({
    url: api.addOrgInfo,
    method: "post",
    data: params
  });
}
/*
  查询组织结构信息
*/
export function getOrgStructure(params) {
  return request({
    url: api.getOrgStructure,
    method: "get",
    params: params
  });
}
/*
  增加组织结构信息
*/
export function addOrgStructure(params) {
  return request({
    url: api.addOrgStructure,
    method: "post",
    data: params
  });
}
/*
  删除组织结构信息
*/
export function delOrgStructure(params) {
  return request({
    url: api.delOrgStructure,
    method: "post",
    data: params
  });
}
/*
  编辑组织结构信息
*/
export function editStructure(params) {
  return request({
    url: api.editStructure,
    method: "post",
    data: params
  });
}
/*
  查询下级组织
*/
export function getChildrenOrg(params) {
  return request({
    url: api.getChildrenOrg,
    method: "get",
    params: params
  });
}
/*
  编辑组织角色信息
*/
export function alterUserInfo(params) {
  return request({
    url: api.alterUserInfo,
    method: "post",
    data: params
  });
}
/*
  增加组织角色信息
*/
export function addUserInfo(params) {
  return request({
    url: api.addUserInfo,
    method: "post",
    data: params
  });
}
/*
  删除组织角色信息
*/
export function delUserInfo(params) {
  return request({
    url: api.delUserInfo,
    method: "post",
    data: params
  });
}
/*
获取职位筛选列表
 */
export function getPositionsList(params){
  return request({
    url:api.getPositions,
    method:"get",
    params:params
  })
}
export function getDemandId(params){
  return request({
    url:api.getDemandIdByInfo,
    method:'get',
    params:params
  })
}
/*
  查询组织角色信息
*/
export function getUserInfoList(params) {
  return request({
    url: api.getUserInfo,
    method: "get",
    params: params
  });
}
/*
  获取角色权限
*/
export function getModuleByRoleId(params) {
  return request({
    url: api.getModuleByRoleId,
    method: "get",
    params: params
  });
}
/*
  获取角色权限
*/
export function getRolesByUserId(params) {
  return request({
    url: api.getRolesByUserId,
    method: "get",
    params: params
  });
}
/*
  获取角色权限
*/
export function addRoleUsers(params) {
  return request({
    url: api.addRoleUsers,
    method: "post",
    data: params
  });
}