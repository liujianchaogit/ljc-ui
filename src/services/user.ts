import { request } from 'umi';
import { RequestData } from "@ant-design/pro-table"
import { UserType } from "@/pages/Sys/user"

export async function queryCurrent() {
  return (await request<{ data: API.CurrentUser }>('/user/info')).data
}

export async function page(params: any) {
  return await request<RequestData<UserType>>('/user/page', { params })
}

export async function save(user: UserType) {
  return await request('/user', {
    method: 'POST',
    params: user
  })
}

export async function remove(id: number) {
  return await request(`/user/${id}`, { method: 'DELETE' })
}

export async function update(user: UserType) {
  return await request('/user', {
    method: 'PUT',
    params: user
  })
}
