import React, { useState } from 'react'
import { Table, Tree, Row, Col } from 'antd';
import { useRequest } from 'umi'
import { ColumnFilterItem } from "antd/lib/table/interface";

const filters: ColumnFilterItem[] = [
  {
    text: '是',
    value: 1,
  },
  {
    text: '否',
    value: 0,
  }
]

const Sgs: React.FC = () => {

  const [dataSource, setDataSource] = useState()
  const { data, loading } = useRequest('/sgs/listSgs', { onSuccess: setDataSource })
  const { data: treeData } = useRequest('/sgs/listCategory')
  return (
    <Row gutter={24}>
      <Col span={5}>
        { treeData &&
        <Tree
            style={{padding: 17}}
            defaultExpandedKeys={[5, 6, 7]}
            treeData={[{key: 0, title: '全部', children: treeData}]}
            height={(document.documentElement.clientHeight || document.body.clientHeight) - 96 - 34}
            onSelect={(_, { node }) => {
              if (node.key) {
                setDataSource(data?.filter((d: any) =>
                  node.parentId ? d.catSub == node.key : d.cat == node.key))
              } else {
                setDataSource(data)
              }
            }}
        />
        }
      </Col>
      <Col span={19}>
        <Table
          style={{background: 'white', padding: ' 17px 17px 0'}}
          bordered
          size="middle"
          rowKey="name"
          loading={loading}
          tableLayout="fixed"
          dataSource={dataSource}
          pagination={{
            defaultPageSize: 15,
            showSizeChanger: true,
            showTotal: (total: number, range: [number, number]) => `第 ${range[0]}-${range[1]} 条/总共 ${total} 条`,
            pageSizeOptions: ['10' , '15' , '20' , '50']
          }}
          columns={[
            {
              title: '名字',
              dataIndex: 'name',
              align: 'center'
            },
            {
              title: '包',
              align: 'center',
              render: (_, record) => `${record.catName}-${record.catSubName}`
            },
            {
              title: '获得方式',
              children: [
                {
                  title: '将星',
                  dataIndex: 'getJx',
                  align: 'center',
                  filters,
                  render: value => value == 1 ? '是' : '否',
                  onFilter: (value, record) => record.getJx == value,
                },
                {
                  title: '祈福',
                  dataIndex: 'getQf',
                  align: 'center',
                  filters,
                  render: value => value == 1 ? '是' : '否',
                  onFilter: (value, record) => record.getQf == value,
                },
                {
                  title: '元宝',
                  dataIndex: 'getYb',
                  align: 'center',
                  filters,
                  render: value => value == 1 ? '是' : '否',
                  onFilter: (value, record) => record.getYb == value,
                },
                {
                  title: '开箱',
                  dataIndex: 'getOpen',
                  align: 'center',
                  filters,
                  render: value => value == 1 ? '是' : '否',
                  onFilter: (value, record) => record.getOpen == value,
                },
              ]
            },
            {
              title: '消耗数量',
              children: [
                {
                  title: '将符',
                  dataIndex: 'priceJf',
                  align: 'center',
                  sorter: (a, b) => a.priceJf - b.priceJf
                },
                {
                  title: '元宝',
                  dataIndex: 'priceYb',
                  align: 'center',
                  sorter: (a, b) => a.priceYb - b.priceYb,
                },
                {
                  title: '开箱',
                  dataIndex: 'priceOpen',
                  align: 'center',
                  sorter: (a, b) => a.priceOpen - b.priceOpen,
                },
              ]
            },
            {
              title: '拥有',
              dataIndex: 'has',
              align: 'center',
              filters,
              render: value => value == 1 ? '是' : '否',
              onFilter: (value, record) => record.has == value,
            }
            ]}
        />
      </Col>
    </Row>
  )
}

export default Sgs
