import Vue from "vue";
import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";
import "@/assets/styles/main.scss";

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
