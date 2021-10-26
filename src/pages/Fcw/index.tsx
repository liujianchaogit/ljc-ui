import { CalendarOutlined, FieldTimeOutlined } from '@ant-design/icons'
import { Helmet, Link, request, useRequest } from 'umi'
import { Menu, Spin } from 'antd'
import React, { useRef, useState } from 'react'
import type { TabPaneProps } from 'antd/lib/tabs'
import styles from './index.less'
import useAntdMediaQuery from 'use-media-antd-query'

const fcwList: (TabPaneProps & {
  key?: React.ReactText
})[] = [
  {
    tab: '日本有码',
    key: 'c535ce35c36eb7fa67f39468157714f3'
  },
  {
    tab: '偷拍系列',
    key: 'df166ea541c4cbd16166c73feea36117'
  },
  {
    tab: 'VIP专区',
    key: '058ed3f9acd0842ef11c4b6a25ebdb5b'
  },
  {
    tab: '欧美',
    key: '9662210c07ecb7133502aeeb80347c3c'
  },
  {
    tab: '日本无码',
    key: 'efc5f4716ea1e36b82dc5df866401ce7'
  },
  {
    tab: '成人动漫',
    key: '46480850549e28993fb49cefcb75f82a'
  },
  {
    tab: '国产自拍',
    key: '27f8a5c9ce83cbfa7b70fc5c9a73a082'
  },
  {
    tab: '韩国综合',
    key: 'bd2c9c41dffe88e87f713b64b60cc966'
  }
]

const Fcw: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [page, setPage] = useState(1)
  const [playLoading, setPlayLoading] = useState(false)
  const [activeKey, setActiveKey] = useState('27f8a5c9ce83cbfa7b70fc5c9a73a082')

  const { data, loading, loadingMore } = useRequest({ url: '/fcw/page', params: { categories: activeKey, page } }, {
    loadMore: true,
    ref: containerRef,
    onSuccess: () => { setPage(page + 1) },
    formatResult: (res: any) => { return { list: res.data } },
    refreshDeps: [activeKey]
  })

  const play = async (id: string) => {
    setPlayLoading(true)
    try {
      const winHref = window.open('', '_blank')
      request('/fcw/mp4', { params: { id } }).then((r: any) => {
        if (r.data && winHref) {
          setTimeout(() => {
            winHref.document.write(`<body style="background: black; margin: 0">
                     <iframe src='${r.data}' width='100%' height='100%' frameborder></iframe>
                  </body>`)
          }, 100)
        } else {
          winHref?.close()
        }
      })
    } finally {
      setPlayLoading(false)
    }
  }

  const colSize = useAntdMediaQuery()

  const isMobile = (colSize === 'sm' || colSize === 'xs')

  return (
    <>
      <Helmet>
        <meta name="referrer" content="no-referrer" />
      </Helmet>
      <div className={styles.fcw} ref={containerRef}>
        <div className={styles.content}>
          <Menu
            theme={'dark'}
            mode={'horizontal'}
            selectedKeys={[activeKey]}
            onClick={async m => {
              setPage(1)
              setActiveKey(m.key as string)
            }}
          >
            <Menu.Item>
              <Link to="/">LJC Design</Link>
            </Menu.Item>
            {
              fcwList.map(x => {
                return (
                  <Menu.Item key={x.key}>
                    <span>{x.tab}</span>
                  </Menu.Item>
                )
              })
            }
          </Menu>
          <Spin spinning={loading || playLoading}>
            <div className={styles.fd}>
              {
                data?.list.map((p: any) => {
                  return (
                    <div
                      onClick={() => play(p.id)}
                      className={styles.card} style={{ width: isMobile ? '48%' : '19%' }}
                      key={p.id}
                    >
                      <img alt={p.id} src={p.img} />
                      <div style={{ padding: '10px' }}>
                        <span className={styles.title}>{p.title}</span>
                        <div className={styles.desc} >
                          <span><FieldTimeOutlined /> {p.duration}</span>
                          <span><CalendarOutlined /> {p.added}</span>
                        </div>
                      </div>
                    </div>
                  )
                })
              }
              {!isMobile && [...Array(5 - data?.list.length % 5)].map(item => {
                return (
                  <div style={{ width: isMobile ? '48%' : '18%' }} key={item} />
                )
              })
              }
            </div>
          </Spin>
          <Spin spinning={loadingMore}>
            <div style={{ height: 50, textAlign: 'center' }} />
          </Spin>
        </div>
      </div>
    </>
  )
}

export default Fcw
