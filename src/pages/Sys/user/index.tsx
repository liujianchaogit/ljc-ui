import React, { useState } from "react";
import { ManOutlined, PlusOutlined, WomanOutlined } from "@ant-design/icons";
import { Button, Menu } from "antd";
import type { ProColumns } from "@ant-design/pro-table";
import ProTable from "@ant-design/pro-table";
import { page } from "@/services/user";
import UserForm from "./UserForm";

export type User = {
  id: number;
  username: string;
  name: string;
  avatar: string;
  sex: number;
  phone: string;
  mail: string;
  locked: number;
};

const menu = (
  <Menu>
    <Menu.Item key="1">1st item</Menu.Item>
    <Menu.Item key="2">2nd item</Menu.Item>
    <Menu.Item key="3">3rd item</Menu.Item>
  </Menu>
);
export default () => {
  const [user, setUser] = useState<User>()
  const [ visible, setVisible] = useState(false)

  const showUserForm = (user: User | undefined) => {
    setUser(user)
    setVisible(true)
  }

  const columns: ProColumns<User>[] = [
    {
      // dataIndex: 'index',
      valueType: 'indexBorder',
      // width: 48,
    },
    {
      title: '用户名',
      dataIndex: 'username'
      // width: '30%',
    },
    {
      title: '姓名',
      dataIndex: 'name'
    },
    {
      title: '姓别',
      dataIndex: 'sex',
      valueEnum: {
        0: <ManOutlined style={{color: "red"}} />,
        1: <WomanOutlined style={{color: "blue"}} />
      }
    },
    {
      title: '电话',
      dataIndex: 'phone'
    },
    {
      title: '邮箱',
      dataIndex: 'mail'
    },
    {
      title: '状态',
      dataIndex: 'locked',
      valueEnum: {
        0: { text: '正常', status: 'success' },
        1: { text: '锁定', status: 'error' },
      }
    },
    {
      title: '操作',
      valueType: 'option',
      render: (_, record) => [
        <a key="editable" onClick={() => showUserForm(record)}>编辑</a>,
        <a key="delete">
          删除
        </a>,
        // <TableDropdown
        //   key="actionGroup"
        //   onSelect={() => action.reload()}
        //   menus={[
        //     { key: 'delete', name: '删除' },
        //   ]}
        // />,
      ],
    }
  ];
  return (
    <>
      <ProTable<User>
        columns={columns}
        // actionRef={actionRef}
        request={params => page(params)}
        // editable={{
        //   type: 'multiple',
        // }}
        rowKey="id"
        // search={{
        //   labelWidth: 'auto',
        // }}
        // form={{
        //   // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
        //   syncToUrl: (values, type) => {
        //     if (type === 'get') {
        //       return {
        //         ...values,
        //         created_at: [values.startTime, values.endTime],
        //       };
        //     }
        //     return values;
        //   },
        // }}
        // pagination={{
        //   pageSize: 5,
        // }}
        // dateFormatter="string"
        // headerTitle="高级表格"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => {showUserForm(undefined)}}
          >
            新建
          </Button>
        ]}
      />
      <UserForm user={user} visible={visible} onVisibleChange={setVisible} />
    </>
  );
};
