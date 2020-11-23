const brandName = `Share CV |`;

const withPrefix = (prefix, routes) => routes.map((route) => {
  route.path = prefix + route.path;

  return route;
});

const AppRoutes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    name: 'dashboard-view',
    component: () => import('@/views/app/DashboardView'),
    meta: {
      layout: 'App',
      title: `${ brandName } Dashboard`,
      isPrivate: true
    }
  },
    ...withPrefix('/auth', [
      {
        path: '/login',
        name: 'auth-login',
        component: () => import('@/views/app/UsersAuthView'),
        meta: {
          layout: 'Landing',
          title: `${ brandName } Logged In`,
          formType: 'Login',
          isPublic: true
        }
      },
      {
        path: '/register',
        name: 'auth-register',
        component: () => import('@/views/app/UsersAuthView'),
        meta: {
          layout: 'Landing',
          title: `${ brandName } Create new account`,
          formType: 'Register',
          isPublic: true
        }
      },
      {
        path: '/:action/complete',
        name: 'user-action-complete',
        component: () => import('@/views/app/UsersAuthView'),
        meta: {
          layout: 'Landing',
          title: `${ brandName } Action Complete`,
          formType: 'Action',
          isPublic: true
        }
      },
    ]),
  {
    path: '*',
    name: 'error-view',
    component: () => import('@/views/ErrorsView'),
    meta: {
      layout: 'Landing',
      title: 'Share CV | Error page'
    }
  }
]

export default AppRoutes;
