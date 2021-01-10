import request from '@/utils/request'

export const uploadImg = (data: any) => {
  return request({
    method: 'POST',
    url: '/front/upload/img',
    data
  })
}
