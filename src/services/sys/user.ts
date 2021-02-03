import { request } from 'umi'

export async function getUserInfo() {
  return request<API.Response<API.CurrentUser>>('/user/info')
}

export async function modifyPassword(params: { password: string }) {
  return request<API.Response<API.CurrentUser>>('/user/modifyPassword', {
    method: 'POST',
    params
  })
}
