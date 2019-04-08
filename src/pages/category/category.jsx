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
import LinkButton from '../../components/link-button'
import UpdateForm from './update-form'
import AddForm from './add-form'


/*
分类管理路由组件
 */
export default class Category extends Component {

  state = {
    categories: [],
    subCategories: [],
    parentId: '0',
    parentName: '',
    showStatus: 0, // 0:不显示对话框, 1: 显示添加, 2: 显示更新
  }

  getCategories = async (pId) => {
    const parentId = pId || this.state.parentId
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

  showUpdate = (category) => {
    this.category = category
    this.setState({
      showStatus: 2
    })
  }

  updateCategory = async () => {
    // 收集表单数据
    const categoryName = this.updateForm.getFieldValue('categoryName')
    const categoryId = this.category._id

    // 隐藏对话框
    this.setState({
      showStatus: 0
    })
    // 重置表单数据
    this.updateForm.resetFields()

    // 发ajax请求
    const result = await reqUpdateCategory({categoryId, categoryName})
    if(result.status===0) {
      message.success('更新分类成功')
      this.getCategories()
    }
  }

  addCategory = async () => {
    // 收集表单数据
    const {parentId, categoryName} = this.addForm.getFieldsValue()

    // 隐藏对话框
    this.setState({
      showStatus: 0
    })
    // 重置表单数据
    this.addForm.resetFields()

    // 发ajax请求
    const result = await reqAddCategory(parentId, categoryName)
    if(result.status===0) {
      debugger
      message.success('保存分类成功')
      if(parentId==='0' || parentId===this.state.parentId) {
        this.getCategories(parentId)
      }
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
        render: (category) => {
          return (
            <span>
              <LinkButton onClick={() => this.showUpdate(category)}>修改</LinkButton>
              &nbsp;&nbsp;&nbsp;
              {this.state.parentId==='0' ? <LinkButton onClick={() => this.showSubCates(category)}>查看子分类</LinkButton> : null}

            </span>
          )
        }
      }];
  }

  componentDidMount() {
    this.getCategories()
  }

  render() {

    const {categories, subCategories, parentId, parentName, showStatus} = this.state
    const category = this.category || {}

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
      <Button type='primary' onClick={() => this.setState({showStatus: 1})}>
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

        <Modal
          title="更新分类"
          visible={showStatus===2}
          onOk={this.updateCategory}
          onCancel={() => {
            this.setState({showStatus: 0})
            this.updateForm.resetFields()
          }}
        >
          <UpdateForm categoryName={category.name} setForm={form => this.updateForm = form}/>
        </Modal>

        <Modal
          title="添加分类"
          visible={showStatus===1}
          onOk={this.addCategory}
          onCancel={() => {
            this.setState({showStatus: 0})
            this.addForm.resetFields()
          }}
        >
          <AddForm categories={categories} parentId={parentId} setForm={form => this.addForm = form}/>
        </Modal>
      </Card>
    )
  }
}