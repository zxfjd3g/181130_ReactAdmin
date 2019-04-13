# day01
## 1. 启动项目开发
    1). 使用react脚手架创建项目
    2). 开发环境运行: npm start
    3). 生产环境打包运行: npm run build   serve build

## 2. 创建项目的基本结构
    index.js: 入口js
    App.js: 应用的根组件
    pages: 路由组件
    components: 非路由组件
    api: ajax请求的模块
    
## 3. 引入antd
    下载antd的包
    按需打包: 只打包import引入组件的js/css
        下载工具包
        config-overrides.js
        package.json
    自定义主题
        下载工具包
        config-overrides.js
    使用antd的组件
        根据antd的文档编写
        
## 4. 引入路由
    下载包: react-router-dom
    拆分应用路由:
      Login: 登陆
      Admin: 后台管理界面
    注册路由:
      <BrowserRouter>
      <Switch>
      <Route path='' component={}/>
      
## 5. Login的静态组件
    1). 自定义了一部分样式布局
    2). 使用antd的组件实现登陆表单界面
      Form  / Form.Item
      Input
      Icon
      Button

## 6. git管理项目
    1). 创建远程仓库
    2). 创建本地仓库
        a. 配置.gitignore
        b. git init
        c. git add .
        d. git commit -m "init"
    3). 将本地仓库推送到远程仓库
        git remote add origin url
        git push origin master
    4). 在本地创建dev分支, 并推送到远程
        git checkout -b dev
        git push origin dev
    5). 如果本地有修改
        git add .
        git commit -m "xxx"
        git push origin dev
    6). 如果远程修改
        git pull origin dev
    7). 新的同事: 克隆仓库
        git clone url
        git checkout -b dev origin/dev
        git pull origin dev

## 6. 收集表单数据和表单的前台验证
    1). 高阶函数
        a. 接收的参数是函数
        b. 返回值是函数
    2). 高阶组件:  本质上就是一个函数
        接收一个组件/组件标签, 返回一个新的组件/组件标签
    3). form对象
        如何让包含<Form>的组件得到form对象?  WrapLoginForm = Form.create()(LoginForm)
        WrapLoginForm是LoginForm的父组件, 给LoginForm传入form对象类型的属性
        用到了高阶函数和高阶组件的技术
    4). 操作表单数据
        form.getFieldDecorator('标识名称', {initialValue: 初始值})(<Input/>)包装表单项组件标签
        form.getFieldsValue(): 得到包含所有输入数据的对象
        form.resetFieldsValue(): 重置输入的值
    5). 前台表单验证
        1). 声明式实时表单验证:
          form.getFieldDecorator('标识名称', {rules: [{min: 4, message: '错误提示信息'}]})(<Input/>)
        2). 编程式自定义表单验证
          form.getFieldDecorator('标识名称', {rules: [{validator: this.validatePwd}]})(<Input/>)
          validatePwd = (rule, value, callback) => {
            if(有问题) callback('错误提示信息') else callack()
          } 
        3).点击提示时统一验证
          form.validateFields((error) => {
            if(!error) {通过了验证, 发送ajax请求}
          })

# day02

## 1. 后台应用
    启动后台应用: mongodb服务必须启动
    使用postman测试接口(根据接口文档):
        访问测试: post请求的参数在body中设置
        添加
        导出/导入
## 2. 编写ajax代码
    1). ajax请求函数模块: api/ajax.js
        封装axios + Promise
        函数的返回值是promise对象  ===> 后面用上async/await
        自己创建Promise
          1. 内部统一处理请求异常: 外部的调用都不用使用try..catch来处理请求异常
          2. 异步返回是响应数据(而不是响应对象): 外部的调用异步得到的就直接是数据了(response --> response.data)
    2). 接口请求函数模块: api/index.js
        根据接口文档编写(一定要具备这个能力)
        接口请求函数: 使用ajax(), 返回值promise对象
    3). 解决ajax跨域请求问题
        办法: 配置代理  ==> 只能解决开发环境
        编码: package.json: proxy: "http://localhost:5000"
    4). 对代理的理解
        1). 是什么?
            具有特定功能的程序
        2). 运行在哪?
            前台应用端
            只能在开发时使用
        3). 作用?
            解决开发时的ajax请求跨域问题
            a. 监视并拦截请求(3000)
            b. 转发请求(4000)
        4). 配置代理
            告诉代理服务器一些信息: 转发的目标地址
            开发环境: 前端工程师
            生产环境: 后端工程师

## 3. 实现登陆(包含自动登陆)
    login.jsx
        1). 调用登陆的接口请求
        2). 如果失败, 显示错误提示信息  (errorMsg的状态)
        3). 如果成功了:
            保存user到local/内存中
            跳转到admin
        4). 如果内存中的user有值, 自动跳转到admin
    src/index.js
        读取local中user到内存中保存
    admin.jsx
        判断如果内存中没有user(_id没有值), 自动跳转到login
    storageUtil.js
        包含使用localStorage来保存user相关操作的工具模块
        使用第三库store
            简化编码
            兼容不同的浏览器
    MemoryUtils.js
        用来在内存中保存数据(user)的工具类
        
## 4. 搭建admin的整体界面结构
    1). 拆分组件
        LeftNav: 左侧导航
        Header: 右侧头部
        Footer: 右侧底部
    2). 使用antd的layout进行整体布局
    3). 子路由
        定义路由组件
        注册路由
        
# day03
## 1. LeftNav组件
    1). 使用antd的组件
        Menu / Item / SubMenu
    
    2). 使用react-router
        withRouter(): 包装非路由组件, 给其传入history/location/match属性
        history: push()/replace()/goBack()
        location: pathname属性
        match: params属性
    
    3). componentWillMount与componentDidMount的比较
        componentWillMount: 在第一次render()前调用一次, 为第一次render()准备数据(同步)
        componentDidMount: 在第一次render()之后调用一次, 启动异步任务, 后面异步更新状态重新render
    
    4). 根据动态生成Item和SubMenu的数组
        arr.map(): 二级菜单
        arr.reduce(): 二级菜单
        arr.reduce() + 递归调用: 任意多级菜单
    
    5). 2个问题?
        刷新时如何选中对应的菜单项?
        刷新子菜单路径时, 自动打开子菜单列表?
        
## 2. Header组件
    1). 获取登陆用户的名称显示: MemoryUtils
    
    2). 天气预报
        使用jsonp库发jsonp请求百度天气预报接口
        对jsonp请求的理解
        
    3). 当前时间
        循环定时器, 每隔1s更新当前时间状态
        格式化指定时间
        
    4). 当前导航项的标题
        得到当前请求的路由path: 包装成路由组件获取
        根据path在menuList中遍历查找对应的item的title
        
## 3. Category组件
    1). 相关接口请求函数
        获取分类列表
        获取指定分类
        添加分类
        更新分类
        
    2). 使用antd组件构建界面
        Card
        Table
        Button
        Icon
    
    3). 异步获取一级分类列表显示
        设计一级分类列表的状态: categories
        异步获取一级分类列表
        更新状态, 显示

    4). 显示二级分类
        设计状态: subCategories / parentId / parentName
        显示二级分类列表
            根据parentId状态值, 异步获取分类列表
        setState()的问题
            1. setState()的语法
              setState({}, [callback])
              setState((state, props) => ({}), [callback])
            2. setState()的特点
              它是异步的, 并不会立即更新状态
              在相同的周期中多次调用会被合并到一起处理
              callback在状态更新且界面更新之后执行
              
    5). 抽取通用的类链接按钮组件
        通过...透传所有接收的属性: <Button {...props} />    <LinkButton>xxxx</LinkButton>
        组件标签的所有子节点都会成为组件的children属性
        
# day04
## 1. 添加分类
    1). 界面
        antd组件: Modal, Form, Select, Input
        显示/隐藏: showStatus状态为1/0
        
    2). 功能
        父组(Category)件得到子组件(AddForm)的数据(form)
        调用添加分类的接口
        重新获取分类列表

## 2. 更新分类
    1). 界面
        antd组件: Modal, Form, Input
        显示/隐藏: showStatus状态为2/0
        
    2). 功能
        父组(Category)件得到子组件(AddForm)的数据(form)
        调用更新分类的接口
        重新获取分类列表
        
        
# day05
## 0. 分页
    1). 前台分页
      一次请求获取: 所有数据的列表, 分页的页码是统计所有数据进行显示
      翻页时: 不发请求
    2). 后台分页
      一次请求获取: 当前页数据列表(还要有总数量), 请求时需要携带参数: 页码pageNum/每页的条目数pageSize
      翻页时: 再次请求获取对应页的数据列表
    3). 如何选择
      数据量确实非常大: 优先考虑后台分页
      
## 1. Product
    配置其子路由: <Route> / <Switch> / <Redirect> /exact属性
    路由配置的逻辑

## 2. ProductIndex
    1). 分页显示
        界面: <Card> / <Table> / Select / Icon / Input / Button
        状态: products / total
        接口请求函数需要的数据: pageNum, pageSize
        异步获取第一页数据显示
            调用分页的接口请求函数, 获取到当前页的products和总记录数total
            更新状态: products / total
        翻页:
            绑定翻页的监听, 监听回调需要得到pageNum
            异步获取指定页码的数据显示  
      
    2). 搜索分页
        接口请求函数需要的数据: 
            pageSize: 每页的条目数
            pageNum: 当前请求第几页 (从1开始)
            productDesc / productName: searchName 根据商品描述/名称搜索
        状态:  searchType / searchName  / 在用户操作时实时收集数据
        异步搜索显示分页列表
            如果searchName有值, 调用搜索的接口请求函数获取数据并更新状态
            
    3). 更新商品的状态
        初始显示: 根据product的status属性来显示  status = 1/2
        点击切换:
            绑定点击监听
            异步请求更新状态
    
    4). 进入详情界面
        history.push('/product/detail', {product})
    
    5). 进入添加界面
         history.push('/product/addupdate')

## 3. ProductDetail
    1). 读取商品数据: location.state.product
    2). 显示商品信息
    3). 异步显示商品所属分类的名称
        pCategoryId==0 : 异步获取categoryId的分类名称
        pCategoryId!=0: 异步获取 pCategoryId/categoryId的分类名称
    4). Promise.all([promise1, promise2])
        返回值是promise
        异步得到的是所有promsie的结果的数组
        特点: 一次发多个请求, 只有当所有请求都成功, 才成功, 并得到成功的数据,一旦有一个失败, 整个都失败


# day06
## 1. ProductAddUpdate
    1). ant组件
        Card / Form / Input / Cascader / Button
        FormItem的label标题和layout
        Cascader级联的显示和动态加载下级列表数据
    2). 添加
        通过form对象收集输入数据
        父组件调用子组件对象的方法
        调用商品添加的接口请求函数
        成功后跳转界面
    3). 更新
    
## 2. PicturesWall
    1). antd组件
        Upload / Modal / Icon
        根据示例DEMO改造编写
    2). 上传图片
        在<Upload>上配置接口的path和请求参数名
        监视文件状态的改变: 上传中 / 上传完成/ 删除
        在上传成功时, 保存好相关信息: name / url
        为父组件提供获取已上传图片文件名数组的方法
    3). 删除图片
        当文件状态变为删除时, 调用删除图片的接口删除上传到后台的图片

## 3. RichTextEditor
    使用基于react的富文本编程器插件库: react-draft-wysiwyg
    根据文档中的DEMO编写


# day07
## 1. 商品修改
    1). 商品分类的默认选中
        如果当前商品是一个2级分类下的商品
    2). 商品图片的默认显示
        将商品的imgs传入图片上传组件
        图片上传组件中读取imgs转换为fileList状态显示
    3). 商品详情的默认显示
        将商品的detail传入富文本组件
        富文本组件内读取detail并转换为editorState状态显示
    4). 更新商品
        收集数据封装成product对象, 要指定_id属性
        调用更新的接口请求更新, 并返回商品列表界面

## 2. 角色管理
    1). 角色前台分页显示
    2). 添加角色
    3). 给指定角色授权
        界面: Tree
        选择Node时, 更新menus, 但不能直接更新role中menus
        点击cancel, 设置menus为role.menus的值
        确定时: role.menus=menus, 请求更新role
   
## 3. 用户管理
    1). 添加用户
    2). 修改用户
    3). 删除用户


## 4. 权限管理


PureComponent
Component
setState(): 异步/合并更新, 同步更新
shouldComponentUpdate()

      
