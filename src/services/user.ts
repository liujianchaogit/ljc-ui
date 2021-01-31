import { request } from 'umi';

export async function queryCurrent() {
  return (await request<{ data: API.CurrentUser }>('/user/info')).data
}
