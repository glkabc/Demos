import request from '../../configs/request'

const api = {
  getJobStatistics: "report/getJobStatistics", // 获取职位统计列表
  exportJobStatistics: "report/exportJobStatistics", // 导出职位统计
  exportDemandStatisticsAll: "report/exportDemandStatisticsAll", // 导出招聘详情
  getCandidateStatistics: "report/getCandidateStatistics", // 获取候选人列表
  exportCandidateStatistics: "report/exportCandidateStatistics", // 导出候选人列表
  getRecruitStatistics: "report/getRecruitmentStatistics", // 获取招聘人员列表
  exportRecruitStatistics: "report/exportRecruitStatistics", // 导出招聘人员列表
  getDepartmentSatisfaction: "report/statistics/demandMonth", // 获取部门满足列表
  exportDepartmentSatisfaction: "report/exportstatistics/demandMonth", // 导出部门满足
  getPositionName: "report/getPositionName", // 获取职位
  getRecruitmentSpecialist: "report/getRecruitmentSpecialist", // 获取招聘专员
  exportAffirmOffer: "report/exportAffirmOffer", // 导出招聘专员
  getInterviewrReport: "interviewr/getInterviewrReport", // 获取面试官台账数据
  exportInterviewrReport: "report/exportInterviewrReport", // 导出面试官台账数据
  getAllInfo: "org/getAllInfo", // 获取部门接口
  getDemandLedger: "report/getDemandLedger", // 获取需求台账
  exportDemandLedger: "report/exportDemandLedger", // 导出需求台账
  getSysUsers: "report/getSysUsers", // 招聘人员产能页面的姓名
  getRecruitProceed: "report/getRecruitProceed", // 招聘进展统计表
  exportRecruitProceed: "/report/exportRecruitProceed", // 导出招聘进展统计表
  getRecruitProductionFirst: "/report/getRecruitProductionFirst", // 招聘满足率
  getRecruitProductionSecond: '/report/getRecruitProductionSecond', // 招聘进展
  getRecruitProductionThird: "/report/getRecruitProductionThird", // 入职类别
  getRecruitProductionFourth: "/report/getRecruitProductionFourth", // 招聘业绩
  getDepartmentMeetFirst: "/report/getDepartmentMeetFirst", // 部门满足率
  getDepartmentMeetSecond: "/report/getDepartmentMeetTwo", // 部门满足周期
  getDepartmentMeetThird: "/report/getDepartmentMeetThrid", // 部门招聘进展
  getDepartmentMeetFourth: "/report/getDepartmentMeetfourth", // 部门入职类别

  exportRecruitProductionFirst: "/report/exportRecruitProductionFirst", // 导出招聘进展满足率总1_满足率_
  exportRecruitProductionSecond: "/report/exportRecruitProductionSecond", // 招聘进展表2招聘进展导出
  exportRecruitProductionThird: "/report/exportRecruitProductionThird", // 招聘人员产能数据表3入职类别导出
  exportRecruitProductionFourth: "/report/exportRecruitProductionFourth", // 招聘进展满足率总4_招聘业绩导出

  exportDepartmentMeetFirst: "/report/exportDepartmentMeetFirst", // 部门满足情况数据表1_满足率_导出
  exportDepartmentMeetTwo: "/report/exportDepartmentMeetTwo", // 部门满足情况数据表2_满足周期_导出
  expertDepartmentMeetThrid: "/report/expertDepartmentMeetThrid", // 部门满足情况数据表3_招聘进展_导出报表
  expertDepartmentMeetFourth: "/report/expertDepartmentMeetFourth", // 部门满足情况数据表4_入职类别_导出报表
  getPrimaryDepartment: "/api/getPrimaryDepartment", // 获取所属部门数据
};

/**
 * 获取所属部门数据
 */
export function getPrimaryDepartment() {
  return request({
    url: api.getPrimaryDepartment,
    method: "get",
  });
}

/*
  招聘人员产能总 数据导出
*/
export function exportRecruitProduction(type, data) {
  let url
  switch (type) {
    case '0':
      url = api.exportRecruitProductionFirst
      break;
    case '1':
      url = api.exportRecruitProductionSecond
      break;
    case '2':
      url = api.exportRecruitProductionThird
      break;
    case '3':
      url = api.exportRecruitProductionFourth
      break;
    default:
      break;
  }
  return request({
    url: url,
    responseType: 'blob',
    timeout: 120000,
    method: "post",
    data: data
  });
}

/*
  部门满足情况 数据导出
*/
export function exportDepartmentMeet(type, data) {
  let url
  switch (type) {
    case '0':
      url = api.exportDepartmentMeetFirst
      break;
    case '1':
      url = api.exportDepartmentMeetTwo
      break;
    case '2':
      url = api.expertDepartmentMeetThrid
      break;
    case '3':
      url = api.expertDepartmentMeetFourth
      break;
    default:
      break;
  }
  return request({
    url: url,
    responseType: 'blob',
    timeout: 120000,
    method: "post",
    data: data
  });
}

/*
  获取部门入职类别列表
*/
export function getDepartmentMeetFourth(data) {
  return request({
    url: api.getDepartmentMeetFourth,
    method: "post",
    data: data
  });
}

/*
  获取部门招聘进展列表
*/
export function getDepartmentMeetThird(data) {
  return request({
    url: api.getDepartmentMeetThird,
    method: "post",
    data: data
  });
}

/*
  获取部门满足周期列表
*/
export function getDepartmentMeetSecond(data) {
  return request({
    url: api.getDepartmentMeetSecond,
    method: "post",
    data: data
  });
}

/*
  获取部门满足率列表
*/
export function getDepartmentMeetFirst(data) {
  return request({
    url: api.getDepartmentMeetFirst,
    method: "post",
    data: data
  });
}

/*
  获取招聘业绩列表
*/
export function getRecruitProductionFourth(data) {
  return request({
    url: api.getRecruitProductionFourth,
    method: "post",
    data: data
  });
}

/*
  获取入职类别列表
*/
export function getRecruitProductionThird(data) {
  return request({
    url: api.getRecruitProductionThird,
    method: "post",
    data: data
  });
}

/*
  获取招聘进展列表
*/
export function getRecruitProductionSecond(data) {
  return request({
    url: api.getRecruitProductionSecond,
    method: "post",
    data: data
  });
}

/*
  获取招聘满足率列表
*/
export function getRecruitProductionFirst(data) {
  return request({
    url: api.getRecruitProductionFirst,
    method: "post",
    data: data
  });
}

/*
  获取职位统计列表
*/
export function getJobStatistics(data) {
  return request({
    url: api.getJobStatistics,
    method: "post",
    data: data
  });
}
/*
  导出职位统计
*/
export function exportJobStatistics(data) {
  return request({
    url: api.exportJobStatistics,
    method: "post",
    responseType: 'blob',
    timeout: 120000,
    data: data
  });
}
/*
  导出招聘详情
*/
export function exportDemandStatisticsAll(data) {
  return request({
    url: api.exportDemandStatisticsAll,
    method: "post",
    responseType: 'blob',
    timeout: 120000,
    data: data
  });
}
/*
  获取候选人列表
*/
export function getCandidateStatistics(data) {
  return request({
    url: api.getCandidateStatistics,
    method: "post",
    data: data
  });
}
/*
  导出候选人列表
*/
export function exportCandidateStatistics(data) {
  return request({
    url: api.exportCandidateStatistics,
    method: "post",
    responseType: 'blob',
    timeout: 120000,
    data: data
  });
}
/*
  获取招聘人员列表
*/
export function getRecruitStatistics(data) {
  return request({
    url: api.getRecruitStatistics,
    method: "post",
    data: data,
    timeout: 0
  });
}
/*
  导出招聘人员列表
*/
export function exportRecruitStatistics(data) {
  return request({
    url: api.exportRecruitStatistics,
    method: "post",
    responseType: 'blob',
    timeout: 120000,
    data: data,
  });
}
/*
  获取部门满足列表
*/
export function getDepartmentSatisfaction(data) {
  return request({
    url: api.getDepartmentSatisfaction,
    method: "get",
    params: data
  });
}
/*
  导出部门满足
*/
export function exportDepartmentSatisfaction(params) {
  return request({
    url: api.exportDepartmentSatisfaction,
    method: "get",
    responseType: 'blob',
    timeout: 120000,
    params: params
  });
}

/*
  获取职位
*/
export function getPositionName(params) {
  return request({
    url: api.getPositionName,
    method: "get",
    params: params
  });
}
/*
  获取招聘专员
*/
export function getRecruitmentSpecialist(params) {
  return request({
    url: api.getRecruitmentSpecialist,
    method: "get",
    params: params
  });
}
/*
  导出招聘专员
*/
export function exportAffirmOffer(data) {
  return request({
    url: api.exportAffirmOffer,
    method: "post",
    responseType: 'blob',
    timeout: 120000,
    data: data
  });
}
/*
  获取面试官台账数据
*/
export function getInterviewrReport(data) {
  return request({
    url: api.getInterviewrReport,
    method: "post",
    data: data
  });
}
/*
  导出面试官台账数据
*/
export function exportInterviewrReport(data) {
  return request({
    url: api.exportInterviewrReport,
    method: "post",
    responseType: 'blob',
    timeout: 120000,
    data: data,
  });
}
/*
  获取部门接口
*/
export function getAllInfo(params) {
  return request({
    url: api.getAllInfo,
    method: "get",
    params: params,
  });
}
/*
  获取需求台账接口
*/
export function getDemandLedger(params) {
  return request({
    url: api.getDemandLedger,
    method: "post",
    data: params,
    timeout: 0
  });
}
/*
  导出需求台账接口
*/
export function exportDemandLedger(params) {
  return request({
    url: api.exportDemandLedger,
    method: "post",
    responseType: 'blob',
    timeout: 120000,
    data: params,
  });
}

//招聘人员产能姓名接口
export function getSysUsers(params) {
  return request({
    url:api.getSysUsers,
    method:'GET',
    params:params
  })
}

/*
  招聘进展统计表
*/
export function getRecruitProceed(params) {
  return request({
    url: api.getRecruitProceed,
    method: "post",
    data: params,
    timeout: 0
  });
}

/*
  导出招聘进展统计表
*/
export function exportRecruitProceed(params) {
  return request({
    url: api.exportRecruitProceed,
    method: "post",
    responseType: 'blob',
    timeout: 120000,
    data: params,
  });
}