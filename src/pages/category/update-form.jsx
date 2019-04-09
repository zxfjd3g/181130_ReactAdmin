import React, {Component} from 'react'
import {Form, Input} from 'antd'
import PropTypes from 'prop-types'

/*
用来更新分类名称的form组件
 */
class UpdateForm extends Component {

  static propTypes = {
    categoryName: PropTypes.string.isRequired,
    setForm: PropTypes.func.isRequired,
  }

  componentWillMount () {
    // 将当前prop中form交给父组件
    this.props.setForm(this.props.form)
  }

  render() {
    const {getFieldDecorator} = this.props.form
    const {categoryName} = this.props

    return (
      <Form>
        <Form.Item>
          {
            getFieldDecorator('categoryName', {
              initialValue: categoryName, // 初始值
              rules: [{}] // 验证规则
            })(
              <Input type='text' placeholder='请输入分类名称'/>
            )
          }
        </Form.Item>
      </Form>
    )
  }
}

export default Form.create()(UpdateForm)