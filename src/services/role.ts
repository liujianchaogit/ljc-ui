import { request } from 'umi';
import { RoleType } from "@/pages/Sys/role";

export async function listRole() {
  return (await request<{ data: RoleType[]}>('/role/list'))
}
