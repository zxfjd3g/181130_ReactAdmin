import React, {Component} from 'react'
import './index.less'

/*
通用的像链接的按钮的组件
 */
export default function LinkButton(props) { /*透传*/
  return <button {...props} className='link-button'/> /*将所有接收的属性全部传给button*/
}