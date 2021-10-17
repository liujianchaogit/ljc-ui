import { Alert, Card, Typography, Button } from 'antd'
import { FormattedMessage, useIntl, request } from 'umi'
import { PageContainer } from '@ant-design/pro-layout'
import React from 'react'
import styles from './Welcome.less'

const CodePreview: React.FC = ({ children }) => (
  <pre className={styles.pre}>
    <code>
      <Typography.Text copyable>{children}</Typography.Text>
    </code>
  </pre>
)

export default (): React.ReactNode => {
  const intl = useIntl()
  return (
    <PageContainer>
      <Card>
        <Button onClick={() => {
          request('/ljc-auth-server/oauth/token', {
            method: 'post',
            headers: {
              Authorization: 'Basic YXBwOmxqYw=='
            },
            params: {
              grant_type: 'password',
              username: 'admin',
              password: '1qaz2wsx'
            }
          })
        }}>登陆</Button>
        <Button onClick={() => {
          request('/ljc-product/product/category/listTree', {
            method: 'get'
          })
        }}>获取分类</Button>
        <Button onClick={() => {
          request('/ljc-search/elasticSearch/page', {
            method: 'get',
            params: {
              catalog3Id: 225
            }
          })
        }}>获取商品</Button>
        <Button onClick={() => {
          request('/ljc-cart/cart/add', {
            method: 'post',
            headers: {
              Authorization: 'Bearer imK1Xc9h73urE9TJt2yk2TyEdPM'
            },
            params: {
              skuId: 2,
              num: 2
            }
          })
        }}>加入购物车</Button>
        <Button onClick={() => {
          request('/ljc-cart/cart/list', {
            method: 'get',
            headers: {
              Authorization: 'Bearer imK1Xc9h73urE9TJt2yk2TyEdPM'
            }
          })
        }}>购物车</Button>
        <Button onClick={() => {
          request('/ljc-order/order/confirm', {
            method: 'get',
            headers: {
              Authorization: 'Bearer imK1Xc9h73urE9TJt2yk2TyEdPM'
            }
          })
        }}>去结算</Button>
        <CodePreview>yarn add @ant-design/pro-layout</CodePreview>
      </Card>
    </PageContainer>
  )
}
