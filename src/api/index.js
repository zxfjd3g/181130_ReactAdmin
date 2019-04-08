/*
包含n个接口请求函数的模块
根据接口文档编写(一定要具备这个能力)
接口请求函数: 使用ajax(), 返回值promise对象
 */
import ajax from './ajax'
// const BASE = 'http://localhost:5000'
const BASE = ''

// 登陆
/*export function reqLogin(username, password) {
  return ajax('/login', {username, password}, 'POST')
}*/
export const reqLogin = (username, password) => ajax(BASE + '/login', {username, password}, 'POST')


// 获取一级或某个二级分类列表
export const reqCategorys = (parentId = '0') => ajax('/manage/category/list', {parentId})

// 添加分类
export const reqAddCategory = (parentId, categoryName) => ajax('/manage/category/add', {
  parentId,
  categoryName
}, 'POST')

// 更新品类名称
export const reqUpdateCategory = ({categoryId, categoryName}) => ajax('/manage/category/update', {
  categoryId,
  categoryName
}, 'POST')
