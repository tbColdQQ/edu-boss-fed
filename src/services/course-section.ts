import request from '@/utils/request'

export const getSectionAndLesson = (courseId: string | number) => {
  return request({
    method: 'GET',
    url: '/boss/course/section/getSectionAndLesson',
    params: {
      courseId
    }
  })
}

export const saveOrUpdateSection = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/course/section/saveOrUpdateSection',
    data
  })
}

export const getSectionBySectionId = (sectionId: string | number) => {
  return request({
    method: 'GET',
    url: '/boss/course/section/getBySectionId',
    params: {
      sectionId
    }
  })
}

export const saveOrUpdateLession = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/course/lesson/saveOrUpdate',
    data
  })
}

export const getLessionByLessionId = (lessonId: string | number) => {
  return request({
    method: 'GET',
    url: '/boss/course/lesson/getById',
    params: {
      lessonId
    }
  })
}
