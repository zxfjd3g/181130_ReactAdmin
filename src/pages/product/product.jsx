import React, {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import ProductIndex from './index'
import ProductDetail from './detail'
import ProductAddUpdate from './add-update'

import './product.less'

/*
产品管理路由组件
 */
export default class Product extends Component {
  render() {
    return (
      <Switch>
        {/*exact: true 代表完全匹配*/}
        <Route exact={true} path='/product' component={ProductIndex}/>
        <Route path='/product/detail' component={ProductDetail}/>
        <Route path='/product/addupdate' component={ProductAddUpdate}/>
        <Redirect to='/product'/>
      </Switch>
    )
  }
}
/*
请求的路径: /product/detail
    /product  ==> Product ==> ProductIndex
    /detail  ==> ProductIndex中找
 */