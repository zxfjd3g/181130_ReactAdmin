import React, {Component} from 'react'
import {Form, Input, Button, Icon} from 'antd'

import logo from './images/logo.png'
import './index.less'

const FormItem = Form.Item  // <FormItem>  <Form.Item>

export default class Login extends Component {
  render() {
    return (
      <div className='login'>
        <div className='login-header'>
          <img src={logo} alt="logo"/>
          React项目: 后台管理系统
        </div>
        <div className='login-content'>
          <div className='login-box'>
            <div className="error-msg-wrap"></div>
            <div className="title">用户登陆</div>

            <Form className='login-form'>
              <Form.Item>
                <Input type='text' prefix={<Icon type="user"/>} placeholder="请输入用户名" />
              </Form.Item>
              <FormItem>
                <Input type='password' prefix={<Icon type="lock"/>} placeholder="请输入密码" />
              </FormItem>
              <FormItem>
                <Button type='primary' className='login-form-button'>登陆</Button>
              </FormItem>
            </Form>

          </div>
        </div>
      </div>
    )
  }
}