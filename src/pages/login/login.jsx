import React, {Component} from 'react'

import LoginForm from './login-form'
import logo from './images/logo.png'
import './index.less'



export default class Login extends Component {

  state = {
    errorMsg: '', // 需要显示请求登陆失败的提示文本
  }

  // 请求登陆
  // login = (name, pwd) => {
  login = ({username, password}) => {
    alert(`发送ajax请求: username=${username}, password=${password}`)
  }

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
            <LoginForm login={this.login}/>
          </div>
        </div>
      </div>
    )
  }
}