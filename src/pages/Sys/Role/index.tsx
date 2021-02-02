import React, { useState, useRef } from 'react';
import { request, useRequest } from 'umi';
import { Button, Popconfirm, Tree } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { DataNode } from 'rc-tree/lib/interface';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import ProForm, { ModalForm, ProFormText } from '@ant-design/pro-form';
import { MenuType } from '@/pages/Sys/Menu'
import { saveOrUpdate, remove, list, page } from '@/services/api';

export type RoleType = {
  id?: number;
  name?: string;
  code?: string;
  description?: string;
  menuIds?: number[];
}

const treeData = (menus?: MenuType[]) => menus?.map(menu => {
  const dataNode: DataNode = {
    key: menu.id || 0,
    title: menu.name,
    children: menu.children && treeData(menu.children)
  }
  return dataNode
})

const Role: React.FC = () => {
  const [role, setRole] = useState<RoleType>()
  const [visible, setVisible] = useState(false)
  const ref = useRef<ActionType>()
  const { data } = useRequest(() => list<MenuType>('menu'))

  const showModalForm = async (role?: RoleType) => {
    role && (role.menuIds = (await request<API.Response<number[]>>(`/menu/list/${role.id}`)).data)
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
        <a key="edit" onClick={() => showModalForm(role)}>编辑</a>,
        <Popconfirm
          key="delete"
          title={`确认删除：${role.name}？`}
          onConfirm={() => remove('role', role.id, ref.current?.reloadAndRest)}
        >
          <a>删除</a>
        </Popconfirm>
      ]
    }
  ]

  return (
    <PageContainer>
      <ProTable <RoleType, RoleType>
        bordered
        rowKey="id"
        actionRef={ref}
        columns={columns}
        request={role => page<RoleType>('role', role)}
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
        preserve={false}
        visible={visible}
        layout='horizontal'
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        onVisibleChange={setVisible}
        title={role ? '编辑角色' : '新增角色'}
        onFinish={role => {
          const { menuIds } = role
          if (menuIds && !Array.isArray(menuIds))
            role.menuIds = [ ...menuIds.checked, ...menuIds.halfChecked ]
          return saveOrUpdate('role', role, ref.current?.reloadAndRest)
        }}
      >
        <ProFormText
          hidden
          name="id"
          initialValue={role?.id}
        />
        <ProFormText
          name="name"
          label="角色名"
          initialValue={role?.name}
          rules={[{ required: true }]}
        />
        <ProFormText
          name="code"
          label="角色代码"
          initialValue={role?.code}
          rules={[{ required: true }]}
        />
        <ProFormText
          name="description"
          label="角色描述"
          initialValue={role?.description}
        />
        <ProForm.Item
          name="menuIds"
          label="菜单"
          trigger={'onCheck'}
          valuePropName="checkedKeys"
          initialValue={role?.menuIds}
        >
          <Tree
            checkable
            checkStrictly
            defaultExpandAll
            treeData={treeData(data)}
          />
        </ProForm.Item>
      </ModalForm>
    </PageContainer>
  )
}

export default Role
