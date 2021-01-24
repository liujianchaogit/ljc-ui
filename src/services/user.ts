import { request } from 'umi';
import { UserItem } from "@/pages/Sys/user"
import { RequestData } from "@ant-design/pro-table"

export async function queryCurrent() {
  return (await request<{ data: API.CurrentUser }>('/user/info')).data
}

export async function page(params: any) {
  return await request<RequestData<UserItem>>('/user/page', { params })
}
