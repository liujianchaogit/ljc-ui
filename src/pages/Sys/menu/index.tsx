import React, { useRef, useState } from "react";
import { Button, Popconfirm, TreeSelect, Tag, InputNumber } from "antd";
import { DataNode } from "rc-tree-select/lib/interface";
import { PlusOutlined } from "@ant-design/icons";
import ProForm, { ModalForm, ProFormText, ProFormRadio } from "@ant-design/pro-form";
import ProTable, { ProColumns, ActionType } from "@ant-design/pro-table";
import { remove, list, saveOrUpdate } from "@/services/api";

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

  const showMenuModalForm = (menu?: MenuType) => {
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
        !menu.type &&
        <a key="add" onClick={() => showMenuModalForm({ pid: menu.id })}>新增</a>,
        <a key="edit" onClick={() => showMenuModalForm(menu)}>编辑</a>,
        <Popconfirm
          key="delete"
          title={`确认删除${menu.name}？`}
          onConfirm={async () => await remove('menu', menu.id, ref.current?.reloadAndRest)}
        >
          <a>删除</a>
        </Popconfirm>
      ]
    }
  ]

  return (
    <>
      <ProTable <MenuType, MenuType>
        bordered
        rowKey="id"
        search={false}
        actionRef={ref}
        columns={columns}
        pagination={false}
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
            onClick={() => showMenuModalForm()}
          >
            新建
          </Button>
        ]}
      />
      <ModalForm
        layout="inline"
        preserve={false}
        visible={visible}
        onVisibleChange={setVisible}
        title={menu ? '编辑菜单' : '新增菜单'}
        onFinish={menu => saveOrUpdate('menu', menu, ref.current?.reloadAndRest)}
      >
        <ProFormText
          hidden
          name="id"
          initialValue={menu?.id}
        />
        <ProForm.Item
          label="父菜单"
          name="pid"
          initialValue={menu?.pid || 0}
        >
          <TreeSelect treeDefaultExpandAll treeData={menus} />
        </ProForm.Item>
        <ProFormText
          label="菜单名"
          name="name"
          initialValue={menu?.name}
          rules={[{ required: true }]}
        />
        <ProFormText
          label="路径"
          name="path"
          initialValue={menu?.path}
        />
        <ProFormText
          label="图标"
          name="icon"
          initialValue={menu?.icon}
        />
        <ProFormText
          label="权限标识"
          name="permission"
          initialValue={menu?.permission}
        />
        <ProFormRadio.Group
          label="类型"
          name="type"
          radioType="button"
          initialValue={menu?.type}
          options={[{ label: '菜单', value: 0 }, { label: '权限', value: 1 }]}
        />
        <ProForm.Item
          label="排序"
          name="sort"
          initialValue={menu?.sort || 1}
        >
          <InputNumber min={1} max={999} />
        </ProForm.Item>
      </ModalForm>
    </>
  )
}

export default Menu
