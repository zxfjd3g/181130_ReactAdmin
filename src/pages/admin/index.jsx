import React, {Component} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {Layout }  from 'antd'

import MemoryUtils from '../../util/MemoryUtils'
import LeftNav from '../../components/left-nav'
import Header from '../../components/header'
import Footer from '../../components/footer'
import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'
import Line from '../charts/line'
import Bar from '../charts/bar'
import Pie from '../charts/pie'

const {Sider, Content} = Layout

export default class Admin extends Component {
  render() {

    // 如果用户没有登陆, 自动跳转到登陆界面
    if(!MemoryUtils.user || !MemoryUtils.user._id) {
      // 跳转
      // this.props.history.replace('/login')  // 常用在事件回调函数中
      return <Redirect to='/login' />  // 渲染此组件标签的效果: 自动跳转到指定的路由  (常用在render()中)
    }

    return (
      <Layout>
        <Sider>
          <LeftNav/>
        </Sider>
        <Layout>
          <Header/>
          <Content style={{margin: 10, background: 'white'}}>
            <Switch>
              <Route path='/home' component={Home}/>
              <Route path='/category' component={Category}/>
              <Route path='/product' component={Product}/>
              <Route path='/user' component={User}/>
              <Route path='/role' component={Role}/>
              <Route path="/charts/bar" component={Bar}/>
              <Route path="/charts/pie" component={Pie}/>
              <Route path="/charts/line" component={Line}/>
              <Redirect to='/home'/>{/*只要与上面不匹配就自动跳转到home*/}
            </Switch>
          </Content>
          <Footer/>
        </Layout>
      </Layout>
    )
  }
}