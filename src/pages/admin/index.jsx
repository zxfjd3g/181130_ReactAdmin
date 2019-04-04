import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import MemoryUtils from '../../util/MemoryUtils'

export default class Admin extends Component {
  render() {

    // 如果用户没有登陆, 自动跳转到登陆界面
    if(!MemoryUtils.user || !MemoryUtils.user._id) {
      // 跳转
      // this.props.history.replace('/login')  // 常用在事件回调函数中
      return <Redirect to='/login' />  // 渲染此组件标签的效果: 自动跳转到指定的路由  (常用在render()中)
    }

    return (
      <div>
        Admin
      </div>
    )
  }
}