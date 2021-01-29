import { request } from '@@/plugin-request/request';
import { RequestData } from '@ant-design/pro-table';

export async function saveOrUpdate<T extends Object>(type: string, params: T) {
  return await request(`/${type}`, { method: params.hasOwnProperty('id') ? 'POST' : 'PUT', params })
}

export async function remove(type: string, id: number) {
  return await request(`/${type}/${id}`, { method: 'DELETE' })
}

export async function list<T extends Object>(type: string) {
  return await request<{ data: T[]}>(`/${type}/list`)
}

export async function page<T>(type: string, params: any) {
  return await request<RequestData<T>>(`/${type}/page`, { params })
}
