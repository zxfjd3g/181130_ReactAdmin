import React, {Component} from 'react'
import {
  Card,
  Table,
  Button,
  Icon
} from 'antd'

import {reqCategories} from '../../api'

/*
分类管理路由组件
 */
export default class Category extends Component {

  state = {
    categories: []
  }

  /*
  异步获取分类列表显示
   */
  getCategories = async () => {
    // 异步获取分类列表
    const result = await reqCategories('0')  // {status: 0, data: []}
    if(result.status===0) {
      const categories = result.data
      // 更新状态: categories
      this.setState({
        categories
      })
    }
  }

  componentDidMount () {
    this.getCategories()
  }

  render() {

    const {categories} = this.state

    const title = '一级分类列表'
    const extra = (
      <Button type='primary'>
        <Icon type='plus'/> 添加
      </Button>
    )

    const columns = [
      {
        title: '分类名称',
        dataIndex: 'name',
      },
      {
        title: '操作',
        width: 300,
        render: () => (
          <span>
            <a href='javascript:'>修改分类</a>&nbsp;&nbsp;&nbsp;
            <a href='javascript:'>查看子分类</a>
          </span>
        )
      }];

    return (
      <Card title={title} extra={extra}>
        <Table
          bordered
          rowKey='_id'
          dataSource={categories}
          columns={columns}
          pagination={{pageSize: 5, showQuickJumper: true, showSizeChanger: true}}
        />
      </Card>
    )
  }
}