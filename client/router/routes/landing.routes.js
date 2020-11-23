const brandName = `Share CV |`;

const landingRoutes = [
    {
        path: '/',
        name: 'landing-view',
        component: () => import('@/views/landing/LandingView'),
        meta: {
            layout: 'Landing',
            title: `${ brandName } Landing Page`,
        }
    },
    {
      path: '*',
      redirect: '/'
    }
]

export default landingRoutes;
