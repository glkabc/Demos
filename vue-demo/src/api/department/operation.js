import request from "@configs/request";

const api = {
  getCountJob: 'recruit/getCountJob', // 获取招聘管理操作列表数据
  getCandidateInfo: 'recruit/getCandidateInfo', // 招聘管理/操作/全部
  getWaitPrimaryInfo: 'recruit/getWaitPrimaryInfo', // 招聘管理/操作/负责人初选
  getPrimaryPassInfo: 'recruit/getPrimaryPassInfo', // 招聘管理/操作/面试官筛选
  getForInterview: 'recruit/getForInterview', // 招聘管理/操作/预约面试
  getPassInterviewInfo: 'recruit/getPassInterviewInfo', // 招聘管理/操作/offer
  getWaitEntryInfo: 'recruit/getWaitEntryInfo', // 招聘管理/操作/入职
  getGiveUpOfferInfo: 'recruit/getGiveUpOfferInfo', // 招聘管理/操作/候选人放弃
  getWorkInfo: 'recruit/getWorkInfo', // 招聘管理/操作/已入职
  getEliminated:'/recruit/getEliminated',// 招聘管理/操作/已淘汰
  weedOutCandidate: 'recruit/weedOutCandidate', // 批量淘汰
  passCandidate: 'recruit/passCandidate', // 批量通过
  updateScreenWeedOut: 'recruit/updateScreenWeedOut', // 面试官淘汰
  updateScreenpass: 'recruit/updateScreenpass', // 面试官通过
  UapdateGiveUpInterview: 'recruit/UapdateGiveUpInterview', // 面试官邀约-放弃面试
  passInterview: 'recruit/passInterview', // 面试官邀约-通过面试
  addinterviewInfo: 'recruit/addinterviewInfo', // 新增面试安排
  UptInterviewComment: 'recruit/UptInterviewComment', // 面试结论
  giveUpOffer: 'recruit/giveUpOffer', // 批量放弃offer
  affirmOffer: 'recruit/affirmOffer', // 确认offer
  updateAffirmOffer: 'recruit/updateAffirmOffer', // 编辑offer
  editOffer:'recruit/updateAffirmOffer',//修改offer
  delGiveUpOffer: 'recruit/delGiveUpOffer', // 候选人放弃（确认流失）
  affirmEntry: 'recruit/affirmEntry', // 入职（确认入职）
  giveUpContract: 'recruit/giveUpContract', // 入职（放弃入职）
  recommendTalent: 'resume/recommendTalent', // 推荐面试官
  uptAllMove: 'recruit/uptAllMove', // 移动到某一个
  getInterviewInfo: 'candidate/getInterviewInfo', // 获取面试结论数据
  getSetup: 'setup/getSetup', // 获取来源渠道数据
  getCode: 'setup/getCode', // 获取数据
  getAffirmOffer: 'recruit/getAffirmOffer', // 获取数据
  getSetupAddress: 'setup/getSetupAddress', // 获取面试地点
  addSetup: 'setup/addSetup', // 新增面试地点
  getTalentInterviewById: 'recruit/getTalentInterviewById', // 获取预约面试数据
  checkIsCanInterview: 'recruit/checkIsCanInterview', // 验证是否可以预约面试
  getSelectCooperator:'demand/getCooperator',//获得协作人
  recruitResignJob: 'recruit/resignJob', // 离职
};

/*
  离职
*/
export function recruitResignJob(data) {
  return request({
    url: api.recruitResignJob,
    method: "post",
    data: data
  });
}

/*
  获取招聘管理操作列表数据
*/
export function getCountJob(params) {
  return request({
    url: api.getCountJob,
    method: "get",
    params: params
  });
}

/*
  招聘管理/操作/全部
*/
export function getCandidateInfo(params) {
  return request({
    url: api.getCandidateInfo,
    method: "get",
    params: params
  });
}

/*
  招聘管理/操作/负责人初选
*/
export function getWaitPrimaryInfo(params) {
  return request({
    url: api.getWaitPrimaryInfo,
    method: "get",
    params: params
  });
}

/*
  招聘管理/操作/面试官筛选
*/
export function getPrimaryPassInfo(params) {
  return request({
    url: api.getPrimaryPassInfo,
    method: "get",
    params: params
  });
}

/*
  招聘管理/操作/预约面试
*/
export function getForInterview(params) {
  return request({
    url: api.getForInterview,
    method: "get",
    params: params
  });
}

/*
  招聘管理/操作/offer
*/
export function getPassInterviewInfo(params) {
  return request({
    url: api.getPassInterviewInfo,
    method: "get",
    params: params
  });
}

/*
  招聘管理/操作/入职
*/
export function getWaitEntryInfo(params) {
  return request({
    url: api.getWaitEntryInfo,
    method: "get",
    params: params
  });
}

/*
  招聘管理/操作/候选人放弃
*/
export function getGiveUpOfferInfo(params) {
  return request({
    url: api.getGiveUpOfferInfo,
    method: "get",
    params: params
  });
}

/*
  招聘管理/操作/已入职
*/
export function getWorkInfo(params) {
  return request({
    url: api.getWorkInfo,
    method: "get",
    params: params
  });
}
//  招聘管理/操作/已淘汰
export function getEliminatedInfo(params) {
  return request({
    url: api.getEliminated,
    method: "get",
    params: params
  });
}
/*
  批量淘汰
*/
export function weedOutCandidate(data) {
  return request({
    url: api.weedOutCandidate,
    method: "post",
    data: data
  });
}

/*
  批量通过
*/
export function passCandidate(data) {
  return request({
    url: api.passCandidate,
    method: "post",
    data: data
  });
}

/*
  面试官淘汰
*/
export function updateScreenWeedOut(data) {
  return request({
    url: api.updateScreenWeedOut,
    method: "post",
    data: data
  });
}

/*
  面试官通过
*/
export function updateScreenpass(data) {
  return request({
    url: api.updateScreenpass,
    method: "post",
    data: data
  });
}

/*
  面试官邀约-放弃面试
*/
export function UapdateGiveUpInterview(data) {
  return request({
    url: api.UapdateGiveUpInterview,
    method: "post",
    data: data
  });
}
/*
  面试官邀约-通过
*/
export function passInterview(data) {
  return request({
    url: api.passInterview,
    method: "post",
    data: data
  });
}

/*
  新增面试安排
*/
export function addinterviewInfo(data) {
  return request({
    url: api.addinterviewInfo,
    method: "post",
    data: data
  });
}

/*
  面试结论
*/
export function UptInterviewComment(data) {
  return request({
    url: api.UptInterviewComment,
    method: "post",
    data: data
  });
}

/*
  批量放弃offer
*/
export function giveUpOffer(data) {
  return request({
    url: api.giveUpOffer,
    method: "post",
    data: data
  });
}

/*
  确认offer
*/
export function affirmOffer(data) {
  return request({
    url: api.affirmOffer,
    method: "post",
    data: data
  });
}
/*
  确认offer
*/
export function updateAffirmOffer(data) {
  return request({
    url: api.updateAffirmOffer,
    method: "post",
    data: data
  });
}


/*
修改offer
*/ 
export function editOffer(data){
  return request({
    url:api.editOffer,
    method:"post",
    data:data
  })
}
/*
  候选人放弃（确认流失）
*/
export function delGiveUpOffer(data) {
  return request({
    url: api.delGiveUpOffer,
    method: "post",
    data: data
  });
}

/*
  入职（确认入职）
*/
export function affirmEntry(data) {
  return request({
    url: api.affirmEntry,
    method: "post",
    data: data
  });
}

/*
  入职（放弃入职）
*/
export function giveUpContract(data) {
  return request({
    url: api.giveUpContract,
    method: "post",
    data: data
  });
}
/*
  推荐面试官
*/
export function recommendTalent(data) {
  return request({
    url: api.recommendTalent,
    method: "post",
    data: data
  });
}
/*
  移动到某一个
*/
export function uptAllMove(data) {
  return request({
    url: api.uptAllMove,
    method: "post",
    data: data
  });
}
/*
  获取面试结论数据
*/
export function getInterviewInfoList(params) {
// export function getInterviewInfo(params) {
  return request({
    url: api.getInterviewInfo,
    method: "get",
    params: params
  });
}
/*
  获取来源渠道
*/
export function getSetup(params) {
  return request({
    url: api.getSetup,
    method: "get",
    params: params
  });
}
/*
获得协作人
 */
export function getSelectCooperator(params){
  return request({
    url:api.getSelectCooperator,
    method:"get",
    params:params
  })
}
/*
  获取数据
*/
export function getCode(params) {
  return request({
    url: api.getCode,
    method: "get",
    params: params
  });
}
/*
  获取数据
*/
export function getAffirmOffer(params) {
  return request({
    url: api.getAffirmOffer,
    method: "get",
    params: params
  });
}
/*
  获取面试地点
*/
export function getSetupAddress(params) {
  return request({
    url: api.getSetupAddress,
    method: "get",
    params: params
  });
}
/*
  新增面试地点
*/
export function addSetup(params) {
  return request({
    url: api.addSetup,
    method: "post",
    data: params
  });
}
/*
  获取预约面试数据
*/
export function getTalentInterviewById(params) {
  return request({
    url: api.getTalentInterviewById,
    method: "post",
    data: params
  });
}
/*
  获取预约面试数据
*/
export function checkIsCanInterview(params) {
  return request({
    url: api.checkIsCanInterview,
    method: "post",
    data: params
  });
}