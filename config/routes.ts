export default [
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome'
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
    path: '/',
    redirect: '/welcome'
  },
  {
    component: './404'
  }
]
