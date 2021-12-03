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
  width: string
}> = ({tabList, index, type, width}) => {
  const [page, setPage] = useState(1)
  const [tabActiveKey, setTabActiveKey] = useState(tabList[index].key)

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  })

  const handleScroll = () => {
    let d = document.documentElement
    if (d.scrollHeight - d.scrollTop - d.clientHeight <= 100) if (!loadingMore) loadMore()
  }

  const { data, loading, loadMore, loadingMore } = useRequest({ url: `/${type}/page`, params: { category: tabActiveKey, page } }, {
    loadMore: true,
    refreshDeps: [tabActiveKey],
    onSuccess: () => { setPage(page + 1) },
    formatResult: (res: any) => { return { list: res.data } }
  })

  const play = async (id: string) => {
    const winHref = window.open('', '_blank')
    request(`/${type}/mp4`, { params: { id } }).then((r: any) => {
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
  }

  const colSize = useAntdMediaQuery()

  const isMobile = (colSize === 'sm' || colSize === 'xs')

  return (
    <PageContainer
      loading={loading}
      tabList={tabList}
      tabActiveKey={tabActiveKey}
      onTabChange={async key => {
        setPage(1)
        setTabActiveKey(key)
      }}
    >
      <div className={styles.fd}>
        {
          data?.list.map((d: any) => {
            return (
              <Card
                hoverable
                key={d.id}
                style={{ width: isMobile ? '100%' : width, marginBottom: '20px' }}
                cover={<img alt={d.id} src={d.img} height={'200px'} />}
                bodyStyle={{ padding: '12px' }}
                onClick={() => play(d.id)}
              >
                <div className={styles.title}>{d.title}</div>
                <div className={styles.fd}>
                  <Card.Meta avatar={<CalendarOutlined />} description={d.added} />
                  <Card.Meta avatar={<FieldTimeOutlined />} description={d.duration} />
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
