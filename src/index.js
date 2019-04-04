/*
入口js
 */
import React from 'react'
import ReactDOM from 'react-dom'

import storageUtil from './util/storageUtil'
import MemoryUtil from './util/MemoryUtils'

import App from './App'

// 将localStroage存储的user保存到内存中
const user = storageUtil.getUser()
if(user._id) { // 前面登陆过
  MemoryUtil.user = user
}



ReactDOM.render(<App/>, document.getElementById('root'))