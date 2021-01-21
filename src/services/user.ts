import { request } from 'umi';
import type { UserItem } from "@/pages/Sys/user"

export async function queryCurrent() {
  return request<{ data: API.CurrentUser }>('/user/info').then(res => res?.data);
}

export async function page(params) {
  return request<{ data: UserItem[], total: string }>('/user/page', {
    params: {
      current: params.current,
      size: params.pageSize
    }
  }).then(res => {
    return {
      data: res.data.records,
      total: res.data.total
    }
  });
}
