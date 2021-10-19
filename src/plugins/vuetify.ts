import Vue from "vue";

import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                "primary": "#3D41D7",
                "secondary": "#FCF5E5",
                "accent": "#8c9eff",
                "error": "#FF6B6B",
                "success": "#25B825",
                "info": "#1565D8",
                "tertiary": "#D3D3FD",
                "tertiary-light": "#F6F8FF",
            },
            dark: {
                "primary": "#3D41D7",
                "secondary": "#FCF5E5",
                "accent": "#8c9eff",
                "error": "#FF6B6B",
                "success": "#25B825",
                "info": "#1565D8",
                "tertiary": "#D3D3FD",
                "tertiary-light": "#F6F8FF",
            },
        },
    },
});
