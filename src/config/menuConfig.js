const menuList = [
  {  // <Menu.Item>
    title: '首页', // 菜单标题名称
    key: '/home', // 对应的path
    icon: 'home', // 图标名称
    isPublic: true, // 公开的, 所有人可见
  },
  { // <SubMenu>
    title: '商品',
    key: '/products',
    icon: 'appstore',
    children: [ // 子菜单列表
      { // <Item>
        title: '品类管理',
        key: '/category',
        icon: 'bars',
        /*children: [
          {
            title: 'xxx',
            key: '/xxx',
            icon: 'user'
          },
          {
            title: 'yyy',
            key: '/yyy',
            icon: 'user'
          }
        ]*/
      },
      {
        title: '商品管理',
        key: '/product',
        icon: 'tool'
      },
    ]
  },

  {
    title: '用户管理',
    key: '/user',
    icon: 'user'
  },
  {
    title: '角色管理',
    key: '/role',
    icon: 'safety',
  },

/*  {
    title: '订单管理',
    key: '/order',
    icon: 'safety',
  },*/

  {
    title: '图形图表',
    key: '/charts',
    icon: 'area-chart',
    children: [
      {
        title: '柱形图',
        key: '/charts/bar',
        icon: 'bar-chart'
      },
      {
        title: '折线图',
        key: '/charts/line',
        icon: 'line-chart'
      },
      {
        title: '饼图',
        key: '/charts/pie',
        icon: 'pie-chart'
      },
    ]
  },
]

export default menuList