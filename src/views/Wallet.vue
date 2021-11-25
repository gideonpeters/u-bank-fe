<template>
    <div class="w-100">
        <v-row justify="center" class="mt-10">
            <v-col cols="12" md="5">
                <v-card flat class="rounded-xl pa-5 mx-auto" color="secondary">
                    <div class="d-flex">
                        <v-icon color="black">mdi-piggy-bank</v-icon>
                        <div class="text-h6 ml-2">Balance</div>
                    </div>
                    <div class="text-h4 mt-5">{{ formatMoney(balance) }}</div>
                    <div class="d-flex mt-16">
                        <div>
                            <div class="success--text text-caption">
                                TOTAL INFLOW
                            </div>
                            <div class="d-flex">
                                <v-icon size="15" color="success"
                                    >mdi-arrow-top-right</v-icon
                                >
                                <div class="success--text ml-1 text-caption">
                                    {{ formatMoney(totalInflow) }}
                                </div>
                            </div>
                        </div>
                        <div class="ml-5">
                            <div class="error--text text-caption">
                                TOTAL OUTFLOW
                            </div>
                            <div class="d-flex">
                                <v-icon size="15" color="error"
                                    >mdi-arrow-bottom-right</v-icon
                                >
                                <div class="error--text ml-1 text-caption">
                                    {{ formatMoney(totalOutflow) }}
                                </div>
                            </div>
                        </div>
                        <div class="ml-auto">
                            <v-btn
                                @click="topupDialog = true"
                                :loading="isLoadingBalance"
                                depressed
                                rounded
                                color="primary"
                                class="rounded-circle py-8 v-shadow"
                            >
                                <v-icon>mdi-plus</v-icon>
                            </v-btn>
                        </div>
                    </div>
                </v-card>
            </v-col>
            <v-col cols="12" md="3">
                <v-card
                    flat
                    height="150px"
                    color="primary"
                    class="v-shadow rounded-xl pa-5 mb-2 pointer"
                    @click="addBankDialog = true"
                >
                    <div
                        class="
                            d-flex
                            flex-column
                            align-center
                            justify-center
                            fill-height
                        "
                    >
                        <v-icon color="white">mdi-bank</v-icon>
                        <div class="white--text mt-4 text-center">
                            Add Bank Account
                        </div>
                    </div>
                </v-card>
                <v-card
                    flat
                    height="150px"
                    color="tertiary-light"
                    class="rounded-xl pa-5 pointer"
                    @click="withdrawDialog = true"
                >
                    <div
                        class="
                            d-flex
                            flex-column
                            justify-center
                            align-center
                            fill-height
                        "
                    >
                        <v-svg name="withdraw-icon" class="black--text"></v-svg>
                        <div class="mt-4">Withdraw</div>
                    </div>
                </v-card>
            </v-col>
            <v-col cols="12" md="4">
                <div class="text-h6 mb-2">Bank Accounts</div>
                <v-card flat max-height="250px" class="overflow-y-auto">
                    <div v-if="bankAccounts.length === 0" class="py-5">
                        No Bank Accounts Added
                    </div>
                    <div
                        class="d-flex w-100 align-center mb-5"
                        v-for="(bankAccount, i) in bankAccounts"
                        :key="i"
                    >
                        <v-card
                            flat
                            color="black"
                            height="85px"
                            width="100px"
                            class="rounded-xl mr-3"
                        ></v-card>
                        <div>
                            <div>{{ bankAccount.account_name }}</div>
                            <div>
                                {{ bankAccount.bank_name }} ({{
                                    bankAccount.account_number
                                }})
                            </div>
                        </div>
                    </div>
                </v-card>
            </v-col>
        </v-row>
        <v-row justify="center" align="center" class="mt-5">
            <v-col cols="12" md="8">
                <div>
                    <v-card flat color="transparent">
                        <v-tabs v-model="tab" background-color="transparent">
                            <v-tab v-for="(item, ix) in tabItems" :key="ix">
                                {{ item }}
                            </v-tab>
                        </v-tabs>
                        <v-tabs-items v-model="tab">
                            <v-tab-item
                                v-for="(item, indx) in tabItems"
                                :key="indx"
                            >
                                <v-card flat v-if="indx === 0">
                                    <v-data-table
                                        hide-default-header
                                        hide-default-footer
                                        :loading="isLoadingTransactions"
                                        :headers="transactionHeaders"
                                        :items="transactions"
                                        :items-per-page="5"
                                    >
                                        <template #item.status="{ item }">
                                            <v-icon
                                                size="18"
                                                :class="{
                                                    'success--text':
                                                        item.type == 'debit',
                                                    'error--text':
                                                        item.type == 'credit',
                                                }"
                                                >{{
                                                    item.type == "debit"
                                                        ? "mdi-arrow-down"
                                                        : "mdi-arrow-up"
                                                }}</v-icon
                                            >
                                        </template>
                                        <template #item.created_at="{ item }">
                                            {{ formatDate(item.created_at) }}
                                        </template>
                                        <template #item.amount="{ item }">
                                            {{ formatMoney(item.amount) }}
                                        </template>
                                    </v-data-table>
                                </v-card>
                                <v-card flat v-if="indx === 1">
                                    <v-data-table
                                        hide-default-footer
                                        :loading="isLoadingReferrals"
                                        :headers="referralHeaders"
                                        :items="referrals"
                                        :items-per-page="5"
                                    >
                                        <template #item.created_at="{ item }">
                                            {{ formatDate(item.created_at) }}
                                        </template></v-data-table
                                    >
                                </v-card>
                            </v-tab-item>
                        </v-tabs-items>
                    </v-card>
                </div>
            </v-col>

            <v-col cols="12" md="4">
                <v-card
                    flat
                    color="primary"
                    class="rounded-xl pa-5 d-flex flex-column align-center"
                >
                    <div class="white--text text-center mb-10 my-8">
                        Share your username
                        <b>{{ loggedInUser.username }}</b> to your referrals &
                        to earn up to 5% commission
                    </div>
                    <v-btn
                        :loading="isCopied"
                        @click="copyLink"
                        block
                        color="white"
                        class="text-none mt-16 py-5"
                        >Copy</v-btn
                    >
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <add-bank-dialog
                    v-model="addBankDialog"
                    @toggle="addBankDialog = $event"
                    @completed="fetchBankAccounts"
                />
            </v-col>
            <v-col>
                <topup-dialog
                    v-model="topupDialog"
                    @toggle="topupDialog = $event"
                    @completed="fetchWallet"
                />
            </v-col>
            <v-col>
                <withdraw-dialog
                    :walletBalance="balance"
                    :bankAccounts="bankAccounts"
                    v-model="withdrawDialog"
                    @toggle="withdrawDialog = $event"
                    @completed="fetchWallet"
                />
            </v-col>
        </v-row>
    </div>
</template>

<script lang="ts">
import Vue from "vue";

import AddBankDialog from "@/components/wallet/AddBankDialog.vue";
import TopupDialog from "@/components/wallet/TopupDialog.vue";

import { getBankName } from "@/utils/nigerianBanks";
import WithdrawDialog from "@/components/wallet/WithdrawDialog.vue";
import { mapState } from "vuex";
import { formatDate, formatMoney } from "@/utils/helpers";

export default Vue.extend({
    components: { AddBankDialog, TopupDialog, WithdrawDialog },
    data() {
        return {
            isLoadingBalance: true,
            isCopied: false,
            isLoadingBankAccounts: true,
            isLoadingTransactions: false,
            isLoadingReferrals: false,
            addBankDialog: false,
            topupDialog: false,
            withdrawDialog: false,
            balance: 0,
            tab: null,
            totalInflow: 0,
            totalOutflow: 0,
            tabItems: ["Transactions", "Referrals"],
            bankAccounts: [],
            transactions: [],
            referrals: [],
            transactionHeaders: [
                {
                    text: "",
                    align: "start",
                    sortable: false,
                    value: "status",
                },
                { text: "", value: "amount" },
                { text: "", value: "description" },
                { text: "", value: "created_at" },
            ],
            referralHeaders: [
                {
                    text: "Name",
                    align: "start",
                    sortable: false,
                    value: "name",
                },
                { text: "Email", value: "email" },
                { text: "Phone Number", value: "client.phone_number" },
                { text: "Registered on", value: "created_at" },
            ],
        };
    },
    computed: {
        ...mapState("auth", ["loggedInUser"]),
    },
    methods: {
        formatDate,
        formatMoney,
        async fetchWallet() {
            try {
                this.topupDialog = false;
                this.withdrawDialog = false;
                this.isLoadingBalance = true;
                const res = await this.$store.dispatch(
                    "transactions/fetchWallet",
                );
                this.balance = res.data.balance;
                this.totalInflow = res.data.total_inflow;
                this.totalOutflow = res.data.total_outflow;
                this.isLoadingBalance = false;
            } finally {
                this.isLoadingBalance = false;
            }
        },
        async fetchReferrals() {
            try {
                this.isLoadingReferrals = true;
                const res = await this.$store.dispatch("auth/fetchReferrals");
                this.referrals = res.data;
            } finally {
                this.isLoadingReferrals = false;
            }
        },
        async fetchBankAccounts() {
            try {
                this.addBankDialog = false;
                this.isLoadingBankAccounts = true;
                const res = await this.$store.dispatch(
                    "transactions/fetchBankAccounts",
                );
                this.bankAccounts = res.data?.map((bankAccount: any) => {
                    return {
                        bank_name: getBankName(bankAccount.bank_code),
                        ...bankAccount,
                    };
                });

                this.isLoadingBankAccounts = false;
            } finally {
                this.isLoadingBankAccounts = false;
            }
        },
        async fetchTransactions() {
            try {
                this.isLoadingTransactions = true;
                const res = await this.$store.dispatch(
                    "transactions/fetchTransactions",
                );
                this.transactions = res.data;

                this.isLoadingTransactions = false;
            } finally {
                this.isLoadingTransactions = false;
            }
        },
        async copyLink() {
            const baseUrl = process.env.VUE_APP_APP_BASE;
            try {
                await navigator.clipboard.writeText(
                    `Register on Abode using my username ${this.loggedInUser.username} and earn up to 5% commission
                    
                    ${baseUrl}/signup?ref=${this.loggedInUser.username}
                    `,
                );
                this.isCopied = true;

                this.$store.commit("openSnackbar", "Copied successfully", {
                    root: true,
                });

                setTimeout(() => {
                    this.isCopied = false;
                }, 5000);
            } catch ($e) {
                this.$store.commit("openSnackbar", "Cannot copy, try again", {
                    root: true,
                });
            }
        },
    },
    mounted() {
        this.fetchWallet();
        this.fetchBankAccounts();
        this.fetchTransactions();
        this.fetchReferrals();
    },
});
</script>

<style lang="scss" scoped>
::v-deep tr {
    height: 80px !important;
    padding-top: 10px;
    padding-bottom: 10px;
}
</style>