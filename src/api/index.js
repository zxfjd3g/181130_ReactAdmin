/*
包含n个接口请求函数的模块
根据接口文档编写(一定要具备这个能力)
接口请求函数: 使用ajax(), 返回值promise对象
 */
import jsonp from 'jsonp'
import ajax from './ajax'
// const BASE = 'http://localhost:5000'
const BASE = ''

// 登陆
/*export function reqLogin(username, password) {
  return ajax('/login', {username, password}, 'POST')
}*/
export const reqLogin = (username, password) => ajax(BASE + '/login', {username, password}, 'POST')

/*
获取天气信息的jsonp请求
jsonp请求:
   解决get类型的ajax跨域请求
   浏览器端: 动态产生一个<script src="被请求的接口?callback=fn">, 浏览器会自动发送普通的http请求(定义好了回调函数)
   服务器端: 处理请求, 返回的函数调用的js语句(参数就是要返回的数据)
   浏览器端: 接收到响应后, 自动执行js代码, 调用前面准备好的回调函数
 */
export const getWeather = (city) => {

  return new Promise((resolve, reject) => {
    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    jsonp(url, {}, (err, data) => {
      if(!err && data.status==='success') {
        const {dayPictureUrl, weather} = data.results[0].weather_data[0]
        // 成功了, 调用resolve(), 并指定数据
        resolve({dayPictureUrl, weather})
      } else {
        // 失败了, 提示
        alert('获取天气数据失败')
      }
      // console.log('jsonp', err, data)
    })
  })
}

getWeather('北京')

