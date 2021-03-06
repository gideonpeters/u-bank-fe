import Vue from "vue";
import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";
import "@/assets/styles/main.scss";

//Import Default Layouts
import Private from "./layouts/Private.vue";
import Public from "./layouts/Public.vue";
Vue.component("private", Private);
Vue.component("public", Public);

import "./http/index";
import { http } from "./http/index";
import store from "./store";

const authToken = localStorage.getItem("token");
if (authToken) {
    http.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;
    store.dispatch("auth/fetchProfile");
}

// global components import
const requireComponent = require.context(
    "./components/shared/",
    true,
    /\.(js|vue)$/i,
);

requireComponent.keys().forEach((fileName) => {
    const componentConfig = requireComponent(fileName);
    const componentName = upperFirst(
        camelCase(
            fileName
                ?.split("/")
                ?.pop()
                ?.replace(/\.\w+$/, ""),
        ),
    );
    Vue.component(componentName, componentConfig.default || componentConfig);
});
