import { GetterTree, MutationTree, ActionTree } from "vuex";
import { AuthService } from "../../services";

class State {
    loggedInUser: {} = {};
    authToken: string = "";
}

const state = {
    loggedInUser: {},
    authToken: localStorage.getItem("token") || "",
};

const getters = {};

const mutations = <MutationTree<State>>{
    setUser(_, payload) {
        state.loggedInUser = payload;
    },
};

const actions = <ActionTree<State, any>>{
    async signup(_, payload) {
        const res = await AuthService.signup(payload);

        return res;
    },
    async login({ commit }, { loginId, password }) {
        const res = await AuthService.login({
            loginId,
            password,
        });

        if (res.status) {
            AuthService.authenticateUser(res.data.token);
        }

        commit("openSnackbar", res.message, { root: true });
        return res;
    },
    async checkUsername(_, { username }) {
        const res = await AuthService.checkUsername({
            username,
        });

        return res;
    },
    async resolveReferrer(_, { referrer }) {
        const res = await AuthService.resolveReferrer({
            referrer,
        });

        return res;
    },
    async fetchActivityLogs() {
        const res = await AuthService.fetchActivityLogs();

        return res;
    },
    async fetchProfile({ commit }) {
        const res = await AuthService.fetchProfile();

        commit("setUser", res.data);
        return res;
    },
    async fetchReferrals() {
        const res = await AuthService.fetchReferrals();

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
