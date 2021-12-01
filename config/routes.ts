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
    access: 'routeFilter'
  },
  {
    name: '91',
    path: '/91',
    component: 'NineOne',
    layout: false,
    access: 'routeFilter'
  },
  {
    path: '/',
    redirect: '/welcome'
  },
  {
    component: './404'
  }
]
