import React, { useState, useRef } from "react";
import { request, useRequest, Link, Helmet } from "umi";
import { TabPaneProps } from "antd/lib/tabs";
import useAntdMediaQuery from "use-media-antd-query";
import {Button, Menu, Spin} from "antd";
import styles from "./index.less";

const fcwList: (TabPaneProps & {
  key?: React.ReactText;
})[] = [
  {
    tab: "日本有码",
    key: "c535ce35c36eb7fa67f39468157714f3"
  },
  {
    tab: "偷拍系列",
    key: "df166ea541c4cbd16166c73feea36117"
  },
  {
    tab: "VIP专区",
    key: "058ed3f9acd0842ef11c4b6a25ebdb5b"
  },
  {
    tab: "欧美",
    key: "9662210c07ecb7133502aeeb80347c3c"
  },
  {
    tab: "日本无码",
    key: "efc5f4716ea1e36b82dc5df866401ce7"
  },
  {
    tab: "成人动漫",
    key: "46480850549e28993fb49cefcb75f82a"
  },
  {
    tab: "国产自拍",
    key: "27f8a5c9ce83cbfa7b70fc5c9a73a082"
  },
  {
    tab: "韩国综合",
    key: "bd2c9c41dffe88e87f713b64b60cc966"
  }
];

const Fcw: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(1);
  const [playLoading, setPlayLoading] = useState(false);
  const [activeKey, setActiveKey] = useState("27f8a5c9ce83cbfa7b70fc5c9a73a082");

  const { data, loading, loadingMore } = useRequest({ url: '/fcw/page', params: { categories: activeKey, page }}, {
    loadMore: true,
    ref: containerRef,
    onSuccess: () => {setPage(page + 1)},
    formatResult: res => { return { list: res.data } },
    refreshDeps: [ activeKey ]
  });

  const play = async (id: string) => {
    setPlayLoading(true)
    try {
      const { data } = await request('/fcw/mp4', { params: { id } })
      data && window.open(data);
    } finally {
      setPlayLoading(false)
    }
  };

  const colSize = useAntdMediaQuery();

  const isMobile = (colSize === "sm" || colSize === "xs");

  return (
    <>
      <Helmet>
        <meta name="referrer" content="no-referrer" />
      </Helmet>
      <div className={styles.fcw} ref={containerRef}>
        <div className={styles.content}>
          <Menu
            theme={"dark"}
            mode={"horizontal"}
            selectedKeys={[activeKey]}
            onClick={async m => {
              setPage(1);
              setActiveKey(m.key as string);
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
                );
              })
            }
          </Menu>
          <Button onClick={() =>window.open('https://www.fcww33.com/get_file/1/0408d167b66867afcdc8fbf40bec82e6762a8eca13/59000/59053/59053.mp4')}>A</Button>
          <Button onClick={() =>window.open('https://www.fcww33.com/get_file/1/254832398923a9313ed4c553d774e288061fb06ac0/59000/59632/59632.mp4')}>B</Button>
          <Spin spinning={loading || playLoading}>
            <div className={styles.fd}>
              {
                data?.list.map((p, index) => {
                  return (
                    <div
                      onClick={() => play(p.id)}
                      className={styles.card} style={{ width: isMobile ? "48%" : "18%" }}
                      key={index}
                    >
                      <div>
                        <img alt={p.id} src={p.img} />
                      </div>
                      <span>{p.title}</span>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span>{p.duration}</span>
                        <span>{p.added}</span>
                      </div>
                    </div>
                  );
                })
              }
              {!isMobile &&
              [...Array(5 - data?.list.length % 5)].map((item, index) => {
                return (
                  <div style={{ width: isMobile ? "48%" : "18%" }} key={index}></div>
                );
              })
              }
            </div>
          </Spin>
          <Spin spinning={loadingMore}>
            <div style={{ height: 50, textAlign: "center" }}></div>
          </Spin>
        </div>
      </div>
    </>
  );
};

export default Fcw;
