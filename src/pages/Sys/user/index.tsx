import React, { useState, useRef } from "react";
import { useRequest } from 'umi';
import { Tag, Button, Popconfirm, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ProTable, { ProColumns, ActionType } from "@ant-design/pro-table";
import UserModalForm from "./UserModalForm";
import { RoleType} from "@/pages/Sys/role";
import { removeUser, pageUser } from "@/services/user";
import { listRole } from "@/services/role";

export type UserType = {
  id: number;
  username: string;
  name: string;
  // avatar: string;
  sex: number;
  phone: string;
  mail: string;
  locked: number;
  roleList: RoleType[];
}

const User: React.FC = () => {
  const [user, setUser] = useState<UserType>()
  const [visible, setVisible] = useState(false)
  const tableRef = useRef<ActionType>()
  const { data } = useRequest(listRole)

  const showUserForm = (user?: UserType) => {
    setUser(user)
    setVisible(true)
  }

  const columns: ProColumns<UserType>[] = [
    {
      // dataIndex: 'index',
      valueType: 'indexBorder',
      align: 'center'
      // width: 48,
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
      valueEnum: {
        0: '男',
        1: '女'
      }
    },
    {
      title: '角色',
      dataIndex: 'roleList',
      align: 'center',
      hideInSearch: true,
      render: roleList => roleList?.map(role => {
        return (
          <Tag key={role.id}>{role.name}</Tag>
        )
      })
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
        1: { text: '锁定', status: 'error' },
      }
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      render: (_, record) => [
        <a key="edit" onClick={() => showUserForm(record)}>编辑</a>,
        <Popconfirm
          key="delete"
          title={`确认删除${record.username}？`}
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
    <>
      <ProTable <UserType>
        actionRef={tableRef}
        columns={columns}
        request={params => pageUser(params)}
        rowKey="id"
        toolBarRender={() => [
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {showUserForm(undefined)}}
          >
            新建
          </Button>
        ]}
      />
      <UserModalForm
        user={user}
        roleList={data}
        visible={visible}
        onVisibleChange={setVisible}
        reload={tableRef.current?.reloadAndRest}
      />
    </>
  )
}

export default User
