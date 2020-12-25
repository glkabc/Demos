import request from '@configs/request';

export function qualityInfo() {
  return request({
    url: '/qualityscore/qualityinfo',
    method: 'get',
  });
}

export function tableDataSubmit(listQuery) {
  return request({
    url: '/qualityscore/saveJudgeScore',
    method: 'post',
    data: listQuery,
  });
}

export function previewData(listQuery) {
  return request({
    url: `/qualityscore/preview`,
    method: 'post',
    data: listQuery,
  });
}
export function getClassListInfo(listQuery) {
  return request({
    url: '/qualityscore/getClassListInfo',
    post  : 'get',
    data: listQuery,
  });
}
