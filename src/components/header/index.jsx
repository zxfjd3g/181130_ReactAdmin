import React, {Component} from 'react'
import {Row, Col} from 'antd'
import {withRouter} from 'react-router-dom'

import menuList from '../../config/menuConfig'
import {formateDate} from '../../util/util'
import {getWeather} from '../../api'
import MemorUtils from '../../util/MemoryUtils'
import './index.less'
/*
头部
 */
class Header extends Component {

  state = {
    sysTime: formateDate(Date.now()),
    dayPictureUrl: '',
    weather: ''
  }

  /*
  异步获取天气
   */
  getWeather = async () => {
    const {dayPictureUrl, weather} = await getWeather('北京')
    this.setState({
      dayPictureUrl,
      weather
    })
  }

  /*
  根据请求的路径查找对应的title
   */
  getTitle = () => {
    // 当前请求的path
    const path = this.props.location.pathname
    /*menuList.forEach(item => {
      if(item.key===path) {
        return item.title
      }
    })*/
    for (var i = 0; i < menuList.length; i++) {
      const item = menuList[i]
      if(item.key===path) {
        return item.title
      } else if (item.children) {
        // 在children中找对应的item
        const cItem = item.children.find(cItem => path.indexOf(cItem.key)===0)
        if(cItem) {
          return cItem.title
        }
      }
    }
  }

  /*
  每隔1s获取一下当前时间
   */
  getSysTime = () => {
    this.intervalId = setInterval(() => {
      const sysTime = formateDate(Date.now())
      this.setState({
        sysTime
      })
    }, 1000)
  }

  // 在当前组件对象死亡前
  componentWillUnmount () {
    // 清除定时器
    clearInterval(this.intervalId)
  }

  componentDidMount () {
    this.getWeather()
    this.getSysTime()
  }


  render() {

    const {sysTime, dayPictureUrl, weather} = this.state

    // 获取当前登陆的用户名
    const username = MemorUtils.user.username

    const title = this.getTitle()

    return (
      <div className='header'>
        <div className="header-top"><span>欢迎，{username}</span>
          <a href='javascript:' style={{marginLeft: 10}}>退出</a>
        </div>
        <Row className='header-bottom'>
          <Col span={4} className='title'>
            {title}
          </Col>
          <Col span={20} className='weather'>
            <span className='date'>{sysTime}</span>
            <img className='weather-img' src={dayPictureUrl} alt="weather"/>
            <span className='weather-detail'>{weather}</span>
          </Col>
        </Row>
      </div>
    )
  }
}

export default withRouter(Header)