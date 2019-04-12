import React, {Component} from 'react'
import {
  Card,
  Button,
  Table,
  Modal,
  message
} from 'antd'

import LinkButton from '../../components/link-button'
import UserForm from './user-form'
import {
  reqUsers,
  reqAddOrUpdateUser,
  reqDeleteUser
} from '../../api'
import {formateDate} from '../../util/util'
import {PAGE_SIZE} from "../../util/constant";

/*
后台管理的用户管理路由组件
 */
export default class User extends Component {

  state = {
    isShow: false, // 是否显示对话框
    users: [], // 所有用户的列表
    roles: [], // 所有角色的列表
  }

  /*
  根据roles生成一个对象容器(属性名: _id的值, 属性值: name)
   */
  initRoleNames = (roles) => {
    this.roleNames = roles.reduce((pre, role) => {
      // 添加为pre的属性
      pre[role._id] = role.name
      // 返回pre
      return pre
    }, {})
  }

  /*
  异步获取所有用户列表
   */
  getUsers = async () => {
    const result = await reqUsers()
    if (result.status === 0) {
      const {users, roles} = result.data

      // 根据roles生成一个对象容器(属性名: _id的值, 属性值: name)
      this.initRoleNames(roles)

      this.setState({
        users,
        roles
      })
    }
  }

  /*
  显示更新用户界面
   */
  showUpdate = (user) => {
    // 保存user
    this.user = user

    this.setState({
      isShow: true
    })
  }

  /*
  添加/更新用户
   */
  addOrUpdateUser = async () => {
    // 准备user
    const user = this.form.getFieldsValue()
    this.form.resetFields()
    this.setState({isShow: false})

    if(this.user._id) { // 更新
      user._id = this.user._id // 必须保存_id
    }

    // 请求
    const result = await reqAddOrUpdateUser(user)

    // 根据结果做响应
    if(result.status===0) {
      message.success('处理成功!!!')
      // 重新获取显示新的用户列表
      this.getUsers()
    }

  }

  /*
  删除指定用户
   */
  removeUser = (userId) => {
    // 显示一个删除的确认框
    Modal.confirm({
      content: '确定删除吗',
      onOk: async () => {
        // 请求删除用户
        const result = await reqDeleteUser(userId)
        if(result.status===0) {
          message.success('删除成功')
          // 重新显示用户列表
          this.getUsers()
        }
      },
      onCancel() {
        console.log('Cancel');
      },
    })
  }


  componentWillMount() {
    // 初始化Table的列数组
    this.columns = [
      {
        title: '用户名',
        dataIndex: 'username'
      },
      {
        title: '邮箱',
        dataIndex: 'email'
      },
      {
        title: '电话',
        dataIndex: 'phone'
      },
      {
        title: '注册时间',
        dataIndex: 'create_time',
        // render: create_time => formateDate(create_time)
        /*render: function (time) {
          return formateDate(time)
        },*/
        render: formateDate
      },
      {
        title: '所属角色',
        dataIndex: 'role_id',
        // render: (role_id) => this.state.roles.find(role => role._id===role_id).name, // 用数组
        render: (role_id) => this.roleNames[role_id] // 用对象
      },
      {
        title: '操作',
        render: (user) => (
          <span>
            <LinkButton onClick={() => this.showUpdate(user)}>修改</LinkButton>
            &nbsp;&nbsp;
            <LinkButton onClick={() => this.removeUser(user._id)}>删除</LinkButton>
          </span>
        )
      },
    ]
  }

  componentDidMount() {
    this.getUsers()
  }

  render() {

    // 从状态中获取数据
    const {users, roles, isShow} = this.state
    const user = this.user || {}

    const title = (
      <Button
        type="primary"
        onClick={() => {
          this.user = {} // 保存this中的user是一个空对象
          this.setState({isShow: true})
        }}
      >
        创建用户
      </Button>
    )
    return (
      <div>
        <Card title={title}>
          <Table
            bordered
            columns={this.columns}
            rowKey='_id'
            dataSource={users}
            pagination={{defaultPageSize: PAGE_SIZE, showQuickJumper: true}}
          />
          <Modal
            title={user._id ? '修改用户' : '添加用户'}
            visible={isShow}
            onCancel={() => this.setState({isShow: false})}
            onOk={this.addOrUpdateUser}
          >
            <UserForm setForm={form => this.form = form} user={user} roles={roles}/>
          </Modal>
        </Card>
      </div>
    )
  }
}


