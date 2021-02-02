import React from 'react'
import { useModel, useRequest } from 'umi'
import { Button, Form, Input, message, Select, Upload, Avatar } from 'antd'
import { UserOutlined, UploadOutlined } from '@ant-design/icons'
import GeographicView from './GeographicView'
import PhoneView from './PhoneView'
import styles from './BaseView.less'

const AvatarView = ({ avatar }: { avatar?: string }) => (
  <>
    <div className={styles.avatar_title}>头像</div>
    <div className={styles.avatar}>
      {avatar ? <img src={avatar} alt="avatar" /> : <Avatar size={144} icon={<UserOutlined />} />}
    </div>
    <Upload showUploadList={false}>
      <div className={styles.button_view}>
        <Button>
          <UploadOutlined />更换头像
        </Button>
      </div>
    </Upload>
  </>
)

const validatorPhone = (rule: any, value: string, callback: (message?: string) => void) => {
  const values = value.split('-')
  if (!values[0]) {
    callback('Please input your area code!')
  }
  if (!values[1]) {
    callback('Please input your phone number!')
  }
  callback()
}

const BaseView: React.FC = () => {
  const { initialState } = useModel('@@initialState')
  const { loading, run } = useRequest(userInfo => ({
    url: '/user/info',
    method: 'PUT',
    params: userInfo,
  }), { manual: true })

  if (!initialState) {
    return <div>loading</div>
  }
  const { currentUser } = initialState

  return (
    <div className={styles.baseView}>
      <div className={styles.left}>
        <Form
          layout="vertical"
          onFinish={async r => {
            await run(r)
            message.success('更新基本信息成功')
          }}
          initialValues={currentUser}
          hideRequiredMark
        >
          <Form.Item
            name="mail"
            label="邮箱"
            rules={[{ required: true, message: '请输入您的邮箱!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="name"
            label="昵称"
            rules={[{ required: true, message: '请输入您的昵称!' } ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="profile"
            label="个人简介"
          >
            <Input.TextArea placeholder="个人简介" rows={4} />
          </Form.Item>
          <Form.Item
            name="country"
            label="国家/地区"
            initialValue="china"
          >
            <Select style={{ maxWidth: 220 }}>
              <Select.Option value="china">中国</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="geographic"
            label="所在省市"
          >
            <GeographicView />
          </Form.Item>
          <Form.Item
            name="address"
            label="地址"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="联系电话"
            rules={[
              {
                required: true,
                message: '请输入您的联系电话!'
              },
              { validator: validatorPhone }
            ]}
          >
            <PhoneView />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary" loading={loading}>
              更新基本信息
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className={styles.right}>
        <AvatarView avatar={currentUser?.avatar} />
      </div>
    </div>
  )
}

export default BaseView
