import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Menu, Icon} from 'antd'
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

import './index.less'
import menuList from '../../config/menuConfig'
import logo from '../../assets/images/logo.png'
import MemoryUtils from "../../util/MemoryUtils"
import {setMenuTitle} from '../../redux/actions'

const SubMenu = Menu.SubMenu
const Item = Menu.Item

/*
左侧导航
 */
class LeftNav extends Component {

  static propTypes = {
    setMenuTitle: PropTypes.func.isRequired
  }

  /*
  判断当前用户是否有指定item对应的权限
   */
  hasAuth = (item) => {

    /*
    1. item是公开的
    2. 当前用户是admin
    3. 当前用户的权限key集合中包含item的key
     */
    if(item.isPublic || MemoryUtils.user.username==='admin' || this.menuSet.has(item.key)) {
      return true
      // 如果当前用户有item的children中的某个子节点的权限
    } else if (item.children && item.children.find(cItem => this.menuSet.has(cItem.key))) {
      return true
    }

    return false
  }

  /*
  返回包含n个<Item>和<SubMenu>的数组
  1. 使用arr的map()实现二级菜单
  2. 使用arr的reduce()实现二级菜单
      arr.reduce((pre, item) => pre + (item%2===0 ? item : 0), 0)
  3. 使用arr的reduce() + 递归实现三级菜单
  */

  getMenuNodes = (list) => {
    // 当前请求的path路径
    const path = this.props.location.pathname

    return list.reduce((pre, item) => { // item ==> MenuItem/ SubMenu
      // 如果当前用户有item对应的权限才进入
      if(this.hasAuth(item)) {
        if(!item.children) {

          // 找到与我当前path匹配的item, item的title就是我的menuTitle
          if(path.indexOf(item.key)===0) {
            const menuTitle = item.title
            // 将menuTitle保存到redux的状态中
            this.props.setMenuTitle(menuTitle)
          }

          pre.push((
            <Menu.Item key={item.key}>
              <Link to={item.key} onClick={() => this.props.setMenuTitle(item.title)}>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </Link>
            </Menu.Item>
          ))
        } else {// item有children才去递归调用

          // 确定openKey的值, 并保存到组件对象
          const cItem = item.children.find(cItem => path.indexOf(cItem.key)===0)
          if(cItem) {
            const openKey = item.key
            this.openKey = openKey
          }


          pre.push((
            <SubMenu key={item.key} title={<span><Icon type={item.icon} /><span>{item.title}</span></span>}>
              {
                this.getMenuNodes(item.children)
              }
            </SubMenu>
          ))
        }
      }
      return pre
    }, [])
  }

  getMenuNodes_reduce = () => {
    return menuList.reduce((pre, item) => {
      if(!item.children) { // 添加<Item>
        pre.push((
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        ))
      } else { // 添加<SubMenu>
        pre.push((
          <SubMenu key={item.key} title={<span><Icon type={item.icon} /><span>{item.title}</span></span>}>
            {
              item.children.reduce((pre, cItem) => {
                pre.push((
                  <Menu.Item key={cItem.key}>
                    <Link to={cItem.key}>
                      <Icon type={cItem.icon} />
                      <span>{cItem.title}</span>
                    </Link>
                  </Menu.Item>
                ))
                return pre
              }, [])
            }
          </SubMenu>
        ))
      }

      return pre

    }, [])
  }


  getMenuNodes_map = () => {
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


  /*
  在第一次render()前调用一次
  componentWillMount: 在第一次render()前调用一次, 为第一次render()准备数据(同步)
  componentDidMount: 在第一次render()之后调用一次, 启动异步任务, 后面异步更新状态重新render
  */
  componentWillMount () {

    // 得到当前用户的权限menus, 并封装成set保存
    this.menuSet = new Set(MemoryUtils.user.role.menus || [])

    this.menuNodes = this.getMenuNodes(menuList)
  }

  render() {

    // 获取<menu>所有子节点
    const menuNodes = this.menuNodes
    console.log('LeftNav render()', menuNodes)

    // 得到请求的路由路径
    let selectKey = this.props.location.pathname
    // 如果请求的路径是商品的子路由路径, selectKey置为商品的key
    if(selectKey.indexOf('/product/')===0) {
      selectKey = '/product'
    }
    const openKey = this.openKey

    return (
      <div className='left-nav'>

        <Link className='logo' to='/home'>
          <img src={logo} alt="logo"/>
          <h1>硅谷后台</h1>
        </Link>

        {/*
        defaultSelectedKey: 只有第一次指定有效果
        */}
        <Menu
          mode="inline"
          theme="dark"
          selectedKeys={[selectKey]}
          defaultOpenKeys={[openKey]}
        >
          {
            menuNodes
          }
        </Menu>
      </div>
    )
  }
}

/*
withRouter(): 高阶组件
接收的是非路由组件: LeftNav
返回的是包装产生的新组件: 向LeftNav中传入history/location/match三个属性
 */
export default withRouter(connect(
  state => ({}),
  {setMenuTitle}
)(LeftNav))