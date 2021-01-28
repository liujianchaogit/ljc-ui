import React, { useState, useEffect } from "react";
import { Tag, Button } from "antd";
import { ManOutlined, WomanOutlined, PlusOutlined } from "@ant-design/icons";
import ProTable, { ProColumns } from "@ant-design/pro-table";
import UserModalForm from "./UserModalForm";
import { RoleType} from "@/pages/Sys/role";
import { remove, page } from "@/services/user";
import { list } from "@/services/role";

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
  const [roleList, setRoleList] = useState<RoleType[]>()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
      list().then(roleList => setRoleList(roleList))
    }, [])

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
        0: <ManOutlined style={{color: "red"}} />,
        1: <WomanOutlined style={{color: "blue"}} />
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
        <a key="delete" onClick={() => remove(record.id)}>删除</a>
      ]
    }
  ]

  return (
    <>
      <ProTable <UserType>
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
      <UserModalForm
        user={user}
        roleList={roleList}
        visible={visible}
        onVisibleChange={setVisible}
      />
    </>
  )
}

export default User
