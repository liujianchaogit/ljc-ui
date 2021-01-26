import React, { useState } from "react";
import { Button } from "antd";
import { ManOutlined, WomanOutlined, PlusOutlined } from "@ant-design/icons";
import ProTable, { ProColumns } from "@ant-design/pro-table";
import UserModalForm from "./UserModalForm";
import { RoleItem} from "@/pages/Sys/role";
import { page } from "@/services/user";

export type UserItem = {
  id: number;
  username: string;
  name: string;
  // avatar: string;
  sex: number;
  phone: string;
  mail: string;
  locked: number;
  roles: RoleItem[];
}

const User: React.FC = () => {
  const [user, setUser] = useState<UserItem>()
  const [ visible, setVisible] = useState(false)

  const showUserForm = (user?: UserItem) => {
    setUser(user)
    setVisible(true)
  }

  const columns: ProColumns<UserItem>[] = [
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
        0: <ManOutlined style={{color: "red"}} />,
        1: <WomanOutlined style={{color: "blue"}} />
      }
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
        <a key="delete">删除</a>
      ]
    }
  ]

  return (
    <>
      <ProTable <UserItem>
        columns={columns}
        request={params => page(params)}
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
      <UserModalForm user={user} visible={visible} onVisibleChange={setVisible} />
    </>
  )
}

export default User
