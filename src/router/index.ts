import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import { DASHBOARD, LOGIN, SIGNUP } from "./endpoints";

Vue.use(VueRouter);

const routes: RouteConfig[] = [
    {
        path: LOGIN.PATH,
        name: LOGIN.NAME,
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "auth" */ "../views/Login.vue"),
        meta: LOGIN.META,
    },
    {
        path: SIGNUP.PATH,
        name: SIGNUP.NAME,
        component: () =>
            import(/* webpackChunkName: "auth" */ "../views/SignUp.vue"),
        meta: SIGNUP.META,
    },
    {
        path: DASHBOARD.PATH,
        name: DASHBOARD.NAME,
        component: () =>
            import(/* webpackChunkName: "auth" */ "../views/Dashboard.vue"),
        meta: DASHBOARD.META,
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
