import React from "react";
import { message } from "antd";
import ProForm, { ModalForm, ProFormText, ProFormRadio } from "@ant-design/pro-form";
import { UserItem } from './index'
import { update } from "@/services/user";

export interface UserModalFormProps {
  user?: UserItem;
  visible: boolean;
  onVisibleChange: (visible: boolean) => void;
}

const UserModalForm: React.FC<UserModalFormProps> = ({ user, visible, onVisibleChange }) => {
  return (
    <ModalForm
      title={user ? '编辑用户' : '新增用户'}
      visible={visible}
      onVisibleChange={onVisibleChange}
      onFinish={async (values) => {
        values.roleIds = []
        console.log(values);
        await update(values)
        message.success('提交成功');
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
        disabled
      />
      <ProFormText
        initialValue={user?.name}
        name="name"
        label="姓名"
        rules={[{ required: true }]}
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
        initialValue={user?.sex}
        name="sex"
        label="性别"
        options={[{label: '女', value: 0}, {label: '男', value: 1}]}
      />
      <ProFormRadio.Group
        radioType="button"
        initialValue={user?.locked}
        name="locked"
        options={[{label: '正常', value: 0}, {label: '锁定', value: 1}]}
      />
    </ModalForm>
  )
}

export default UserModalForm
