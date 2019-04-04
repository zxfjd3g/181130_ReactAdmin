/*
包含n个操作local storage的工具函数的模块
 */
import store from 'store'

const USER_KEY = 'user_key'

export default {
  saveUser (user) {
    // localStroage只能保存string, 如果传递是对象, 会自动调用对象的toString()并保存
    //localStorage.setItem(USER_KEY, JSON.stringify(user)) // 保存的必须是对象的json串
    store.set(USER_KEY, user) // 内部会自动转换成json再保存
  },

  getUser () { // 如果存在, 需要返回的是对象, 如果没有值, 返回{}
    // return JSON.parse(localStorage.getItem(USER_KEY) || '{}') // [object, Object]
    return store.get(USER_KEY) || {}
  },

  removeUser () {
    // localStorage.removeItem(USER_KEY)
    store.remove(USER_KEY)
  }
}

