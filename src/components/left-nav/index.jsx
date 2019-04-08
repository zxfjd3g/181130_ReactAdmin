import React, {Component} from 'react'
import {Menu, Icon} from 'antd'
import {Link} from 'react-router-dom'
import './index.less'
import menuList from '../../config/menuConfig'
import logo from '../../assets/images/logo.png'

const SubMenu = Menu.SubMenu
const Item = Menu.Item

/*
左侧导航
 */
export default class LeftNav extends Component {

  /*
  返回包含n个<Item>和<SubMenu>的数组
  */
  getMenuNodes = () => {
    return menuList.map(item => {
      if(!item.children) { // 没有子节点
        return (
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        )
      } else {
        return (
          <SubMenu key={item.key} title={<span><Icon type={item.icon} /><span>{item.title}</span></span>}>
            {
              item.children.map(cItem => (
                <Menu.Item key={cItem.key}>
                  <Link to={cItem.key}>
                    <Icon type={cItem.icon} />
                    <span>{cItem.title}</span>
                  </Link>
                </Menu.Item>
              ))
            }
          </SubMenu>
        )
      }
    })
  }

  render() {
    return (
      <div className='left-nav'>

        <Link className='logo' to='/home'>
          <img src={logo} alt="logo"/>
          <h1>硅谷后台</h1>
        </Link>

        <Menu
          mode="inline"
          theme="dark"
          defaultSelectedKeys={['7']}
          defaultOpenKeys={['sub1']}
        >
          {
            this.getMenuNodes()
          }
        </Menu>
      </div>
    )
  }
}