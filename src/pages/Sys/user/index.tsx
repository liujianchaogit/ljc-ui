import React, { useState, useRef } from "react";
import { useRequest } from 'umi';
import { Tag, Button, Popconfirm } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ProTable, { ProColumns, ActionType } from "@ant-design/pro-table";
import UserModalForm from "./UserModalForm";
import { RoleType } from "@/pages/Sys/role";
import { remove, list, page } from "@/services/api";

export type UserType = {
  id: number;
  username: string;
  name: string;
  // avatar: string;
  sex: number;
  phone: string;
  mail: string;
  locked: number;
  roles: RoleType[];
}

const User: React.FC = () => {
  const [user, setUser] = useState<UserType>()
  const [visible, setVisible] = useState(false)
  const ref = useRef<ActionType>()
  const { data } = useRequest(() => list<RoleType>('role'))

  const showUserModalForm = (user?: UserType) => {
    setUser(user)
    setVisible(true)
  }

  const columns: ProColumns<UserType>[] = [
    {
      // dataIndex: 'index',
      valueType: 'indexBorder',
      align: 'center'
    },
    {
      title: '用户名',
      dataIndex: 'username',
      align: 'center'
    },
    {
      title: '姓名',
      dataIndex: 'name',
      align: 'center'
    },
    {
      title: '性别',
      dataIndex: 'sex',
      align: 'center',
      valueEnum: { 0: '男', 1: '女' }
    },
    {
      title: '角色',
      dataIndex: 'roles',
      align: 'center',
      hideInSearch: true,
      render: roles => (roles as RoleType[]).map(
        role => <Tag key={role.id}>{role.name}</Tag>
      )
    },
    {
      title: '电话',
      dataIndex: 'phone',
      align: 'center'
    },
    {
      title: '邮箱',
      dataIndex: 'mail',
      align: 'center'
    },
    {
      title: '状态',
      dataIndex: 'locked',
      align: 'center',
      valueEnum: {
        0: { text: '正常', status: 'success' },
        1: { text: '锁定', status: 'error' }
      }
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      render: (_, user) => [
        <a key="edit" onClick={() => showUserModalForm(user)}>编辑</a>,
        <Popconfirm
          key="delete"
          title={`确认删除${user.username}？`}
          onConfirm={async () => await remove('user', user.id, ref.current?.reloadAndRest)}
        >
          <a>删除</a>
        </Popconfirm>
      ]
    }
  ]

  return (
    <>
      <ProTable <UserType, UserType>
        rowKey="id"
        actionRef={ref}
        columns={columns}
        request={user => page<UserType>('user', user)}
        toolBarRender={() => [
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => showUserModalForm()}
          >
            新建
          </Button>
        ]}
      />
      <UserModalForm
        user={user}
        roles={data}
        visible={visible}
        onVisibleChange={setVisible}
        refresh={ref.current?.reloadAndRest}
      />
    </>
  )
}

export default User
