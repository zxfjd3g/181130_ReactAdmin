import React, {Component} from 'react'
import {
  Card,
  Select,
  Input,
  Button,
  Icon,
  Table,
  message
} from 'antd'

import LinkButton from '../../components/link-button'
import {
  reqProducts,
  reqSearchProducts,
  reqUpdateProductStatus
} from '../../api'
import {PAGE_SIZE} from "../../util/constant";
const {Option} = Select

/*
商品的搜索列表路由组件
 */
export default class ProductIndex extends Component {

  state = {
    products: [], // 当前页产品的数组
    total: 0, // 商品总数量
    loading: false, // 是否正在加载中
    searchType: 'productName', // 搜索的类型, productName: 按名称搜索, productDesc: 按描述搜索
    searchName: '', // 搜索的关键字
  }

  /*
  获取指定页码的商品列表(可能带搜索)
   */
  getProducts = async (pageNum) => {
    // 保存请求的页码
    this.pageNum = pageNum

    // 显示loading
    this.setState({
      loading: true
    })

    const {searchName, searchType} = this.state
    let result
    // 一般分页
    if(!searchName) {
      result = await reqProducts(pageNum, PAGE_SIZE)
    } else {
      // 搜索分页
      result = await reqSearchProducts({searchType, searchName, pageNum, pageSize: PAGE_SIZE})
    }

    // 隐藏loading
    this.setState({
      loading: false
    })
    if(result.status===0) {
      const {total, list} = result.data
      this.setState({
        products: list,
        total
      })
    }
  }

  /*
  更新商品的状态
   */
  updateProductStatus = async (productId, status) => {
    const result = await reqUpdateProductStatus({productId, status})
    message.success('更新成功!')
    if(result.status===0) {
      // 必须获取当前项的商品列表
      this.getProducts(this.pageNum)
    }
  }


  componentDidMount () {
    this.getProducts(1)
  }

  componentWillMount() {
    this.columns = [
      {
        title: '商品名称',
        dataIndex: 'name',
      },
      {
        title: '商品描述',
        dataIndex: 'desc'
      },
      {
        title: '价格',
        dataIndex: 'price',
        render: (price) => '¥' + price
      },
      {
        title: '状态',
        // dataIndex: 'status',
        width: 150,
        render: (product) => {
          let btnText = '下架'
          let text = '在售'
          if(product.status===2) {
            btnText = '上架'
            text = '已下架'
          }
          /*const btnText = status===1 ? '下架' : '上架'
          const text = status===1 ? '在售' : '已下架'*/

          // 得到点击后新的状态值
          const status = product.status===1 ? 2 : 1

          return (
            <span>
              <Button
                type='primary'
                onClick={() => this.updateProductStatus(product._id, status)}
              >{btnText}</Button> &nbsp;
              <span>{text}</span>
            </span>
          )
        }
      },
      {
        title: '操作',
        width: 120,
        render: (product) => {
          return (
            <span>
              <LinkButton onClick={() => this.props.history.push('/product/detail', {product})}>详情</LinkButton>
              <LinkButton>修改</LinkButton>
            </span>
          )
        }
      },
    ];
  }

  render() {

    // 读取状态数据
    const {products, total, loading, searchType, searchName} = this.state

    // Card左侧结构
    const title = (
      <span>
        <Select
          value={searchType}
          style={{width: 150, marginRight: 10}}
          onChange = {val => this.setState({searchType: val})}
        >
          <Option value='productName'>按名称搜索</Option>
          <Option value='productDesc'>按描述搜索</Option>
        </Select>
        <Input
          placeholder='请输入关键字'
          style={{width: 150, marginRight: 10}}
          value={searchName}
          onChange={event => this.setState({searchName: event.target.value})}
        />
        <Button type='primary' onClick={() => this.getProducts(1)}>搜索</Button>
      </span>
    )
    // Card右侧结构
    const extra = (
      <Button type='primary'>
        <Icon type='plus'/>
        添加产品
      </Button>
    )

    return (
      <Card title={title} extra={extra}>
        <Table
          bordered
          rowKey='_id'
          dataSource={products}
          columns={this.columns}
          loading={loading}
          pagination={{total, pageSize: PAGE_SIZE, showQuickJumper: true, showSizeChanger: true}}
          onChange={(page) => this.getProducts(page.current)}
        />
      </Card>
    )
  }
}