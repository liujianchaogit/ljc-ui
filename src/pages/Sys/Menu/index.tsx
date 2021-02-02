import React, { useState, useRef } from 'react';
import { Button, Tag, Popconfirm, TreeSelect, InputNumber } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { DataNode } from 'rc-tree-select/lib/interface';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import ProForm, { ModalForm, ProFormText, ProFormRadio } from '@ant-design/pro-form';
import { saveOrUpdate, remove, list } from '@/services/api';

export type MenuType = {
  id?: number;
  pid?: number
  name?: string;
  path?: string;
  icon?: string;
  permission?: string;
  type?: number;
  sort?: number;
  children?: MenuType[]
}

const postData = (menus: MenuType[]) => menus.map(menu => {
  const dataNode: DataNode = {
    value: menu.id,
    title: menu.name,
    children: menu.children && postData(menu.children)
  }
  return dataNode
})

const Menu: React.FC = () => {
  const [menu, setMenu] = useState<MenuType>()
  const [menus, setMenus] = useState<DataNode[]>()
  const [visible, setVisible] = useState(false)
  const ref = useRef<ActionType>()

  const showModalForm = (menu?: MenuType) => {
    setMenu(menu)
    setVisible(true)
  }

  const columns: ProColumns<MenuType>[] = [
    {
      title: '菜单名',
      dataIndex: 'name'
    },
    {
      title: '路径',
      dataIndex: 'path'
    },
    {
      title: '图标',
      dataIndex: 'icon'
    },
    {
      title: '权限',
      dataIndex: 'permission'
    },
    {
      title: '类型',
      dataIndex: 'type',
      align: 'center',
      valueEnum: { 0: <Tag color="processing">菜单</Tag>, 1: <Tag color="error">权限</Tag> }
    },
    {
      title: '排序',
      dataIndex: 'sort'
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      render: (_, menu) => [
        !menu.type && <a key="add" onClick={() => showModalForm({ pid: menu.id })}>新增</a>,
        <a key="edit" onClick={() => showModalForm(menu)}>编辑</a>,
        <Popconfirm
          key="delete"
          title={`确认删除：${menu.name}？`}
          onConfirm={() => remove('menu', menu.id, ref.current?.reloadAndRest)}
        >
          <a>删除</a>
        </Popconfirm>
      ]
    }
  ]

  return (
    <PageContainer>
      <ProTable <MenuType, MenuType>
        bordered
        rowKey="id"
        search={false}
        actionRef={ref}
        columns={columns}
        pagination={false}
        tableStyle={{ marginBottom: 24 }}
        request={() => list<MenuType>('menu')}
        postData={menus => {
          setMenus([{
            value: 0,
            title: '根菜单',
            children: postData(menus)
          }])
          return menus
        }}
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
        layout="horizontal"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        onVisibleChange={setVisible}
        title={menu?.id ? '编辑菜单' : '新增菜单'}
        onFinish={menu => saveOrUpdate('menu', menu, ref.current?.reloadAndRest)}
      >
        <ProFormText
          hidden
          name="id"
          initialValue={menu?.id}
        />
        <ProForm.Item
          name="pid"
          label="父菜单"
          initialValue={menu?.pid || 0}
        >
          <TreeSelect treeData={menus} treeDefaultExpandAll />
        </ProForm.Item>
        <ProFormText
          name="name"
          label="菜单名"
          initialValue={menu?.name}
          rules={[{ required: true }]}
        />
        <ProFormText
          name="path"
          label="路径"
          initialValue={menu?.path}
        />
        <ProFormText
          name="icon"
          label="图标"
          initialValue={menu?.icon}
        />
        <ProFormText
          name="permission"
          label="权限标识"
          initialValue={menu?.permission}
        />
        <ProFormRadio.Group
          name="type"
          label="类型"
          radioType="button"
          initialValue={menu?.type || 0}
          options={[{ label: '菜单', value: 0 }, { label: '权限', value: 1 }]}
        />
        <ProForm.Item
          name="sort"
          label="排序"
          initialValue={menu?.sort || 1}
        >
          <InputNumber min={1} max={999} />
        </ProForm.Item>
      </ModalForm>
    </PageContainer>
  )
}

export default Menu
