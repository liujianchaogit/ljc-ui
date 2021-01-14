import { request } from 'umi';

export async function queryFcw(categories: string, page = 1) {
  return request('/fcw/page', {
    params: { categories, page }
  }).then(res => res.data);
}
