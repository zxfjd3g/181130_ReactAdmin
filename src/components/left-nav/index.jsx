import React, {Component} from 'react'
import {Menu, Icon} from 'antd'
import {Link, withRouter} from 'react-router-dom'
import './index.less'
import menuList from '../../config/menuConfig'
import logo from '../../assets/images/logo.png'

const SubMenu = Menu.SubMenu
const Item = Menu.Item

/*
左侧导航
 */
class LeftNav extends Component {

  /*
  返回包含n个<Item>和<SubMenu>的数组
  1. 使用arr的map()实现二级菜单
  2. 使用arr的reduce()实现二级菜单
      arr.reduce((pre, item) => pre + (item%2===0 ? item : 0), 0)
  3. 使用arr的reduce() + 递归实现三级菜单
  */

  getMenuNodes = (list) => {
    return list.reduce((pre, item) => {
      if(!item.children) {
        pre.push((
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        ))
      } else {// item有children才去递归调用

        // 确定openKey的值, 并保存到组件对象
        const path = this.props.location.pathname
        const cItem = item.children.find(cItem => cItem.key===path)
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
    this.menuNodes = this.getMenuNodes(menuList)
  }

  render() {

    // 获取<menu>所有子节点
    const menuNodes = this.menuNodes
    console.log('LeftNav render()', menuNodes)

    // 得到请求的路由路径
    const selectKey = this.props.location.pathname
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
export default withRouter(LeftNav)