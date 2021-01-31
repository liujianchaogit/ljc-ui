import React from "react";
import { Tree } from 'antd';
import ProForm, { ModalForm, ProFormText, ProFormSelect} from "@ant-design/pro-form";
import { RoleType } from './'
import { MenuType } from '@/pages/Sys/menu';
import { saveOrUpdate } from "@/services/api";

export interface RoleModalFormProps {
  role?: RoleType;
  menus?: MenuType[];
  visible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
  refresh?: () => void;
}

const RoleModalForm: React.FC<RoleModalFormProps> = ({ role, menus, visible, onVisibleChange, refresh }) => {
  return (
    <ModalForm
      layout='inline'
      preserve={false}
      visible={visible}
      onVisibleChange={onVisibleChange}
      title={role ? '编辑角色' : '新增角色'}
      onFinish={role => saveOrUpdate('role', role, refresh)}
    >
      <ProFormText
        hidden
        name="id"
        initialValue={role?.id}
      />
      <ProFormText
        label="角色名"
        name="name"
        initialValue={role?.name}
        rules={[{ required: true }]}
      />
      <ProFormText
        label="角色代码"
        name="code"
        initialValue={role?.code}
        rules={[{ required: true }]}
      />
      <ProFormText
        label="角色描述"
        name="description"
        initialValue={role?.description}
      />
      <Tree
        checkable
        defaultExpandAll
        defaultCheckedKeys={role?.menuIds}
        treeData={menus as any}
      />
    </ModalForm>
  )
}

export default RoleModalForm
