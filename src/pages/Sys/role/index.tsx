import React, { useRef } from 'react';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { page } from "@/services/api"
import { message, Popconfirm } from 'antd';
import { removeUser } from '@/services/user';

export type RoleType = {
  id: number;
  name: string;
  code: string;
  description: string;
}

const Role: React.FC = () => {

  const tableRef = useRef<ActionType>()

  const columns: ProColumns<RoleType>[] = [
    {
      // dataIndex: 'index',
      valueType: 'indexBorder',
      align: 'center'
      // width: 48,
    },
    {
      title: '角色名',
      dataIndex: 'name',
      align: 'center'
    },
    {
      title: '代码',
      dataIndex: 'code',
      align: 'center'
    },
    {
      title: '描述',
      dataIndex: 'description',
      align: 'center'
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      render: (_, record) => [
        <a key="edit" onClick={() => console.log(record)}>编辑</a>,
        <Popconfirm
          key="delete"
          title={`确认删除${record.name}？`}
          onConfirm={async () => {
            await removeUser(record.id)
            message.success('删除成功');
            tableRef.current?.reloadAndRest && tableRef.current.reloadAndRest()
          }}
        >
          <a>删除</a>
        </Popconfirm>
      ]
    }
  ]

  return (
    <ProTable <RoleType>
      rowKey="id"
      request={params => page<RoleType>('role', params)}
      columns={columns}
    />
  )
}

export default Role
