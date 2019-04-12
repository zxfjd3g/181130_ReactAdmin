import React, {PureComponent} from 'react'
import {
  Card,
  Button,
  Table,
  message,
  Modal
} from 'antd'

import {formateDate} from '../../util/util'
import {PAGE_SIZE} from "../../util/constant"
import {
  reqRoles,
  reqAddRole,
  reqUpdateRole
} from '../../api'
import AddForm from './add-form'
import AuthForm from './auth-form'

/*
角色管理路由组件
 */
export default class Role extends PureComponent {

  state = {
    roles: [], // 所有角色数组
    loading: false, // 是否正在加载中
    role: {}, // 选中的角色(初始没有)
    isShowAdd: false, // 是否显示添加角色的界面
    isShowAuth: false, // 是否显示授权的界面
    menus: [], // 当前角色的权限数组
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

  /*
  异步添加角色
   */
  addRole = async () => {
    // 收集输入数据
    const roleName = this.form.getFieldValue('roleName')
    this.form.resetFields()
    this.setState({isShowAdd: false})

    // 发添加角色的请求
    const result = await reqAddRole(roleName)

    // 提示
    if(result.status===0) {
      message.success('添加角色成功!')
      // this.getRoles()
      // 得到新添加的角色
      const role = result.data
      const {roles} = this.state
     /* roles.push(role)  // 不会进行重新render()更新
      this.setState({
        roles
      })*/

      // 更新roles状态
      this.setState({
        roles: [...roles, role]
      })

    } else {
      message.success('添加角色失败!')
    }
  }

  /*
  异步更新角色(给角色授权)
   */
  updateRole = async () => {
    this.setState({
      isShowAuth: false
    })
    // 从状态中取数据
    const {role, menus, roles} = this.state
    role.menus = menus

    // 异步请求更新角色
    const result = await reqUpdateRole(role)
    if(result.status===0) {
      message.success('角色授权成功')
      this.setState({
        roles: [...roles]
      })
    } else {
      message.success('角色授权失败')
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
    const {roles, loading, role, isShowAdd, isShowAuth, menus} = this.state

    const title = (
      <span>
        <Button type='primary' onClick={() => this.setState({isShowAdd: true})}>创建角色</Button> &nbsp;&nbsp;
        <Button type='primary' disabled={!role._id} onClick={() => this.setState({isShowAuth: true})}>设置角色权限</Button>
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
          role,
          menus:role.menus
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

        <Modal
          title="添加角色"
          visible={isShowAdd}
          onOk={this.addRole}
          onCancel={() => this.setState({isShowAdd: false})}
        >
          <AddForm setForm={form => this.form = form}/>
        </Modal>

        <Modal
          title="设置角色权限"
          visible={isShowAuth}
          onOk={this.updateRole}
          onCancel={() => this.setState({isShowAuth: false, menus: role.menus})}
        >
          <AuthForm
            roleName={role.name}
            menus={menus}
            setMenus={(menus) => {
              this.setState({menus})
            }}/>
        </Modal>
      </Card>
    )
  }
}