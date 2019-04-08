import React, {Component} from 'react'
import {Row, Col, Modal} from 'antd'
import {withRouter} from 'react-router-dom'

import LinkButton from '../link-button'
import menuList from '../../config/menuConfig'
import {reqWeather} from '../../api'
import {formateDate} from '../../util/util'
import MemoryUtils from '../../util/MemoryUtils'
import storageUtil from '../../util/storageUtil'
import './index.less'

/*
头部组件
 */
class Header extends Component {

  state = {
    sysTime: formateDate(Date.now()),
    dayPictureUrl: '', // 天气图片的url
    weather: ''
  }

  /*
  发异步ajax获取天气数据并更新状态
   */
  getWeather = async () => {
    const {dayPictureUrl, weather} = await reqWeather('北京')
    this.setState({
      dayPictureUrl,
      weather
    })
  }

  /*
  启动循环定时器, 每隔1s更新一次sysTime
   */
  getSysTime = () => {
    this.intervalId = setInterval(() => {
      this.setState({
        sysTime: formateDate(Date.now())
      })
    }, 1000)
  }

  /*
  退出登陆
   */
  logout = () => {
    Modal.confirm({
      content: '确定退出吗?',
      onOk: () => {
        console.log('OK')
        // 移除保存的user
        storageUtil.removeUser()
        MemoryUtils.user = {}
        // 跳转到login
        this.props.history.replace('/login')
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }

  /*
  根据请求的path得到对应的标题
   */
  getTitle = (path) => {
    let title
    menuList.forEach(menu => {
      if(menu.key===path) {
        title = menu.title
      } else if (menu.children) {
        menu.children.forEach(item => {
          if(path.indexOf(item.key)===0) {
            title = item.title
          }
        })
      }
    })

    return title
  }

  componentDidMount () {
    this.getSysTime()
    this.getWeather()
  }

  componentWillUnmount () {
    // 清除定时器
    clearInterval(this.intervalId)
  }

  render() {
    const {sysTime, dayPictureUrl, weather} = this.state

    // 得到当前用户
    const user = MemoryUtils.user

    // 得到当前请求的路径
    const path  = this.props.location.pathname
    // 得到对应的标题
    const title = this.getTitle(path)

    return (
      <div className='header'>
        <Row className='header-top'>
          <span>欢迎，{user.username}</span>
          <LinkButton onClick={this.logout}>退出</LinkButton>
        </Row>
        <Row className='header-bottom'>
          <Col span={4} className='title'>{title}</Col>
          <Col span={20} className='weather'>
            <span className='date'>{sysTime}</span>
            <img className='weather-img' src={dayPictureUrl} alt="weather" />
            <span className='weather-detail'>{weather}</span>
          </Col>
        </Row>
      </div>
    )
  }
}

export default withRouter(Header)