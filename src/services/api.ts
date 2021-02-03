import React from 'react'
import { request } from '@@/plugin-request/request'
import { message } from 'antd'
import { SortOrder } from 'antd/lib/table/interface'
import { RequestData } from '@ant-design/pro-table'
import { ParamsType } from '@ant-design/pro-provider'

export async function saveOrUpdate(type: string, params: ParamsType, refresh?: () => void) {
  const id: boolean = params.hasOwnProperty('id')
  const { success } = await request<API.Response>(`/${type}`, {
    method: id ? 'PUT' : 'POST',
    params
  })
  if(success) {
    message.success(`${id ? '更新' : '新增'}成功`)
    refresh?.()
  } else {
    message.error(`${id ? '更新' : '新增'}失败`)
  }
  return success
}

export async function remove(type: string, id?: number, refresh?: () => void) {
  const { success } = await request<API.Response>(`/${type}/${id}`, {
    method: 'DELETE'
  })
  if(success) {
    message.success('删除成功')
    refresh?.()
  } else {
    message.error('删除失败')
  }
  return success
}

export async function list<T extends ParamsType>(type: string) {
  return request<API.Response<T[]>>(`/${type}/list`)
}

export async function page<T extends ParamsType>(type: string, params: T & {
  pageSize?: number;
  current?: number;
  keyword?: string;
}, sort?: Record<string, SortOrder>, filter?: Record<string, React.ReactText[]>) {
  return request<Partial<RequestData<T>>>(`/${type}/page`, { params })
}
