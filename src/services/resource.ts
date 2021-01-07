import request from '@/utils/request'

export const getResourcePages = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/resource/getResourcePages',
    data
  })
}

export const getResourceDetail = (resourceId: string | number) => {
  return request({
    method: 'GET',
    url: `/boss/resource/${resourceId}`
  })
}

export const saveOrUpdate = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/resource/saveOrUpdate',
    data
  })
}

export const deleteResource = (resourceId: string | number) => {
  return request({
    method: 'DELETE',
    url: `/boss/resource/${resourceId}`
  })
}

export const getRoleResources = (roleId: string | number) => {
  return request({
    method: 'GET',
    url: '/boss/resource/getRoleResources',
    params: {
      roleId
    }
  })
}
