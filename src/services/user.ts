import { request } from 'umi';
import { RequestData } from "@ant-design/pro-table"
import { UserItem } from "@/pages/Sys/user"

export async function queryCurrent() {
  return (await request<{ data: API.CurrentUser }>('/user/info')).data
}

export async function page(params: any) {
  return await request<RequestData<UserItem>>('/user/page', { params })
}

export async function update(user: UserItem) {
  return await request('/user', {
    method: 'PUT',
    params: user
  })
}
