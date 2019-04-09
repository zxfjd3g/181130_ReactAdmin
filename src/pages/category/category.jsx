import React, {Component} from 'react'
import {
  Card,
  Table,
  Button,
  Icon,
  message,
  Modal
} from 'antd'

import {reqCategories} from '../../api'
import UpdateForm from './update-form'
import AddForm from './add-form'
import LinkButton from '../../components/link-button'
import {reqAddCategory, reqUpdateCategory} from "../../api/index";

/*
分类管理路由组件
 */
export default class Category extends Component {

  state = {
    categories: [], // 一级分类列表
    subCategories: [], // 二级分类列表
    parentId: '0', // 父分类的ID
    parentName: '', // 父分类的名称
    loading: false, // 标识是否正在加载中
  }

  /*
  根据parentId异步获取分类列表显示
   */
  getCategories = async (parentId) => {

    // 更新loading状态: 加载中
    this.setState({
      loading: true
    })
    // 优先使用指定的parentId, 如果没有指定使用状态中的parentId
    parentId = parentId || this.state.parentId
    // 异步获取分类列表
    const result = await reqCategories(parentId)  // {status: 0, data: []}
    // 更新loading状态: 加载完成
    this.setState({
      loading: false
    })
    if (result.status === 0) {
      const categories = result.data
      if (parentId === '0') {
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

    } else {
      // 获取列表失败
      message.error('获取列表失败')
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
      subCategories: [],
      showStatus: 0, // 0: 都不显示, 1: 显示添加, 2: 显示更新
    })
  }

  /*
  显示添加的对话框
   */
  showAdd = () => {
    this.setState({
      showStatus: 1
    })
  }

  /*
  显示修改的对话框
   */
  showUpdate = (category) => {
    // 保存category
    this.category = category
    // 更新状态
    this.setState({
      showStatus: 2
    })
  }

  /*
  添加分类
   */
  addCategory = async () => {
    // 得到数据
    const {parentId, categoryName} = this.form.getFieldsValue()
    // 关闭对话框
    this.setState({
      showStatus: 0
    })
    // 重置表单
    this.form.resetFields()

    // 异步请求添加分类
    const result = await reqAddCategory(categoryName, parentId)
    if(result.status===0) {
      /*
      添加一级分类
      在当前分类列表下添加
       */
      if(parentId==='0' || parentId===this.state.parentId) {
        // 获取当前添加的分类所在的列表
        this.getCategories(parentId)
      }

    }
  }

  /*
  更新分类
   */
  updateCategory = async () => {
    // 得到数据
    const categoryId = this.category._id
    const {categoryName} = this.form.getFieldsValue()

    // 关闭对话框
    this.setState({
      showStatus: 0
    })

    // 重置表单
    this.form.resetFields()

    // 异步请求更新分类
    const result = await reqUpdateCategory({categoryId, categoryName})
    if(result.status===0) {
      // 重新获取列表
      this.getCategories()
    }
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
        render: (category) => (
          <span>
            <LinkButton onClick={() => this.showUpdate(category)}>修改分类</LinkButton>&nbsp;&nbsp;&nbsp;
            {this.state.parentId === '0' ?
              <LinkButton onClick={() => this.showSubCates(category)}>查看子分类</LinkButton> : null}
          </span>
        )
      }];
  }

  componentDidMount() {
    this.getCategories()
  }

  render() {

    // 从状态中取数据
    const {categories, subCategories, parentId, parentName, loading, showStatus} = this.state
    // 从组件对象中数据
    const category = this.category || {}

    const title = parentId === '0' ? '一级分类列表' : (
      <span>
        <LinkButton onClick={this.showCategories}>一级列表</LinkButton> &nbsp;&nbsp;
        <Icon type='arrow-right'/>&nbsp;&nbsp;
        <span>{parentName}</span>
      </span>
    )
    const extra = (
      <Button type='primary' onClick={this.showAdd}>
        <Icon type='plus'/> 添加
      </Button>
    )

    return (
      <Card title={title} extra={extra}>
        <Table
          bordered
          rowKey='_id'
          dataSource={parentId === '0' ? categories : subCategories}
          columns={this.columns}
          loading={loading}
          pagination={{pageSize: 5, showQuickJumper: true, showSizeChanger: true}}
        />

        <Modal
          title="添加分类"
          visible={showStatus === 1}
          onOk={this.addCategory}
          onCancel={() => this.setState({showStatus: 0})}
        >
          <AddForm categories={categories} parentId={parentId} setForm={form => this.form = form}/>
        </Modal>

        <Modal
          title="修改分类"
          visible={showStatus === 2}
          onOk={this.updateCategory}
          onCancel={() => {
            this.setState({showStatus: 0})
            this.form.resetFields()
          }}
        >
          <UpdateForm categoryName={category.name} setForm={form => this.form = form}/>
        </Modal>
      </Card>
    )
  }
}