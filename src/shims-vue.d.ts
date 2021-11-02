import VueRouter, { Route } from "vue-router";
declare module "*.vue" {
    import Vue from "vue";
    interface Vue {
        $router: VueRouter;
    }
    export default Vue;
}
