/*
用来发送ajax请求的函数模块
封装axios + Promise
函数的返回值是promise对象  ===> 后面用上async/await

自己创建Promise
  1. 内部统一处理请求异常: 外部的调用都不用使用try..catch来处理请求异常
  2. 异步返回是响应数据(而不是响应对象): 外部的调用异步得到的就直接是数据了(response --> response.data)
 */
import axios from 'axios'
import {message} from 'antd'

export default function ajax(url, data = {}, type = "GET") {  // 形参默认值

  return new Promise((resolve, reject) => {
    let promise
    // 执行异步ajax请求
    if (type === 'GET') {
      promise = axios.get(url, { // 配置对象
        // 指定包含所有query参数数据的对象
        params: data
      })
    } else {
      promise = axios.post(url, data)
    }

    promise.then(response => {
      // 请求成功, 调用resolve()并传递成功的数据
      resolve(response.data)
    }).catch(error => {
      //  请求失败了, 不调用reject(), 显示请求错误的提示
      // reject(error) // 不要调用
      message.error('请求异常: ' + error.message)
    })


  })


}


async function login() {
  // const response = await ajax('/xxx', {username: 'Tom', password: '123'}, 'POST')
  // const result = response.data
  const result = await ajax('/xxx', {username: 'Tom', password: '123'}, 'POST')

  if(result.status===0) { // 成功了

  } else { // 失败了

  }
}

