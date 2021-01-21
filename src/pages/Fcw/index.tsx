import React, { useState, useEffect }  from 'react';
import { TabPaneProps } from 'antd/lib/tabs';
import useAntdMediaQuery from 'use-media-antd-query';
import { queryFcw, queryMp4 } from '@/services/fcw'
import { Button, Menu, message, Spin } from "antd";
import styles from './index.less'


const fcwList: (TabPaneProps & {
  key?: React.ReactText;
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
  }
]

const Fcw: React.FC = () => {
  const [data, setData] = useState<{ id: string;title: string;img: string; }[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [activeKey, setActiveKey] = useState('27f8a5c9ce83cbfa7b70fc5c9a73a082');

  const getData = async ({ key }) => {
    setLoading(true)
    setActiveKey(key)
    try {
      setData(await queryFcw(key))
      setPage(1)
    } finally {
      setLoading(false)
    }
  }

  const more = async () => {
    setLoading(true)
    try {
      setData([...data, ...await queryFcw(activeKey, page + 1)])
      setPage(page + 1)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    console.log('init')
    getData({ key: "27f8a5c9ce83cbfa7b70fc5c9a73a082" })
    return
  }, []);

  const play = async (id: string) => {
    setLoading(true)
    queryMp4(id).then(res => {
      if (res)
        window.open(res)
      setLoading(false)
    })
  }

  const colSize = useAntdMediaQuery();

  const isMobile = (colSize === 'sm' || colSize === 'xs');

  return (
    <div className={styles.fcw}>
      <div className={styles.content}>
        <Menu
          theme={'dark'}
          mode={'horizontal'}
          selectedKeys={[activeKey]}
          onClick={getData}
        >
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
        <Spin spinning={loading}>
          <div className={styles.fd}>
            {
              data.map((p, index) => {
                return (
                  <div
                    onClick={() => play(p.id)}
                    className={styles.card} style={{ width: isMobile ? '48%' : '18%' }}
                    key={index}
                  >
                    <div>
                      <img alt={p.id} src={p.img} />
                    </div>
                    <span>{p.title}</span>
                  </div>
                )
              })
            }
            { !isMobile &&
              [...Array(5 - data.length % 5)].map((item, index) => {
                return (
                  <div style={{ width: isMobile ? '48%' : '18%' }} key={index}></div>
                )
              })
            }
          </div>
        </Spin>
        <div style={{textAlign: "center", margin: '30px 0'}}>
          <Button onClick={more}>点击加载更多...</Button>
        </div>
      </div>
    </div>
  )
}

export default Fcw
