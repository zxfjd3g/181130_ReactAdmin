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

## 说说对代理的理解
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