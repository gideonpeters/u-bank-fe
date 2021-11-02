import axios, { AxiosInstance, AxiosStatic } from "axios";
import Vue, { VueConstructor } from "vue";

export const http = axios.create({
    baseURL: process.env.VUE_APP_API_BASE,
    headers: {
        "Content-Type": "application/json",
    },
});

export const httpConfig = {
    install(Vue: any) {
        Vue.prototype.$http = Vue.http = http;
    },
};

declare module "vue/types/vue" {
    interface Vue {
        $http: AxiosStatic;
    }
}

Vue.use(httpConfig);
