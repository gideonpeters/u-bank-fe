import { GetterTree, MutationTree, ActionTree } from "vuex";
import { AuthService } from "../../services";

class State {
    loggedInUser: {} = {};
    authToken: string = "";
}

const state = {
    loggedInUser: localStorage.getItem("user") || {},
    authToken: localStorage.getItem("token") || "",
};

const getters = {};

const mutations = <MutationTree<State>>{
    setUser(_, payload) {
        state.loggedInUser = payload;
        localStorage.setItem("user", JSON.stringify(payload));
    },
};

const actions = <ActionTree<State, any>>{
    async signup(_, payload) {
        const res = await AuthService.signup(payload);

        return res;
    },
    async login({ commit, dispatch }, { email, password }) {
        const res = await AuthService.login({
            email,
            password,
        });

        if (res.status) {
            AuthService.authenticateUser(res.data.token);
            dispatch("fetchProfile");
        }

        commit("openSnackbar", res.message, { root: true });
        return res;
    },

    async fetchProfile({ commit }) {
        const res = await AuthService.fetchProfile();

        commit("setUser", res.data);
        return res;
    },

    async logout() {
        localStorage.clear();
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
