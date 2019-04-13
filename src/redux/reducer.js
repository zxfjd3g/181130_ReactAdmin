/*
包含n个reducer函数的模块
 */
import {combineReducers} from 'redux'

import {
  SET_MENU_TITLE,
  RECEIVE_USER,
  ERROR_MSG,
  RESET_USER
} from './action-types'

/*
用来管理当前菜单标题的redcuer
 */
import storageUtil from "../util/storageUtil";

const initMenuTitle = ''
function menuTitle(state=initMenuTitle, action) {
  switch (action.type) {
    case SET_MENU_TITLE:
      return action.menuTitle
    default:
      return state
  }
}

/*
用来管理当前登陆用户的redcuer
 */
const initUser = storageUtil.getUser()
function user(state=initUser, action) {
  switch (action.type) {
    case RECEIVE_USER:
      return action.data
    case ERROR_MSG:
      return {...state, errorMsg: action.data}
    case RESET_USER:
      return {}
    default:
      return state
  }
}

/*
combineReducers: 整合多个reducer生成一个新的reducer
整合后的state的结构: 永远是对象
    {
      menuTitle: '',
      user: {}
    }
 */
const reducer = combineReducers({
  menuTitle,
  user
})
export default reducer