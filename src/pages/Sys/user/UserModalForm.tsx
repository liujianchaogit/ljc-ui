import React from "react";
import { message } from "antd";
import ProForm, { ModalForm, ProFormText, ProFormRadio , ProFormSelect} from "@ant-design/pro-form";
import { UserType } from './'
import { RoleType } from '@/pages/Sys/role';
import { saveUser, updateUser } from "@/services/user";

export interface UserModalFormProps {
  user?: UserType;
  roleList?: RoleType[];
  visible: boolean;
  onVisibleChange: (visible: boolean) => void;
  reload?: () => void;
}

const UserModalForm: React.FC<UserModalFormProps> = ({ user, roleList, visible, onVisibleChange, reload }) => {
  return (
    <ModalForm
      title={user ? '编辑用户' : '新增用户'}
      visible={visible}
      onVisibleChange={onVisibleChange}
      onFinish={async (values) => {
        values.id ? await updateUser(values) : await saveUser(values)
        message.success('更新成功');
        reload && reload()
        return true
      }}
      layout='inline'
      preserve={false}
    >
      <ProFormText initialValue={user?.id} name="id" hidden />
      <ProFormText
        initialValue={user?.username}
        name="username"
        label="用户名"
        disabled={user?.id !== undefined}
        rules={[{ required: user?.id === undefined }]}
      />
      <ProFormText
        initialValue={user?.name}
        name="name"
        label="姓名"
        rules={[{ required: true }]}
      />
      <ProFormText
        // initialValue={user?.name}
        name="password"
        label="密码"
        rules={[{ required: user?.id === undefined }]}
      />
      <ProFormText
        initialValue={user?.phone}
        name="phone"
        label="电话"
      />
      <ProFormText
        initialValue={user?.mail}
        name="mail"
        label="邮箱"
      />
      <ProFormRadio.Group
        initialValue={user?.sex || 0}
        name="sex"
        label="性别"
        options={[{label: '男', value: 0}, {label: '女', value: 1}]}
      />
      <ProFormRadio.Group
        radioType="button"
        initialValue={user?.locked || 0}
        name="locked"
        options={[{label: '正常', value: 0}, {label: '锁定', value: 1}]}
      />
      <ProFormSelect
        initialValue={user?.roleList.map(role => role.id)}
        mode="multiple"
        label="角色"
        name="roleIds"
        options={roleList?.map(role => {
          return {
            label: role.name,
            value: role.id
          }
        })}
      />
    </ModalForm>
  )
}

export default UserModalForm
