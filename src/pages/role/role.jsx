import React, {Component} from 'react'
import {
  Card,
  Button,
  Table,
  message
} from 'antd'

import {formateDate} from '../../util/util'
import {PAGE_SIZE} from "../../util/constant"
import {
  reqRoles
} from '../../api'
/*
角色管理路由组件
 */
export default class Role extends Component {

  state = {
    roles: [], // 所有角色数组
    loading: false, // 是否正在加载中
    role: {}, // 选中的角色(初始没有)
  }

  /*
  异步获取角色列表显示
   */
  getRoles = async () => {
    this.setState({
      loading: true
    })
    const result = await reqRoles()
    this.setState({
      loading: false
    })
    if(result.status===0) {
      message.success('获取角色列表成功')
      const roles = result.data
      this.setState({
        roles
      })

    } else {
      message.success('获取角色列表失败')
    }
  }


  componentDidMount () {
    this.getRoles()
  }

  componentWillMount () {
    this.columns = [
      {
        title: '角色名称',
        dataIndex: 'name',
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        render: (create_time) => formateDate(create_time) // 显示格式化后的时间
      },
      {
        title: '授权时间',
        dataIndex: 'auth_time',
        render: (auth_time) => formateDate(auth_time) // 显示格式化后的时间
      },
      {
        title: '授权人',
        dataIndex: 'auth_name'
      }
    ]
  }

  render() {

    // 获取状态数据
    const {roles, loading, role} = this.state

    const title = (
      <span>
        <Button type='primary'>创建角色</Button> &nbsp;&nbsp;
        <Button type='primary' disabled={!role._id}>设置角色权限</Button>
      </span>
    )

    // 描述table行的配置对象
    const rowSelection = {
      type: 'radio',
      // selectedRowKeys: 所有选中行的key值的数组
      // selectedRows: 所有选中行的数据(role)的数组
      onChange: (selectedRowKeys, selectedRows) => {
        console.log('onChange()', selectedRowKeys, selectedRows)
        // 得到选中的角色
        const role = selectedRows[0]
        // 更新状态
        this.setState({
          role
        })
      }
    }

    return (
      <Card title={title}>
        <Table
          bordered
          rowKey='_id'
          dataSource={roles}
          columns={this.columns}
          loading={loading}
          rowSelection={rowSelection}
          pagination={{pageSize: PAGE_SIZE, showQuickJumper: true, showSizeChanger: true}}
        />
      </Card>
    )
  }
}