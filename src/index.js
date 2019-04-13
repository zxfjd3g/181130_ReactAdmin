/*
入口js
 */
import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'

import storageUtil from './util/storageUtil'
import MemoryUtil from './util/MemoryUtils'

import App from './App'
import store from './redux/store'

// 将localStroage存储的user保存到内存中
const user = storageUtil.getUser()
if(user._id) { // 前面登陆过
  MemoryUtil.user = user
}

ReactDOM.render((
  // 所有容器组件都可以看到store
  <Provider store={store}>
    <App/>
  </Provider>
), document.getElementById('root'))