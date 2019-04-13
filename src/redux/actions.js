/*
包含n个生成action的action creator函数的模块
 */
import {
  SET_MENU_TITLE,
  RECEIVE_USER,
  ERROR_MSG,
  RESET_USER
} from './action-types'
import storageUtil from "../util/storageUtil"
import {reqLogin} from '../api'

/*
有几个type, 就会有几个同步action
 */

/*
设置菜单标题的同步action
 */
export const setMenuTitle = (menuTitle) => ({type: SET_MENU_TITLE, menuTitle})

/*
接收用户的同步action
 */
const receiveUser = (user) => ({type: RECEIVE_USER, data: user})

/*

 */
const errorMsg = (msg) => ({type: ERROR_MSG, data: msg})

/*
登陆的异步action
 */
export function login (username, password) {
  return async dispatch => {
    // 1. 异步请求登陆
    const result = await reqLogin(username, password)

    if(result.status===0) {
      const user = result.data
      // 将user保存到local
      storageUtil.saveUser(user)
      // 2.1 如果成功了, 分发一个接收user的同步action
      dispatch(receiveUser(user))
    } else {
      // 2.2 如果失败了, 分发一个接收errorMsg的同步action
      dispatch(errorMsg(result.msg))
    }
  }
}

/*
退出登陆的同步action
 */
export const logout = () => {
  storageUtil.removeUser()
  return {
    type: RESET_USER
  }
}