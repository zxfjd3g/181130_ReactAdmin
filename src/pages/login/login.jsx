import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import LoginForm from './login-form'
import logo from '../../assets/images/logo.png'
import './index.less'
import {login} from '../../redux/actions'


class Login extends Component {

  static propTypes = {
    user: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired
  }

  // 请求登陆
  // login = (name, pwd) => {
  login = ({username, password}) => {
    this.props.login(username, password)
  }

  render() {
    // 如果用户已经登陆, 自动跳转到admin
    if(this.props.user._id) {
      return <Redirect to='/'/>
    }
    const errorMsg = this.props.user.errorMsg

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


export default connect(
  state => ({
    user: state.user
  }),
  {login}
)(Login)
/*
1. 在父组件中给子组件标签传递属性
2. 子组件中声明接收属性
*/