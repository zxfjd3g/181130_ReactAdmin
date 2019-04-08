import React, {Component} from 'react'
import {
  Card,
  Table,
  Button,
  Icon,
  Modal,
  message
} from 'antd'

import {reqCategorys, reqUpdateCategory, reqAddCategory} from '../../api'


/*
分类管理路由组件
 */
export default class Category extends Component {

  state = {
    categories: [],
    subCategories: [],
    parentId: '0',
    parentName: ''
  }

  getCategories = async () => {
    const {parentId} = this.state
    const result = await reqCategorys(parentId)
    if (result.status === 0) {
      const categories = result.data
      if (parentId==='0') {
        this.setState({
          categories
        })
      } else {
        this.setState({
          subCategories: categories
        })
      }
    }
  }

  showSubCates = (category) => {
    this.setState({
      parentId: category._id,
      parentName: category.name
    }, () => {
      this.getCategories()
    })

  }

  showCategorys = () => {
    this.setState({
      parentId: '0',
      parentName: '',
      subCategorys: []
    })
  }

  componentWillMount() {

    this.columns = [
      {
        title: '分类名称',
        dataIndex: 'name',
      },
      {
        title: '操作',
        width: 300,
        render: (category) => {
          return (
            <span>
              <a href='javascript:'>修改</a>
              &nbsp;&nbsp;&nbsp;
              <a href='javascript:' onClick={() => this.showSubCates(category)}>查看子分类</a>
            </span>
          )
        }
      }];
  }

  componentDidMount() {
    this.getCategories()
  }

  render() {

    const {categories, subCategories, parentId, parentName} = this.state

    const title = (
      parentId==='0'
        ? '一级分类列表'
        : (
          <span>

            <a href='javascript:' onClick={this.showCategorys}>一级分类</a>
            &nbsp;&nbsp;<Icon type="arrow-right" />
            &nbsp;&nbsp;<span>{parentName}</span>
          </span>
        )
    )

    const extra = (
      <Button type='primary' onClick={() => this.setState({isShowAdd: true})}>
        <Icon type='plus'/>添加分类
      </Button>
    )

    return (
      <Card title={title} extra={extra}>
        <Table
          bordered
          rowKey='_id'
          dataSource={parentId==='0' ? categories : subCategories}
          columns={this.columns}
          pagination={{defaultPageSize: 5, showSizeChanger: true, showQuickJumper: true}}
        />
      </Card>
    )
  }
}