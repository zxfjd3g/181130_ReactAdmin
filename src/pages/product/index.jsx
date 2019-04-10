import React, {Component} from 'react'
import {
  Card,
  Select,
  Input,
  Button,
  Icon,
  Table
} from 'antd'

import LinkButton from '../../components/link-button'
const {Option} = Select

/*
商品的搜索列表路由组件
 */
export default class ProductIndex extends Component {

  state = {
    products: [], // 当前页产品的数组
    loading: false, // 是否正在加载中
  }

  componentWillMount() {
    this.columns = [
      {
        title: '商品名称',
        dataIndex: 'name',
      },
      {
        title: '商品描述',
        dataIndex: 'desc'
      },
      {
        title: '价格',
        dataIndex: 'price',
        render: (price) => '¥' + price
      },
      {
        title: '状态',
        render: (product) => {
          return (
            <span>
              <Button type='primary'>下架</Button>
              <span>在售</span>
            </span>
          )
        }
      },
      {
        title: '操作',
        render: (product) => {
          return (
            <span>
              <LinkButton>详情</LinkButton>
              <LinkButton>修改</LinkButton>
            </span>
          )
        }
      },
    ];
  }

  render() {

    // 读取状态数据
    const {products, loading} = this.state

    // Card左侧结构
    const title = (
      <span>
        <Select value='xxx' style={{width: 150, marginRight: 10}}>
          <Option value='xxx'>按名称搜索</Option>
          <Option value='yyy'>按描述搜索</Option>
        </Select>
        <Input placeholder='请输入关键字' style={{width: 150, marginRight: 10}}/>
        <Button type='primary'>搜索</Button>
      </span>
    )
    // Card右侧结构
    const extra = (
      <Button type='primary'>
        <Icon type='plus'/>
        添加产品
      </Button>
    )

    return (
      <Card title={title} extra={extra}>
        <Table
          bordered
          rowKey='_id'
          dataSource={products}
          columns={this.columns}
          loading={loading}
          pagination={{pageSize: 5, showQuickJumper: true, showSizeChanger: true}}
        />
      </Card>
    )
  }
}