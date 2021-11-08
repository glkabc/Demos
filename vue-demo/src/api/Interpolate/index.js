import request from "@configs/request";

const api = {
  createIntroversionDemand: "job/createIntroversionDemand", // 添加内推需求
  getIntroversionDemandList: 'job/getIntroversionDemandList', // 查看内推项目
  internalRecommendResume: 'job/internalRecommendResume', // 推荐简历到内推
  uploadResume: 'job/uploadResume', // 上传
};

/*
  添加内推需求
*/
export function createIntroversionDemand(params) {
  return request({
    url: api.createIntroversionDemand,
    method: "post",
    data: params
  });
}
/*
  查看内推项目
*/
export function getIntroversionDemandList(params) {
  return request({
    url: api.getIntroversionDemandList,
    method: "post",
    data: params
  });
}
/*
  推荐简历到内推
*/
export function internalRecommendResume(params) {
  return request({
    url: api.internalRecommendResume,
    method: "post",
    data: params
  });
}

export const uploadResume = file => {
  const formData = new FormData();
  formData.append('file', file)
  return request.post(api.uploadResume, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
};