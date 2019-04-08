import React, {Component} from 'react'
import {
  Card,
  Table,
  Button,
  Icon
} from 'antd'

import {reqCategories} from '../../api'

import LinkButton from '../../components/link-button'

/*
分类管理路由组件
 */
export default class Category extends Component {

  state = {
    categories: [], // 一级分类列表
    subCategories: [], // 二级分类列表
    parentId: '0', // 父分类的ID
    parentName: '', // 父分类的名称
  }

  /*
  根据parentId异步获取分类列表显示
   */
  getCategories = async () => {
    const {parentId} = this.state
    // 异步获取分类列表
    const result = await reqCategories(parentId)  // {status: 0, data: []}
    if(result.status===0) {
      const categories = result.data
      if (parentId==='0') {
        // 更新一级分类列表
        this.setState({
          categories
        })
      } else {
        // 更新二级分类列表
        this.setState({
          subCategories: categories
        })
      }

    }
  }

  /*
  显示指定分类的子分类列表
   */
  showSubCates = (category) => {
    // console.log('set之前', this.state.parentId) // 0
    // 更新状态: state中的数据是异步更新(不会立即更新state中的数据)
    this.setState({
      parentId: category._id,
      parentName: category.name
    }, () => { // 在状态更新之后执行, 在回调函数中能得到最新的状态数据
      this.getCategories()
    })
    // console.log('set之后', this.state.parentId) // xxx

  }

  /*
  显示一级列表
   */
  showCategories = () => {
    this.setState({
      parentId: '0',
      parentName: '',
      subCategories: []
    })
  }

  componentDidMount () {
    this.getCategories()
  }

  render() {

    const {categories, subCategories, parentId, parentName} = this.state

    const title = parentId==='0' ? '一级分类列表' : (
      <span>
        <LinkButton onClick={this.showCategories}>一级列表</LinkButton> &nbsp;&nbsp;
        <Icon type='arrow-right'/>&nbsp;&nbsp;
        <span>{parentName}</span>
      </span>
    )
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
        render: (category) => (
          <span>
            <a href='javascript:'>修改分类</a>&nbsp;&nbsp;&nbsp;
            {this.state.parentId==='0' ? <a href='javascript:' onClick={() => this.showSubCates(category)}>查看子分类</a> : null}

          </span>
        )
      }];

    return (
      <Card title={title} extra={extra}>
        <Table
          bordered
          rowKey='_id'
          dataSource={parentId==='0' ? categories : subCategories}
          columns={columns}
          pagination={{pageSize: 5, showQuickJumper: true, showSizeChanger: true}}
        />
      </Card>
    )
  }
}