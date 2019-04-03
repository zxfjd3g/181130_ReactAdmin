import React, {Component} from 'react'
import {Form, Input, Button, Icon} from 'antd'

const FormItem = Form.Item  // <FormItem>  <Form.Item>

/*
1. 收集表单数据
2. 表单检验
 */
class LoginForm extends Component {

  handleSubmit = (event) => {
    // 阻止事件的默认行为
    event.preventDefault()

    // 读取输入的数据
    const values = this.props.form.getFieldsValue() // values是包含所有输入数据的对象
    console.log(values)

    // this.props.form.resetFields()

  }
  render() {
    // getFieldDecorator(): 用来包装表单项组件标签生成新的组件标签
    const {getFieldDecorator} = this.props.form

    return (
      <Form className='login-form' onSubmit={this.handleSubmit}>
        <Form.Item>
          {
            getFieldDecorator('username')(
              <Input type='text' prefix={<Icon type="user"/>} placeholder="请输入用户名" />
            )
          }

        </Form.Item>
        <FormItem>
          {
            getFieldDecorator('password')(
              <Input type='password' prefix={<Icon type="lock"/>} placeholder="请输入密码" />
            )
          }

        </FormItem>
        <FormItem>
          <Button type='primary' htmlType="submit" className='login-form-button'>登陆2</Button>
        </FormItem>
      </Form>
    )
  }
}

/*
Form.create(): 高阶函数
Form.create()(form组件): 返回一个包装了form组件的新组件: Form(LoginForm)
作用: 向form组件传递一个属性: form: 对象(包含了很多方法)
form对象:
  1). 操作表单输入数据
  2). 表单验证

 */
const WrapLoginForm = Form.create()(LoginForm)

// export default LoginForm
export default WrapLoginForm