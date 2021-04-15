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
    name: 'fcw',
    path: '/fcw',
    component: 'Fcw',
    layout: false,
    access: 'fcwRouteFilter'
  },
  {
    component: '404'
  }
]
