import React, {Component} from 'react'
import {
  Card,
  List,
  Icon
} from 'antd'

import {reqCategory} from '../../api'
import LinkButton from '../../components/link-button'

const {Item} = List

/*
商品详情路由组件
 */
export default class ProductDetail extends Component {

  state = {
    cName1: '', // 一级分类的名称
    cName2: '',// 二级分类的名称
  }

  /*
  获取当前商品所性分类的名称
   */
  getCategoryNames = async () => {
    // 得到商品分类id
    const {pCategoryId, categoryId} = this.props.location.state.product
    if(pCategoryId==='0') { // 当前商品是一级分类下的商品
      const result = await reqCategory(categoryId)
      const cName1 = result.data.name
      this.setState({
        cName1
      })
    } else { // 当前商品是二级分类下的商品
      // 获取一级分类
      // const result1 = await reqCategory(pCategoryId)
      // const result2 = await reqCategory(categoryId) // 在第一个请求成功之后才发送

      /*
      如何实现一次发多个请求, 当所有请求成功后进行处理?
        Promise.all([promise1, promise2])
       */

      /*
      所promise的异步请求都会执行
      调用resolve(): 当内部所有异步处理执行成功完成才调用resolve([result1, result2])
      调用reject(): 只要有一个异步处理失败, 立即调用reject()
       */
      const [result1, result2] = await Promise.all([reqCategory(pCategoryId), reqCategory(categoryId)])
      const cName1 = result1.data.name
      const cName2 = result2.data.name
      this.setState({
        cName1,
        cName2
      })
    }

  }

  componentDidMount () {
    this.getCategoryNames()
  }


  render() {

    // 从location中取出state中product
    const {name, desc, price} = this.props.location.state.product

    // 从状态中取出分类名
    const {cName1, cName2} = this.state

    const title = (
      <span>
        <LinkButton>
          <Icon type='arrow-left' style={{fontSize: 20}}/>
        </LinkButton>
        商品详情
      </span>
    )

    return (
      <Card title={title} className='detail'>
        <List>
          <Item>
            <span className='left'>商品名称:</span>
            <span>{name}</span>
          </Item>
          <Item>
            <span className='left'>商品描述:</span>
            <span>{desc}</span>
          </Item>
          <Item>
            <span className='left'>商品价格:</span>
            <span>{price}元</span>
          </Item>
          <Item>
            <span className='left'>所属分类:</span>
            <span>{cName1}-->{cName2}</span>
          </Item>
        </List>
      </Card>
    )
  }
}