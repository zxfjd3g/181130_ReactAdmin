# 接口文档

## 目录：
	1). 登陆
	2). 添加用户
	3). 更新用户
	4). 获取所有用户列表
	5). 删除用户
	6). 获取一级或某个二级分类列表
	7). 添加分类
	8). 更新品类名称
	9). 根据分类ID获取分类
	10). 获取商品分页列表
	11). 根据ID/Name搜索产品分页列表
	12). 添加商品
	13). 更新商品
	14). 对商品进行上架/下架处理
	15). 上传图片
	16). 删除图片
	17). 添加角色
	18). 获取角色列表
	19). 更新角色(给角色设置权限)
	20). 获取天气信息(jsonp)

## 1. 登陆

### 请求URL：
	http://localhost:5000/login

### 请求方式：
	POST

### 参数类型

	|参数		|是否必选 |类型     |说明
	|username    |Y       |string   |用户名
	|password    |Y       |string   |密码

### 返回示例：
	成功:
      {
        "status": 0,
        "data": {
          "_id": "5c3b297dea95883f340178b0",
          "password": "21232f297a57a5a743894a0e4a801fc3",
          "username": "admin",
          "create_time": 1547381117891,
          "__v": 0,
          "role": {
            "menus": []
          }
        }
      }
	失败
	  {
        "status": 1,
        "msg": "用户名或密码不正确!"
      }

## 2. 添加用户

### 请求URL：
	http://localhost:5000/manage/user/add

### 请求方式：
	POST

### 参数类型

	|参数		|是否必选 |类型     |说明
	|username    |Y       |string   |用户名
	|password    |Y       |string   |密码
	|phone       |N       |string   |手机号
	|email       |N       |string   |邮箱
	|role_id     |N       |string   |角色ID

### 返回示例：
	成功:
	  {
        "status": 0,
        "data": {
          "_id": "5c3b382c82a14446f4ffb647",
          "username": "admin6",
          "password": "d7b79bb6d6f77e6cbb5df2d0d2478361",
          "phone": "13712341234",
          "email": "test@qq.com",
          "create_time": 1547384876804,
          "__v": 0
        }
      }
	失败
	  {
        "status": 1,
        "msg": "此用户已存在"
      }

## 3. 更新用户
### 请求URL：
	http://localhost:5000/manage/user/update

### 请求方式：
	POST

### 参数类型

	|参数		|是否必选 |类型     |说明
	|_id         |Y       |string   |ID
    |username    |Y       |string   |用户名
    |password    |Y       |string   |密码
    |phone       |N       |string   |手机号
    |email       |N       |string   |邮箱
    |role_id     |N       |string   |角色ID

### 返回示例：
	成功:
	  {
        "status": 0,
        "data": {
          "_id": "5c3b382c82a14446f4ffb647",
          "username": "admin6",
          "password": "d7b79bb6d6f77e6cbb5df2d0d2478361",
          "phone": "13712341234",
          "email": "test@qq.com",
          "create_time": 1547384876804,
          "__v": 0
        }
      }
	失败
	  {
        "status": 1,
        "msg": "此用户已存在"
      }
    
## 4. 获取所有用户列表
## 5. 删除用户
## 6. 获取一级或某个二级分类列表
### 请求URL：
	http://localhost:5000/manage/category/list

### 请求方式：
	GET

### 参数类型: query

	|参数		|是否必选 |类型     |说明
	|parentId    |Y       |string   |父级分类的ID

### 返回示例：
    一级分类:
      {
        "status": 0,
        "data": [
          {
            "parentId": "0",
            "_id": "5c2ed631f352726338607046",
            "name": "分类001",
            "__v": 0
          },
          {
            "parentId": "0",
            "_id": "5c2ed647f352726338607047",
            "name": "分类2",
            "__v": 0
          },
          {
            "parentId": "0",
            "_id": "5c2ed64cf352726338607048",
            "name": "1分类3",
            "__v": 0
          }
        ]
      }
    二级分类
      {
        "status": 0,
        "data": [
          {
            "parentId": "5c2ed64cf352726338607048",
            "_id": "5c2ed65df352726338607049",
            "name": "分类3333",
            "__v": 0
          },
          {
            "parentId": "5c2ed64cf352726338607048",
            "_id": "5c2ed66ff35272633860704a",
            "name": "分类34",
            "__v": 0
          }
        ]
      }
  
      
## 7. 添加分类
### 请求URL：
    http://localhost:5000/manage/category/add

### 请求方式：
    POST

### 参数类型:

    |参数		|是否必选 |类型     |说明
    |parentId      |Y       |string   |父级分类的ID
    |categoryName  |Y       |string   |名称

### 返回示例：
    添加一级分类:
        {
          "status": 0,
          "data": {
            "parentId": "0",
            "_id": "5c3ec1534594a00e5877b841",
            "name": "分类9",
            "__v": 0
          }
        }
    添加二级分类
        {
          "status": 0,
          "data": {
            "parentId": "5c2ed64cf352726338607048",
            "_id": "5c3ec1814594a00e5877b842",
            "name": "分类39",
            "__v": 0
          }
        }
          

## 8. 更新品类名称
### 请求URL：
    http://localhost:5000/manage/category/update

### 请求方式：
    POST

### 参数类型:

    |参数		|是否必选 |类型     |说明
    |categoryId    |Y       |string   |父级分类的ID
    |categoryName  |Y       |string   |名称

### 返回示例：
    {
      "status": 0
    }


## 9. 根据分类ID获取分类
### 请求URL：
    http://localhost:5000/manage/category/info

### 请求方式：
    GET

### 参数类型:

    |参数		|是否必选 |类型     |说明
    |categoryId    |Y       |string   |父级分类的ID

### 返回示例：
    {
      "status": 0,
      "data": {
        "parentId": "0",
        "_id": "5c2ed631f352726338607046",
        "name": "分类001",
        "__v": 0
      }
    }
    

## 10. 获取商品分页列表
## 11. 根据ID/Name搜索产品分页列表
## 12. 添加商品
## 13. 更新商品
## 14. 对商品进行上架/下架处理
## 15. 上传图片
## 16. 删除图片
## 17. 添加角色
## 18. 获取角色列表
## 19. 更新角色(给角色设置权限)
## 20. 获取天气信息(jsonp)
