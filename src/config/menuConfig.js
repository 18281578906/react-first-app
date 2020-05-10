const menuList = [
  {
    title: '首页',
    key: '/admin/home'
  },
  {
    title: '人员管理',
    key: '/admin/user',
    children: [
      {
        title: '员工列表',
        key: '/admin/user/staffList'
      },
      {
        title: '管理员列表',
        key: '/admin/user/adminList'
      },
      {
        title: '用户列表',
        key: '/admin/user/userList'
      }
    ]
  },
  {
    title: '电影管理',
    key: '/admin/movie',
    children: [
      {
        title: '电影列表',
        key: '/admin/movie/movieList'
      },
      {
        title: '测试',
        key: '/admin/movie/test'
      }
    ]
  },
  {
    title: '订单管理',
    key: '/admin/order',
    children: [
      {
        title: '电影订单列表',
        key: '/admin/order/orderList'
      },
      {
        title: '小食订单列表',
        key: '/admin/order/orderSnackList'
      }
    ]
  },
  {
    title: '统计',
    key: '/admin/charts',
  },
  {
    title: '权限设置',
    key: '/admin/permission'
  }
];
export default menuList;
