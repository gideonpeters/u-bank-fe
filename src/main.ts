import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "./includes";

Vue.config.productionTip = false;

const app = new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
}).$mount("#app");

export default app;
