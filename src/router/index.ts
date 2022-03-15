import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import {
    DASHBOARD,
    LOGIN,
    SETTINGS,
    SIGNUP,
    VERIFY_EMAIL,
    MFA,
    MFA_VERIFY,
} from "./endpoints";

Vue.use(VueRouter);

const routes: RouteConfig[] = [
    {
        path: LOGIN.PATH,
        name: LOGIN.NAME,
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "auth" */ "@/views/Login.vue"),
        meta: LOGIN.META,
    },
    {
        path: VERIFY_EMAIL.PATH,
        name: VERIFY_EMAIL.NAME,
        component: () =>
            import(/* webpackChunkName: "auth" */ "@/views/VerifyEmail.vue"),
        meta: VERIFY_EMAIL.META,
    },

    {
        path: SIGNUP.PATH,
        name: SIGNUP.NAME,
        component: () =>
            import(/* webpackChunkName: "auth" */ "@/views/SignUp.vue"),
        meta: SIGNUP.META,
    },
    {
        path: DASHBOARD.PATH,
        name: DASHBOARD.NAME,
        component: () =>
            import(/* webpackChunkName: "dashboard" */ "@/views/Dashboard.vue"),
        meta: DASHBOARD.META,
    },

    {
        path: SETTINGS.PATH,
        name: SETTINGS.NAME,
        component: () =>
            import(/* webpackChunkName: "settings" */ "@/views/Settings.vue"),
        meta: SETTINGS.META,
    },
    {
        path: MFA.PATH,
        name: MFA.NAME,
        component: () =>
            import(/* webpackChunkName: "settings" */ "@/views/2FA.vue"),
        meta: MFA.META,
    },
    {
        path: MFA_VERIFY.PATH,
        name: MFA_VERIFY.NAME,
        component: () =>
            import(/* webpackChunkName: "settings" */ "@/views/2FAVerify.vue"),
        meta: MFA_VERIFY.META,
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
