import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import LoginForm from './login-form'
import logo from '../../assets/images/logo.png'
import './index.less'

import {reqLogin} from '../../api'
import storageUtil from '../../util/storageUtil'
import MemoryUtils from '../../util/MemoryUtils'




export default class Login extends Component {

  state = {
    errorMsg: '', // 需要显示请求登陆失败的提示文本
  }

  // 请求登陆
  // login = (name, pwd) => {
  login = async ({username, password}) => {
    console.log('login login()')
    // alert(`发送ajax请求: username=${username}, password=${password}`)
    const result = await reqLogin(username, password) // {status: 0, data: user对象} {status: 1, msg: '错误信息'}
    // console.log('result', result)
    if(result.status===0) { // 成功了
      const user = result.data
      // 保存user到local storage
      storageUtil.saveUser(user)
      // 保存user到内存中
      MemoryUtils.user = user
      // 跳转到后台管理界面
      this.props.history.replace('/')
    } else {
      // 显示错误信息
      this.setState({
        errorMsg: result.msg
      })
    }
  }

  render() {
    // 如果用户已经登陆, 自动跳转到admin
    if(MemoryUtils.user && MemoryUtils.user._id) {
      return <Redirect to='/'/>
    }

    const {errorMsg} = this.state

    return (
      <div className='login'>
        <div className='login-header'>
          <img src={logo} alt="logo"/>
          React项目: 后台管理系统
        </div>
        <div className='login-content'>
          <div className='login-box'>
            <div className="error-msg-wrap">
              <div className={errorMsg ? 'show' : ''}>{errorMsg}</div>
            </div>
            <div className="title">用户登陆</div>
            <LoginForm login={this.login}/>
          </div>
        </div>
      </div>
    )
  }
}