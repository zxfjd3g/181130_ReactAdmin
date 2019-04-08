import React, {Component} from 'react'
import {Form, Input, Select} from 'antd'
import PropTypes from 'prop-types'

class AddForm extends Component {

  static propTypes = {
    parentId: PropTypes.string.isRequired,
    categories: PropTypes.array.isRequired,
    setForm: PropTypes.func.isRequired
  }

  componentWillMount () {
    this.props.setForm(this.props.form)
  }

  render() {
    const {parentId, categories} = this.props
    const {getFieldDecorator} = this.props.form

    return (
      <Form>
        <Form.Item>
          {
            getFieldDecorator('parentId', {
              initialValue: parentId
            })(
              <Select>
                <Select.Option key='0' value='0'>一级分类</Select.Option>
                {
                  categories.map(c => <Select.Option key={c._id} value={c._id}>{c.name}</Select.Option>)
                }
              </Select>
            )
          }
        </Form.Item>
        <Form.Item>
          {
            getFieldDecorator('categoryName', {
              initialValue: ''
            })(
              <Input type='text' placeholder='请输入分类名称'/>
            )
          }
        </Form.Item>
      </Form>
    )
  }
}

export default Form.create()(AddForm)