import Vue from 'vue';
import VueRouter from "vue-router";

import AppRoutes from '@/router/routes/app.routes';
import LandingRoutes from '@/router/routes/landing.routes'

let currentHost = window.location.host;
let currentRoute = currentHost.split('.').shift() === 'app' ? AppRoutes : LandingRoutes;

Vue.use(VueRouter);

const router = new VueRouter({
    routes: currentRoute,
    mode: 'history',
    linkExactActiveClass: 'is-active-link'
});

export default router;
