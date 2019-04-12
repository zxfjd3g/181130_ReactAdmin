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

// getWeather('北京')

// 获取分类列表
export const reqCategories = (parentId='0') => ajax('/manage/category/list', {parentId})

// 添加分类
export const reqAddCategory = (categoryName, parentId) => ajax('/manage/category/add', {categoryName, parentId}, 'POST')

// 更新分类
export const reqUpdateCategory = ({categoryId, categoryName}) => ajax('/manage/category/update', {categoryId, categoryName}, 'POST')

// 根据分类ID获取分类
export const reqCategory = (categoryId) => ajax('/manage/category/info', {categoryId})

// 获取商品分页列表
export const reqProducts = (pageNum, pageSize) => ajax('/manage/product/list', {pageNum, pageSize})

/*
搜索获取商品分页列表
pageSize: 每页的条目数
pageNum: 当前请求第几页 (从1开始)
searchType: productDesc / productName
searchName: 搜索的关键字
 */
export const reqSearchProducts = ({pageSize, pageNum, searchType, searchName}) => ajax('/manage/product/search', {
  pageSize,
  pageNum,
  [searchType]: searchName
})

/*
更新指定商品的状态
 */
export const reqUpdateProductStatus = ({productId, status}) => ajax('/manage/product/updateStatus', {productId, status}, 'POST')

/*
删除指定的上传的图片
 */
export const reqDeleteImg = (name) => ajax('/manage/img/delete', {name}, 'POST')

/*
添加/更新商品
 */
export const reqAddOrUpdateProduct = (product) => ajax('/manage/product/'+(product._id ? 'update' : 'add'), product, 'POST')/*

更新商品
 */
// export const reqUpdateProduct = (product) => ajax('/manage/product/update', product, 'POST')

// 添加角色
export const reqAddRole = (roleName) => ajax('/manage/role/add', {roleName}, 'POST')

// 获取角色列表
export const reqRoles = () => ajax('/manage/role/list')

// 更新角色(给角色设置权限)
export const reqUpdateRole = (role) => ajax('/manage/role/update', role, 'POST')


// 添加/更新用户
export const reqAddOrUpdateUser = (user) => ajax('/manage/user/'+(user._id ? 'update' : 'add'), user, 'POST')

// 获取用户列表
export const reqUsers = () => ajax('/manage/user/list')

// 删除用户
export const reqDeleteUser = (userId) => ajax('/manage/user/delete', {userId}, 'POST')