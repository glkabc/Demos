// import fetch from '@/utils/fetch'
export function getInfo(listQuery = {}, is_statis = false) {
  let url = '/api/positions'
  if (is_statis) {
    url = '/api/position_statistics'
  }
  return fetch({
    url: url,
    method: 'get',
    params: {
      pageSize: listQuery.limit || 20,
      page: listQuery.page || 1,
      title: listQuery.title,
      sort: listQuery.sort,
      status: listQuery.status,
      importance: listQuery.importance,
      dep_id: listQuery.dep_id,
      city_id: listQuery.city_id,
      prov: listQuery.prov,
      position_type: listQuery.position_type,
      user_id: listQuery.user_id,
      daterange: listQuery.daterange,
      statisDate: listQuery.statisDate,
      xq_type: listQuery.xq_type,
      hr_id: listQuery.hr_id
    }
  })
}

export function getInfoById(id) {
  return fetch({
    url: '/api/positions/' + id,
    method: 'get'
  })
}
export function getOnePositionById(id) {
  return fetch({
    url: 'api/getOnePositions/' + id,
    method: 'get'
  })
}
// 获取职位操作记录
export function getJobOperateLog(position_id = '') {
    return fetch({
      url: 'api/positionLogs/' + position_id,
      method: 'get'
    })
  }

export function updateInfo(id, data) {
  return fetch({
    url: '/api/positions/' + id,
    method: 'put',
    data
  })
}

export function addInfo(data) {
  return fetch({
    url: '/api/positions',
    method: 'post',
    data
  })
}

export function deleteInfoById(id) {
  return fetch({
    url: '/api/positions/' + id,
    method: 'delete'
  })
}

export function deleteAll(params) {
  return fetch({
    url: '/api/positions/deleteAll',
    method: 'post',
    data: {
      ids: params
    }
  })
}

// 批量下线
export function offLineAll(params, real, fullNum, abnormalNum, comments) {
  return fetch({
    url: '/api/positions/offLineAll',
    method: 'post',
    data: {
      ids: params,
      real: real,
      fullNum: fullNum,
      abnormalNum: abnormalNum,
      comments: comments
    }
  })
}

// 批量上线
export function upLineAll(params) {
  return fetch({
    url: '/api/positions/upLineAll',
    method: 'post',
    data: {
      ids: params
    }
  })
}

export function uploadFile(data) {
  return fetch({
    url: '/api/positions/upload',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export function exportCurrentPage(listQuery = {}) {
  return fetch({
    url: '/api/positions/export',
    method: 'post',
    data: {
      pageSize: listQuery.limit || 20,
      page: listQuery.page || 1,
      title: listQuery.title,
      sort: listQuery.sort,
      status: listQuery.status,
      importance: listQuery.importance,
      dep_id: listQuery.dep_id,
      city_id: listQuery.city_id,
      position_type: listQuery.position_type,
      prov: listQuery.prov,
      daterange: listQuery.daterange,
      statisDate: listQuery.statisDate,
      xq_type: listQuery.xq_type
    }
  })
}

export function exportAll(listQuery = {}) {
  return fetch({
    url: '/api/positions/exportAll',
    method: 'post',
    data: {
      title: listQuery.title,
      sort: listQuery.sort,
      status: listQuery.status,
      importance: listQuery.importance,
      dep_id: listQuery.dep_id,
      city_id: listQuery.city_id,
      position_type: listQuery.position_type,
      prov: listQuery.prov,
      daterange: listQuery.daterange,
      statisDate: listQuery.statisDate,
      xq_type: listQuery.xq_type
    }
  })
}

export function Model(
  name = '',
  city = 1,
  jjcd = 1,
  num = 1,
  duty = 1,
  zj = '',
  status = 1,
  date1 = '',
  date2 = ''
) {
  this.name = name
  this.city = city
  this.jjcd = jjcd
  this.num = num
  this.duty = duty
  this.zj = zj
  this.status = status
  this.date1 = date1
  this.date2 = date2
}

// 分配专员

export function getAssignHr(data) {
  return fetch({

    url: '/api/assignHr',

    method: 'post',

    data: data

  })
}

export function toTop(id) {
  return fetch({
    url: '/api/positions/isTop',
    method: 'post',
    data: {
      id: id,
      is_top: 1
    }
  })
}

export function toNotTop(id) {
  return fetch({
    url: '/api/positions/isTop',
    method: 'post',
    data: {
      id: id,
      is_top: 0
    }
  })
}

export function getPositionRemarkList(params) {
  return fetch({
    url: '/api/positions/getPositionRemarkList',
    method: 'get',
    params: params
  })
}
export function savePositionRemark(params) {
  return fetch({
    url: '/api/positions/savePositionRemark',
    method: 'post',
    data: params
  })
}
export function mtnCooperator(params) {
  return fetch({
    url: '/api/mtnCooperator',
    method: 'post',
    data: params
  })
}
