import { ProjectService, TransactionService } from "@/services";
import { GetterTree, MutationTree, ActionTree } from "vuex";

class State {}

const state = {};

const getters = {};

const mutations = {};

const actions = <ActionTree<State, any>>{
    async fetchProjects() {
        const res = await ProjectService.fetchProjects();

        return res;
    },

    async fetchFundedProjects() {
        const res = await ProjectService.fetchFundedProjects();

        return res;
    },

    async fetchProjectById(_, id) {
        const res = await ProjectService.fetchProjectById(id);

        return res;
    },

    async fetchSubscriptionById(_, id) {
        const res = await ProjectService.fetchSubscriptionById(id);

        return res;
    },

    async fundProject(_, payload) {
        const res = await ProjectService.fundProject(payload);

        return res;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
