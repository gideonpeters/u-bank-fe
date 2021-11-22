import { ProjectService, TransactionService } from "@/services";
import { reject } from "lodash";
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

    async fetchAllOffers() {
        const res = await ProjectService.fetchAllOffers();

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

    async fetchOfferById(_, id) {
        const res = await ProjectService.fetchOfferById(id);

        return res;
    },

    async fundProject(_, payload) {
        const res = await ProjectService.fundProject(payload);

        return res;
    },

    async createOffer(_, payload) {
        const res = await ProjectService.createOffer(payload);

        return res;
    },

    async createBid(_, payload) {
        const res = await ProjectService.createBid(payload);

        return res;
    },

    async fetchBids(_, { offerId }) {
        const res = await ProjectService.fetchBids(offerId);

        return res;
    },

    async fetchMyBids() {
        const res = await ProjectService.fetchUserBids();

        return res;
    },

    async sellAsGroup(_, { fundId, action }) {
        const res = await ProjectService.sellAsGroup({
            id: fundId,
            action,
        });

        return res;
    },

    async acceptBid(_, { bidId }) {
        const res = await ProjectService.acceptBid({
            id: bidId,
        });

        return res;
    },

    async rejectBid(_, { bidId }) {
        const res = await ProjectService.rejectBid({
            id: bidId,
        });

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
