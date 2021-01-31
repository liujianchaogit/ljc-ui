import React from "react";
import ProForm, { ModalForm, ProFormText, ProFormRadio , ProFormSelect} from "@ant-design/pro-form";
import { UserType } from './'
import { RoleType } from '@/pages/Sys/role';
import { saveOrUpdate } from "@/services/api";

export interface UserModalFormProps {
  user?: UserType;
  roles?: RoleType[];
  visible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
  refresh?: () => void;
}

const UserModalForm: React.FC<UserModalFormProps> = ({ user, roles, visible, onVisibleChange, refresh }) => {
  return (
    <ModalForm
      layout='inline'
      preserve={false}
      visible={visible}
      onVisibleChange={onVisibleChange}
      title={user ? '编辑用户' : '新增用户'}
      onFinish={user => saveOrUpdate('user', user, refresh)}
    >
      <ProFormText
        hidden
        name="id"
        initialValue={user?.id}
      />
      <ProFormText
        label="用户名"
        name="username"
        initialValue={user?.username}
        disabled={user?.id !== undefined}
        rules={[{ required: user?.id === undefined }]}
      />
      <ProFormText
        label="姓名"
        name="name"
        initialValue={user?.name}
        rules={[{ required: true }]}
      />
      <ProFormText.Password
        label="密码"
        name="password"
        rules={[{ required: user?.id === undefined }]}
      />
      <ProFormText
        label="电话"
        name="phone"
        initialValue={user?.phone}
      />
      <ProFormText
        label="邮箱"
        name="mail"
        initialValue={user?.mail}
      />
      <ProFormRadio.Group
        label="性别"
        name="sex"
        initialValue={user?.sex || 0}
        options={[{ label: '男', value: 0 }, { label: '女', value: 1 }]}
      />
      <ProFormRadio.Group
        label="状态"
        name="locked"
        radioType="button"
        initialValue={user?.locked || 0}
        options={[{ label: '正常', value: 0 }, { label: '锁定', value: 1 }]}
      />
      <ProFormSelect
        label="角色"
        name="roleIds"
        mode="multiple"
        initialValue={user?.roles.map(role => role.id)}
        options={roles?.map(role => {
          return { label: role.name, value: role.id }
        })}
      />
    </ModalForm>
  )
}

export default UserModalForm
