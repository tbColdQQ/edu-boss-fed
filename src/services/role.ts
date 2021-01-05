import request from '@/utils/request'

export const getRolePages = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/role/getRolePages',
    data
  })
}

export const deleteRole = (roleId: string | number) => {
  return request({
    method: 'DELETE',
    url: `/boss/role/${roleId}`
  })
}

export const getRoleDetail = (roleId: string | number) => {
  return request({
    method: 'GET',
    url: `/boss/role/${roleId}`
  })
}

export const saveOrUpdate = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/role/saveOrUpdate',
    data
  })
}
