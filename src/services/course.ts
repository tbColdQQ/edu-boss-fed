import request from '@/utils/request'

export const getQueryCourses = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/course/getQueryCourses',
    data
  })
}

export const saveOrUpdate = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/course/saveOrUpdateCourse',
    data
  })
}

export const getCourseById = (courseId: string | number) => {
  return request({
    method: 'GET',
    url: '/boss/course/getCourseById',
    params: {
      courseId
    }
  })
}

export const changeState = (params: any) => {
  return request({
    method: 'GET',
    url: '/boss/course/changeState',
    params
  })
}

export const uploadImg = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/course/upload',
    data
  })
}
