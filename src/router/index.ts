import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import {
    DASHBOARD,
    LOGIN,
    OFFER_DETAILS,
    PORTFOLIO,
    PROFILE,
    PROJECTS,
    PROJECT_DETAILS,
    SETTINGS,
    SIGNUP,
    SUBSCRIPTION_DETAILS,
    VERIFY_EMAIL,
    WALLET,
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
        path: WALLET.PATH,
        name: WALLET.NAME,
        component: () =>
            import(/* webpackChunkName: "wallet" */ "@/views/Wallet.vue"),
        meta: WALLET.META,
    },
    {
        path: PROJECTS.PATH,
        name: PROJECTS.NAME,
        component: () =>
            import(/* webpackChunkName: "projects" */ "@/views/Projects.vue"),
        meta: PROJECTS.META,
    },
    {
        path: PROJECT_DETAILS.PATH,
        name: PROJECT_DETAILS.NAME,
        component: () =>
            import(
                /* webpackChunkName: "projects" */ "@/views/ProjectDetails.vue"
            ),
        meta: PROJECT_DETAILS.META,
    },
    {
        path: SUBSCRIPTION_DETAILS.PATH,
        name: SUBSCRIPTION_DETAILS.NAME,
        component: () =>
            import(
                /* webpackChunkName: "projects" */ "@/views/SubscriptionDetails.vue"
            ),
        meta: SUBSCRIPTION_DETAILS.META,
    },
    {
        path: OFFER_DETAILS.PATH,
        name: OFFER_DETAILS.NAME,
        component: () =>
            import(
                /* webpackChunkName: "projects" */ "@/views/OfferDetails.vue"
            ),
        meta: OFFER_DETAILS.META,
    },
    {
        path: PROFILE.PATH,
        name: PROFILE.NAME,
        component: () =>
            import(/* webpackChunkName: "profile" */ "@/views/Profile.vue"),
        meta: PROFILE.META,
    },
    {
        path: PORTFOLIO.PATH,
        name: PORTFOLIO.NAME,
        component: () =>
            import(/* webpackChunkName: "portfolio" */ "@/views/Portfolio.vue"),
        meta: PORTFOLIO.META,
    },
    {
        path: SETTINGS.PATH,
        name: SETTINGS.NAME,
        component: () =>
            import(/* webpackChunkName: "settings" */ "@/views/Settings.vue"),
        meta: SETTINGS.META,
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
