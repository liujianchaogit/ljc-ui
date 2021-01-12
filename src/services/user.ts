import { request } from 'umi';

export async function queryCurrent() {
  return request<{ data: API.CurrentUser }>('/user/info').then(
    (res) => res?.data,
  );
}
