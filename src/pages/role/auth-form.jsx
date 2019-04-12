import React, {Component} from 'react'
import {Form, Input, Tree} from 'antd'
import menuList from '../../config/menuConfig'

const { TreeNode } = Tree

/*
给角色授权的form组件
 */
export default class AuthForm extends Component {


  /*
  获取所有树的节点数组 (使用递归)
   */
  getTreeNodes = (list) => {
    return list.map(item => {
      return (
        <TreeNode title={item.title} key={item.key}>
          {item.children ? this.getTreeNodes(item.children) : null}
        </TreeNode>
      )
    })
  }

  render() {

    const formItemLayout = {
      labelCol: {span: 5},
      wrapperCol: {span: 16}
    }

    return (
      <Form>
        <Form.Item label="角色名称" {...formItemLayout}>
          <Input type="text" placeholder="请输入角色名称" disabled={true}/>
        </Form.Item>

        <Tree
          checkable // 节点是否是可选的
          defaultExpandAll // 默认是全部打开的
        >
          <TreeNode title="平台权限" key="all">
            {
              this.getTreeNodes(menuList)
            }
          </TreeNode>
        </Tree>
      </Form>
    )
  }
}