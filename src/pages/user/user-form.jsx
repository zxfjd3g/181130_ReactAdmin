import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
  Form,
  Input,
  Select,
} from 'antd'

const FormItem = Form.Item
const Option = Select.Option

/*
用来添加或更新的form组件
 */
class UserForm extends Component {

  static propTypes = {
    setForm: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    roles: PropTypes.array.isRequired,
  }

  componentWillMount() {
    this.props.setForm(this.props.form)
  }

  render() {
    const {getFieldDecorator} = this.props.form
    const formItemLayout = {
      labelCol: {span: 5},
      wrapperCol: {span: 16}
    }
    const {user, roles} = this.props

    return (
      <Form>
        <FormItem label="用户名" {...formItemLayout}>
          {
            getFieldDecorator('username', {
              initialValue: user.username
            })(
              <Input type="text" placeholder="请输入用户名"/>
            )
          }
        </FormItem>

        {
          user.password ? null : (
            <FormItem label="密码" {...formItemLayout}>
              {
                getFieldDecorator('password', {
                  initialValue: ''
                })(
                  <Input type="passowrd" placeholder="请输入密码"/>
                )
              }
            </FormItem>
          )
        }



        <FormItem label="手机号" {...formItemLayout}>
          {
            getFieldDecorator('phone', {
              initialValue: user.phone
            })(
              <Input type="phone" placeholder="请输入手机号"/>
            )
          }
        </FormItem>

        <FormItem label="邮箱" {...formItemLayout}>
          {
            getFieldDecorator('email', {
              initialValue: user.email
            })(
              <Input type="email" placeholder="请输入邮箱"/>
            )
          }
        </FormItem>

        <FormItem label="角色" {...formItemLayout}>
          {
            getFieldDecorator('role_id', {
              initialValue: user.role_id
            })(
              <Select>
                {
                  roles.map(role => <Option key={role._id} value={role._id}>{role.name}</Option>)
                }

              </Select>
            )
          }
        </FormItem>
      </Form>
    )
  }
}

export default Form.create()(UserForm)