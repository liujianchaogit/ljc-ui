import React, {useEffect, useState} from 'react'
import { request, useRequest } from 'umi'
import { Card, Button } from 'antd'
import { CalendarOutlined, FieldTimeOutlined } from '@ant-design/icons'
import { PageContainer } from '@ant-design/pro-layout'
import type { TabPaneProps } from 'antd/lib/tabs'
import useAntdMediaQuery from 'use-media-antd-query'
import styles from './index.less'

const Porn: React.FC<{
  tabList: (TabPaneProps & { key?: string })[],
  index: number,
  type: string,
  html: (id: string) => string
}> = ({tabList, index, type, html }) => {
  const [page, setPage] = useState(1)
  const [tabActiveKey, setTabActiveKey] = useState(tabList[index].key)

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  })

  const handleScroll = () => {
    if (!loadingMore) {
      let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      let clientHeight = document.documentElement.clientHeight || document.body.clientHeight
      if (scrollHeight - scrollTop - clientHeight <= 100) loadMore()
    }
  }

  const { data, loading, loadMore, loadingMore } = useRequest({ url: `/${type}/page`, params: { category: tabActiveKey, page } }, {
    loadMore: true,
    refreshDeps: [tabActiveKey],
    onSuccess: () => { setPage(page + 1) },
    formatResult: (res: any) => { return { list: res.data } }
  })

  const play = async (id: string) => {
    const winHref = window.open('', '_blank')
    request(`/${type}/mp4`, { params: { id } }).then(r => {
      if (r.data && winHref) {
        setTimeout(() => {
          winHref.document.write(html(r.data))
        }, 100)
      } else {
        winHref?.close()
      }
    })
  }

  const colSize = useAntdMediaQuery()

  const isMobile = (colSize === 'sm' || colSize === 'xs')

  const getWidth = () => {
    switch (colSize) {
      case "xxl": return '16%'
      case "xl": return '16%'
      case "lg": return '24%'
      case "md": return '32%'
      case "sm": return '49%'
      case "xs": return '49%'
    }
  }
  return (
    <PageContainer
      fixedHeader
      loading={loading}
      tabList={tabList}
      tabActiveKey={tabActiveKey}
      onTabChange={async key => {
        setPage(1)
        setTabActiveKey(key)
      }}
    >
      <div className={styles.fd} style={{ margin: isMobile ? '-12px' : 0 }}>
        {
          data?.list.map((d: any) => {
            return (
              <Card
                hoverable
                key={d.id}
                bordered={false}
                style={{ width: getWidth(), marginBottom: isMobile ? '12px' : '20px' }}
                cover={<img alt={d.id} src={d.img} height={isMobile ? '100px' : '200px'} />}
                bodyStyle={{ padding: '12px' }}
                onClick={() => play(d.id)}
              >
                <div className={styles.title}>{d.title}</div>
                <div className={styles.fd} style={{ color: 'rgba(0, 0, 0, 0.5)' }}>
                  <div><FieldTimeOutlined style={{ marginRight: '5px' }} />{ d.duration }</div>
                  <div><CalendarOutlined style={{ marginRight: '5px' }} />{ d.added }</div>
                </div>
              </Card>
            )
          })
        }
      </div>
      <div style={{ textAlign: 'center' }}>
        <Button type="link" onClick={loadMore} loading={loadingMore}>{loadingMore ? '加载中...' : '加载更多...'}</Button>
      </div>
    </PageContainer>
  )
}

export default Porn
