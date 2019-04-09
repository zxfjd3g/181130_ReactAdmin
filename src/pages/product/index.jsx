import React, {Component} from 'react'
import {
  Card,
  Table,
  Modal,
  Input,
  Select,
  Button,
  Icon
} from 'antd'
import {
  reqProducts,
  reqSearchProducts,
  reqUpdateProductStatus
} from '../../api'
import LinkButton from '../../components/link-button'
import {PAGE_SIZE} from '../../util/constant'

const Option = Select.Option


export default class ProductIndex extends Component {

  state = {
    products: [],
    total: 0,
    searchType: 'productName',
    searchName: '',
    loading: false
  }

  getProducts = async (pageNum) => {
    this.setState({loading: true})
    const {searchName, searchType} = this.state
    let result
    if (!searchName) {
      result = await reqProducts(pageNum, PAGE_SIZE)
    } else {
      result = await reqSearchProducts({pageNum, pageSize: PAGE_SIZE, searchType, searchName})
    }
    this.setState({loading: false})
    if (result.status === 0) {
      const {total, list} = result.data
      this.setState({
        total,
        products: list
      })
    }
  }

  componentDidMount() {
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
        dataIndex: 'desc',
      },
      {
        title: '价格',
        dataIndex: 'price',
        render: (price) => {
          return '¥' + price
        }
      },
      {
        title: '状态',
        width: 150,
        render: (product) => {
          return (
            <span>
              <Button type='primary'>下架</Button>&nbsp;&nbsp;
              <span>在售</span>
            </span>
          )
        }
      },
      {
        title: '操作',
        width: 130,
        render: (product) => {
          return (
            <span>
              <LinkButton>详情</LinkButton>&nbsp;&nbsp;
              <LinkButton>修改</LinkButton>
            </span>
          )
        }
      },
    ]
  }

  render() {

    const {products, total, loading, searchType, searchName} = this.state

    const title = (
      <span>
        <Select
          value={searchType}
          style={{width: 120}}
          onChange={val => this.setState({searchType: val})}
        >
          <Option value='productName'>按名称搜索</Option>
          <Option value='productDesc'>按描述搜索</Option>
        </Select> &nbsp;&nbsp;

        <Input
          placeholder='请输入搜索关键字'
          style={{width: 150}}
          onChange={e => this.setState({searchName: e.target.value})}
        />&nbsp;&nbsp;
        <Button type='primary' onClick={() => this.getProducts(1)}>搜索</Button>
      </span>
    )

    const extra = (
      <Button type='primary' onClick={() => this.props.history.push('/product/addupdate')}>
        <Icon type='plus'/>
        添加商品
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
          pagination={{
            total,
            defaultPageSize: PAGE_SIZE,
            onChange: this.getProducts
          }}
        />
      </Card>
    )
  }
}