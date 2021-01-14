import { request } from 'umi';

export async function queryFcw(categories: string, page = 1) {
  return request('/fcw/page', {
    params: { categories, page }
  }).then(res => res.data);
}

export async function queryMp4(id: string) {
  return request('/fcw/mp4', {
    params: { id }
  }).then(res => res.data);
}
