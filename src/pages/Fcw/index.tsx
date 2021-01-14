import React, { useState, useEffect }  from 'react';
import { TabPaneProps } from 'antd/lib/tabs';
import useAntdMediaQuery from 'use-media-antd-query';
import { queryFcw } from '@/services/fcw'
import { Menu } from 'antd';
import style from './index.less'


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

  // const { run, loading } = useRequest((categories, page) => {
  //   return request('/fcw/page', { params: { categories, page } })
  // },{manual: true});

  const s  = () => {
    if (!loading) {
      const scr = document.documentElement.scrollTop || document.body.scrollTop // 向上滚动的那一部分高度
      const clientHeight = document.documentElement.clientHeight // 屏幕高度也就是当前设备静态下你所看到的视觉高度
      const scrHeight = document.documentElement.scrollHeight || document.body.scrollHeight // 整个网页的实际高度，兼容Pc端
      if (scr + clientHeight + 100 >= scrHeight) {
        // next()
      }
    }
  }

  const getData = async (key: string) => {
    setLoading(false)
    setData(await queryFcw(key))
    setPage(1)
    setActiveKey(key)
    setLoading(true)
  }

  const more = async () => {
    setLoading(false)
    setData(await queryFcw(activeKey, page + 1))
    setPage(page + 1)
    setLoading(true)
  }

  useEffect(() => {
    document.addEventListener('scroll', s)
    getData('27f8a5c9ce83cbfa7b70fc5c9a73a082')

  }, []);

  const colSize = useAntdMediaQuery();

  const isMobile = (colSize === 'sm' || colSize === 'xs');

  return (
    // <PageContainer
    //   loading={loading}
    //   tabList={fcwList}
    //   onTabChange={getPornList}
    //   tabActiveKey={activeKey}
    // >
    //   <div className={style.fd}>
    //     {
    //       pornList.map(p => {
    //         return (
    //           <div className={style.card} style={{width: isMobile ? '48%' : '18%'}} key={p.id}>
    //             <div>
    //               <img alt={p.id} src={p.img} />
    //             </div>
    //             <span>{p.title}</span>
    //           </div>
    //         )
    //       })
    //     }
    //   </div>
    //   <div style={{textAlign: 'center'}}>
    //     <span onClick={more} style={{cursor: 'pointer'}}>加载更多...</span>
    //   </div>
    // </PageContainer>
    <div className={style.fcw}>
      <div className={style.fcwContent}>
        <Menu
          theme={'dark'}
          mode={'horizontal'}
        >
          {
            fcwList.map(x => {
              return (
                <Menu.Item>
                  <span>{x.tab}</span>
                </Menu.Item>
              )
            })
          }
        </Menu>
        <div className={style.fd}>
          {
            data.map(p => {
              return (
                <div className={style.card} style={{ width: isMobile ? '48%' : '18%' }} key={p.id}>
                  <div>
                    <img alt={p.id} src={p.img} />
                  </div>
                  <span>{p.title}</span>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Fcw
