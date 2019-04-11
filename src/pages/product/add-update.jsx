import React, {Component} from 'react'
import {
  Card,
  Icon,
  Form,
  Input,
  Cascader,
  Button
} from 'antd'

import LinkButton from '../../components/link-button'
import PictureWall from './picture-wall'
import RichTextEditor from './rich-text-editor'

import {reqCategories} from '../../api'

const {Item} = Form

/*
商品添加/更新的路由组件
 */
class ProductAddUpdate extends Component {

  state = {
    options: [], // 用来显示级联列表的数组
  }

  /*
  选择某个分类项时的回调
  加载对应的二级分类显示
   */
  loadData = async (selectedOptions) => {
    console.log('loadDate()', selectedOptions)
    const targetOption = selectedOptions[selectedOptions.length - 1]
    targetOption.loading = true // 显示loading

    // 异步请求获取对应的二级分类列表
    await this.getCategories(targetOption.value) // await的作用: 保证完成执行完保存的分类数组才进入后面的语句
    const subCategories = this.subCategories
    targetOption.loading = false // 隐藏loading
    if(subCategories && subCategories.length>0) { // 有子分类
      // 生成一个二级的options
      const cOptions = subCategories.map(c => ({
        value: c._id,
        label: c.name,
        isLeaf: true,
      }))
      // 一级的options
      const {options} = this.state

      // 添加为对应的option的children(子options)
      targetOption.children = cOptions
    } else { // 没有子分类
      targetOption.isLeaf = true
    }

    // 更新options状态
    this.setState({
      options: [...this.state.options],
    });

  }

  /*
  获取指定分类id的子分类列表
  如果parentId为0时获取一级列表
   */
  getCategories = async (parentId) => {
    const result = await reqCategories(parentId)
    if(result.status===0) {
      const categories = result.data
      if(parentId==='0') {
        // 保存一级分类列表
        this.categories = categories
        this.initOptions()
      } else {
        // 保存分类列表
        this.subCategories = categories
      }
    }
  }

  /*
  生成级联的一级列表
   */
  initOptions = () => {
    // 根据一级分类数组生成option的数组
    const options = this.categories.map(c => ({
      value: c._id,
      label: c.name,
      isLeaf: false,
    }))
    // 更新状态
    this.setState({
      options
    })
  }

  // 添加/更新
  submit = () => {
    // 收集产品相关信息
    const values = this.props.form.getFieldsValue()

    /*
    在父组件中得到子组件对象: <Child ref='xxx'>  this.refs.xxx
    调用子组件对象的方法: this.refs.xxx.fn()
     */
    const imags = this.refs.pw.getImgs()
    console.log(values, imags)
  }

  componentDidMount () {
    // 异步获取一级分类列表
    this.getCategories('0')
  }

  render() {

    const {options} = this.state
    const {getFieldDecorator} = this.props.form

    const title = (
      <span>
        <LinkButton onClick={() => this.props.history.goBack()}>
          <Icon type='arrow-left' style={{fontSize: 20}}/>
        </LinkButton>
        添加商品
      </span>
    )

    // 指定form的item布局的对象
    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 8 }
    }

    return (
      <Card title={title}>
        <Form>
          <Item label="商品名称" {...formItemLayout}>
            {
              getFieldDecorator('name', {
                initialValue: '',
                rules: [{required: true, message: '商品名称必须输入'}]
              })(
                <Input placeholer='请输入商品名称'/>
              )
            }
          </Item>
          <Item label="商品描述" {...formItemLayout}>
            {
              getFieldDecorator('desc', {
                initialValue: '',
              })(
                <Input placeholer='请输入商品描述'/>
              )
            }
          </Item>
          <Item label="商品价格" {...formItemLayout}>
            {
              getFieldDecorator('price', {
                initialValue: '',
              })(
                <Input type='number' placeholer='请输入商品价格' addonAfter='元'/>
              )
            }
          </Item>
          <Item label="商品分类" {...formItemLayout}>
            {
              getFieldDecorator('categories', {
                initialValue: [],
              })(
                <Cascader
                  options={options}
                  loadData={this.loadData}
                />
              )
            }
          </Item>
          <Item label="商品图片" {...formItemLayout}>
            <PictureWall ref='pw'/>
          </Item>
          <Item
            label="商品详情"
            labelCol={{ span: 2 }}
            wrapperCol={{ span: 20 }}>
            <RichTextEditor />
          </Item>
          <Button type='primary' onClick={this.submit}>提交</Button>
        </Form>
      </Card>
    )
  }
}

export default Form.create()(ProductAddUpdate)