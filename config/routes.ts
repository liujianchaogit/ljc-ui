export default [
  {
    path: '/',
    redirect: '/welcome'
  },
  {
    path: '/welcome',
    component: 'Welcome'
  },
  {
    path: '/account',
    routes: [
      {
        path: '/account/settings',
        component: 'Account/Settings'
      },
      {
        component: '404'
      }
    ]
  },
  {
    path: '/sys',
    routes: [
      {
        path: '/sys/user',
        component: 'Sys/User',
        access: 'userRouteFilter'
      },
      {
        path: '/sys/role',
        component: 'Sys/Role',
        access: 'roleRouteFilter'
      },
      {
        path: '/sys/menu',
        component: 'Sys/Menu',
        access: 'menuRouteFilter'
      },
      {
        component: '404'
      }
    ]
  },
  {
    path: '/user/login',
    component: 'User/login',
    layout: false
  },
  {
    path: '/fcw',
    component: 'Fcw',
    layout: false,
    access: 'fcwRouteFilter'
  },
  {
    component: '404'
  }
]
