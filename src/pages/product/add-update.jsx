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

const {Item} = Form

const options = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  children: [{
    value: 'hangzhou',
    label: 'Hangzhou',
    children: [{
      value: 'xihu',
      label: 'West Lake',
    }],
  }],
}, {
  value: 'jiangsu',
  label: 'Jiangsu',
  children: [{
    value: 'nanjing',
    label: 'Nanjing',
    children: [{
      value: 'zhonghuamen',
      label: 'Zhong Hua Men',
    }],
  }],
}];

/*
商品添加/更新的路由组件
 */
class ProductAddUpdate extends Component {
  render() {

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
                <Cascader options={options} placeholder="Please select" />
              )
            }
          </Item>
          <Item label="商品图片" {...formItemLayout}>
            <PictureWall/>
          </Item>
          <Item
            label="商品详情"
            labelCol={{ span: 2 }}
            wrapperCol={{ span: 20 }}>
            <RichTextEditor />
          </Item>
          <Button type='primary'>提交</Button>
        </Form>
      </Card>
    )
  }
}

export default Form.create()(ProductAddUpdate)