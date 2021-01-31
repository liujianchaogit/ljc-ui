import { request } from 'umi';

export async function listMenuIds(roleId: number) {
  return await request< { data: number[] }>(`/menu/list/${roleId}`)
}
