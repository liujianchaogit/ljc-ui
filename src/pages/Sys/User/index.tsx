import React, { useState, useRef } from 'react';
import { useRequest } from 'umi';
import { Button, Tag, Popconfirm } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormRadio , ProFormSelect } from '@ant-design/pro-form';
import { RoleType } from '@/pages/Sys/Role';
import { saveOrUpdate, remove, list, page } from '@/services/api';

export type UserType = {
  id?: number;
  username?: string;
  name?: string;
  // avatar: string;
  sex?: number;
  phone?: string;
  mail?: string;
  locked?: number;
  roles?: RoleType[];
}

const User: React.FC = () => {
  const [user, setUser] = useState<UserType>()
  const [visible, setVisible] = useState(false)
  const ref = useRef<ActionType>()
  const { data } = useRequest(() => list<RoleType>('role'))

  const showModalForm = (user?: UserType) => {
    setUser(user)
    setVisible(true)
  }

  const columns: ProColumns<UserType>[] = [
    {
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
        <a key="edit" onClick={() => showModalForm(user)}>编辑</a>,
        <Popconfirm
          key="delete"
          title={`确认删除：${user.username}？`}
          onConfirm={() => remove('user', user.id, ref.current?.reloadAndRest)}
        >
          <a>删除</a>
        </Popconfirm>
      ]
    }
  ]

  return (
    <PageContainer>
      <ProTable <UserType, UserType>
        bordered
        rowKey="id"
        actionRef={ref}
        columns={columns}
        request={user => page<UserType>('user', user)}
        toolBarRender={() => [
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => showModalForm()}
          >
            新建
          </Button>
        ]}
      />
      <ModalForm
        hideRequiredMark
        preserve={false}
        visible={visible}
        layout='horizontal'
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        onVisibleChange={setVisible}
        title={user ? '编辑用户' : '新增用户'}
        onFinish={user => saveOrUpdate('user', user, ref.current?.reloadAndRest)}
      >
        <ProFormText
          hidden
          name="id"
          initialValue={user?.id}
        />
        <ProFormText
          name="username"
          label="用户名"
          initialValue={user?.username}
          disabled={user?.id !== undefined}
          rules={[{ required: user?.id === undefined }]}
        />
        <ProFormText
          name="name"
          label="姓名"
          initialValue={user?.name}
          rules={[{ required: true }]}
        />
        <ProFormText.Password
          name="password"
          label="密码"
          rules={[{ required: user?.id === undefined }]}
        />
        <ProFormText
          name="phone"
          label="电话"
          initialValue={user?.phone}
        />
        <ProFormText
          name="mail"
          label="邮箱"
          initialValue={user?.mail}
        />
        <ProFormRadio.Group
          name="sex"
          label="性别"
          initialValue={user?.sex || 0}
          options={[{ label: '男', value: 0 }, { label: '女', value: 1 }]}
        />
        <ProFormRadio.Group
          name="locked"
          label="状态"
          radioType="button"
          initialValue={user?.locked || 0}
          options={[{ label: '正常', value: 0 }, { label: '锁定', value: 1 }]}
        />
        <ProFormSelect
          name="roleIds"
          label="角色"
          mode="multiple"
          initialValue={user?.roles?.map(role => role.id)}
          options={data?.map(role => {
            return { label: role.name, value: role.id }
          })}
        />
      </ModalForm>
    </PageContainer>
  )
}

export default User
