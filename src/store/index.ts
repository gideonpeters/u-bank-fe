import Vue from "vue";
import Vuex from "vuex";

import auth from "./modules/auth.module";
import transactions from "./modules/transactions.module";
import projects from "./modules/projects.module";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        snackbar: {
            timeout: 2500,
            text: "",
            isActive: false,
        },
    },
    mutations: {
        openSnackbar({ snackbar }, payload) {
            snackbar.text = payload;
            return (snackbar.isActive = true);
        },
        closeSnackbar({ snackbar }) {
            return (snackbar.isActive = false);
        },
    },
    actions: {},
    modules: {
        auth,
        transactions,
        projects,
    },
});
