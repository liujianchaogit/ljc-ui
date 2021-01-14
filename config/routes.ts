export default [
  {
    name: 'login',
    layout: false,
    path: '/user/login',
    component: './User/login',
  },
  {
    path: '/welcome',
    name: 'welcome',
    component: './Welcome',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    name: 'sysUser',
    path: '/sys/user',
    component: './Sys/user',
    access: 'userRouteFilter'
  },
  {
    name: 'sysRole',
    path: '/sys/role',
    component: './Sys/role',
    access: 'roleRouteFilter'
  },
  {
    name: 'sysMenu',
    path: '/sys/menu',
    component: './Sys/menu',
    access: 'menuRouteFilter'
  },
  {
    name: 'fcw',
    path: '/fcw',
    component: './Fcw',
    layout: false,
    access: 'fcwRouteFilter'
  },
  {
    component: './404',
  }
];
