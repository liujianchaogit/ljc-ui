import React, { useRef, useState } from "react";
import { useRequest } from 'umi';
import { Button, Popconfirm } from 'antd';
import { PlusOutlined } from "@ant-design/icons";
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import RoleModalForm from './RoleModalForm';
import { MenuType } from '@/pages/Sys/menu'
import { remove, list, page } from "@/services/api";
import { listMenuIds } from "@/services/menu";

export type RoleType = {
  id: number;
  name: string;
  code: string;
  description: string;
  menuIds?: number[];
}

const Role: React.FC = () => {
  const [role, setRole] = useState<RoleType>()
  const [visible, setVisible] = useState(false)
  const ref = useRef<ActionType>()
  const { data } = useRequest(() => list<MenuType>('menu'))
  const { data: menuIds, run } = useRequest(listMenuIds, { manual: true })

  const showRoleForm = async (role?: RoleType) => {
    role && (role.menuIds = (await listMenuIds(role.id)).data)
    setRole(role)
    setVisible(true)
  }

  const columns: ProColumns<RoleType>[] = [
    {
      valueType: 'indexBorder',
      align: 'center'
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
      render: (_, role) => [
        <a key="edit" onClick={() => showRoleForm(role)}>编辑</a>,
        <Popconfirm
          key="delete"
          title={`确认删除${role.name}？`}
          onConfirm={async () => await remove('role', role.id, ref.current?.reloadAndRest)}
        >
          <a>删除</a>
        </Popconfirm>
      ]
    }
  ]

  return (
    <>
      <ProTable <RoleType, RoleType>
        rowKey="id"
        actionRef={ref}
        columns={columns}
        request={role => page<RoleType>('role', role)}
        toolBarRender={() => [
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => showRoleForm()}
          >
            新建
          </Button>
        ]}
      />
      <RoleModalForm
        role={role}
        menus={data?.map(m => {
          m.key = m.id
          m.title = m.name
          return m
        })}
        visible={visible}
        onVisibleChange={setVisible}
        refresh={ref.current?.reloadAndRest}
      />
    </>
  )
}

export default Role
