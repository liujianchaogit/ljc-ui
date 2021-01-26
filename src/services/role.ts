import { request } from 'umi';
import { RoleItem } from "@/pages/Sys/role";

export async function list() {
  return (await request<{ data: RoleItem[]}>('/role/list')).data
}
