import { TransactionService } from "@/services";
import { GetterTree, MutationTree, ActionTree } from "vuex";

class State {}

const state = {
    paymentTypes: [
        // {
        //     name: "Online Transfer",
        //     label: "online_transfer",
        // },
        {
            name: "Bank Transfer",
            label: "bank_transfer",
        },
    ],
};

const getters = {};

const mutations = {};

const actions = <ActionTree<State, any>>{
    async fetchTransactions() {
        const res = await TransactionService.fetchTransactions();

        return res;
    },

    async fetchWallet() {
        const res = await TransactionService.fetchWallet();

        return res;
    },

    async fetchBankAccounts() {
        const res = await TransactionService.fetchBankAccounts();

        return res;
    },

    async requestOtp(_, purpose) {
        const res = await TransactionService.requestOtp(purpose);

        return res;
    },
    async addBank(_, payload) {
        const res = await TransactionService.addBank(payload);

        return res;
    },
    async resolveBankAccount(_, payload) {
        const res = await TransactionService.resolveBankAccount(payload);

        return res;
    },
    async topup(_, payload) {
        const res = await TransactionService.topup(payload);

        return res;
    },
    async withdraw(_, payload) {
        const res = await TransactionService.withdraw(payload);

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
