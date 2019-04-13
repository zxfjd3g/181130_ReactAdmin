/*
入口js
 */
import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'

import App from './App'
import store from './redux/store'

ReactDOM.render((
  // 所有容器组件都可以看到store
  <Provider store={store}>
    <App/>
  </Provider>
), document.getElementById('root'))