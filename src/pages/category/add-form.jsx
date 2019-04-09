import React, {Component} from 'react'
import {Form, Input, Select} from 'antd'
import PropTypes from 'prop-types'

const Option = Select.Option
/*
用来添加分类的form组件
 */
class AddForm extends Component {

  static propTypes = {
    categories: PropTypes.array.isRequired, // 一级分类数组
    parentId: PropTypes.string.isRequired, // 父分类的ID
    setForm: PropTypes.func.isRequired,
  }

  componentWillMount () {
    // 将当前prop中form交给父组件
    this.props.setForm(this.props.form)
  }

  render() {
    const {getFieldDecorator} = this.props.form
    const {categories, parentId} = this.props

    return (
      <Form>
        <Form.Item>
          {
            getFieldDecorator('parentId', {
              initialValue: parentId
            })(
              <Select>
                <Option value="0">一级分类</Option>
                {
                  categories.map(c => <Option value={c._id}>{c.name}</Option>)
                }
              </Select>
            )
          }
        </Form.Item>


        <Form.Item>
          {
            getFieldDecorator('categoryName', {
              initialValue: '', // 初始值
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