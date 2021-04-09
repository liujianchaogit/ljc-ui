import React, { useState, useRef, useLayoutEffect } from 'react'
import { FormattedMessage } from 'umi'
import { Menu } from 'antd'
import { GridContent } from '@ant-design/pro-layout'
import BaseView from './components/base'
import BindingView from './components/binding'
import NotificationView from './components/notification'
import SecurityView from './components/security'
import styles from './style.less'

type PAGE_NAME_UPPER_CAMEL_CASEStateKeys = 'base' | 'security' | 'binding' | 'notification'

interface PAGE_NAME_UPPER_CAMEL_CASEState {
  mode: 'inline' | 'horizontal'
  selectKey: PAGE_NAME_UPPER_CAMEL_CASEStateKeys
}

const menuMap: { [key: string]: React.ReactNode } = {
  base: <FormattedMessage id="app.settings.menuMap.basic" defaultMessage="基本设置" />,
  security: <FormattedMessage id="app.settings.menuMap.security" defaultMessage="安全设置" />,
  binding: <FormattedMessage id="app.settings.menuMap.binding" defaultMessage="账号绑定" />,
  notification: <FormattedMessage id="app.settings.menuMap.notification" defaultMessage="新消息通知" />
}

const getMenu = () => Object.keys(menuMap).map(item => <Menu.Item key={item}>{menuMap[item]}</Menu.Item>)

const PAGE_NAME_UPPER_CAMEL_CASE: React.FC = () => {
  const [initConfig, setInitConfig] = useState<PAGE_NAME_UPPER_CAMEL_CASEState>({
    mode: 'inline',
    selectKey: 'base'
  })
  const dom = useRef<HTMLDivElement>()

  const resize = () => {
    requestAnimationFrame(() => {
      if (!dom.current) {
        return
      }
      let mode: 'inline' | 'horizontal' = 'inline'
      const { offsetWidth } = dom.current
      if (dom.current.offsetWidth < 641 && offsetWidth > 400) {
        mode = 'horizontal'
      }
      if (window.innerWidth < 768 && offsetWidth > 400) {
        mode = 'horizontal'
      }
      setInitConfig(
        Object.assign({}, initConfig, { mode: mode as PAGE_NAME_UPPER_CAMEL_CASEState['mode'] })
      )
    })
  }

  useLayoutEffect(() => {
    if (dom.current) {
      window.addEventListener('resize', resize)
      resize()
    }
    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [dom.current])

  const renderChildren = () => {
    const { selectKey } = initConfig
    switch (selectKey) {
      case 'base':
        return <BaseView />
      case 'security':
        return <SecurityView />
      case 'binding':
        return <BindingView />
      case 'notification':
        return <NotificationView />
      default:
        return null
    }
  }

  return (
    <GridContent>
      <div className={styles.main} ref={ref => ref && (dom.current = ref)}>
        <div className={styles.leftMenu}>
          <Menu
            mode={initConfig.mode}
            selectedKeys={[initConfig.selectKey]}
            onClick={({ key }) => {
              setInitConfig(Object.assign({}, initConfig, {
                selectKey: key as PAGE_NAME_UPPER_CAMEL_CASEStateKeys
              }))
            }}
          >
            {getMenu()}
          </Menu>
        </div>
        <div className={styles.right}>
          <div className={styles.title}>{menuMap[initConfig.selectKey]}</div>
          {renderChildren()}
        </div>
      </div>
    </GridContent>
  )
}

export default PAGE_NAME_UPPER_CAMEL_CASE
