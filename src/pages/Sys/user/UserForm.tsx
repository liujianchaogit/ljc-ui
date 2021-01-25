import React from "react";
import { message } from "antd";
import ProForm, { ModalForm, ProFormText } from "@ant-design/pro-form";

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};
export default ({ visible, onVisibleChange, user }) => {
  return (
    <ModalForm
      title={user ? '编辑用户' : '新增用户'}
      visible={visible}
      onVisibleChange={onVisibleChange}
      onFinish={async (values) => {
        await waitTime(2000);
        console.log(values);
        message.success('提交成功');
        return true
      }}
      preserve={false}
    >
      <ProForm.Group>
        <ProFormText
          initialValue={user?.username}
          width="md"
          name="username"
          label="签约客户名称"
          tooltip="最长为 24 位"
          placeholder="请输入名称"
        />
        <ProFormText initialValue={user?.id} width="md" name="phone" label="我方公司名称" placeholder="请输入名称" />
      </ProForm.Group>
    </ModalForm>
  );
};
