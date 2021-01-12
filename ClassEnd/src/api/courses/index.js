import request from "@configs/request";

export function addCourse(listQuery = {}) {
  console.log('wozu ')
    // const auth = localStorage.getItem('auth');
    // console.log(auth.token)
    return request({
      url: '/course/addCourse',
      method: 'post',
    //   beforeSend: function(request) {
    //     request.setRequestHeader("Authorization", auth.token);
    // },
      data: listQuery
    })
  };
  export function uploadFile(listQuery = {}, cancelToken) {
    return request({
      url:'/uploadFile',
      method:'post',
      headers:{
        'Content-Type':'multipart/form-data'
      },
      data:listQuery,
      cancelToken
    })
  }
 export function   getCourseList(listQuery = {}) {
    return request({
      url:'/course/getCourseList',
      method:'post',
      data:listQuery
    })
  }
  
  export function  updateCourse(listQuery = {}) {
    return request({
      url:'/course/updateCourse',
      method:'post',
      data:listQuery
    })
  }