import { request } from 'umi';
import type { UserItem } from "@/pages/Sys/user"

export async function queryCurrent() {
  return (await request<{ data: API.CurrentUser }>('/user/info')).data
}

export async function page(params: any) {
  return await request<{ data: UserItem[], total: number }>('/user/page', { params })
}
