<template>
    <v-row justify="center" class="w-100 mt-8">
        <v-col cols="12" md="12">
            <div
                class="
                    d-flex
                    flex-md-row flex-column
                    justify-space-between
                    align-center
                "
            >
                <div class="w-100 ml-md-5 ml-0 mt-5 mt-md-0">
                    <div class="d-flex flex-md-row flex-column mb-5">
                        <v-card
                            @click="goToPage(projectPage)"
                            min-height="150px"
                            flat
                            class="
                                pointer
                                flex-column
                                rounded-xl
                                v-shadow
                                px-5
                                py-6
                                mr-md-4 mr-0
                                mb-5
                                w-100
                                d-flex
                                justify-center
                                align-center
                            "
                            color="#dee8eb"
                        >
                            <div class="text-h4 my-2">{{ projectsFunded }}</div>

                            <div class="d-flex">
                                <v-icon color="black">mdi-sitemap</v-icon>
                                <div class="ml-2 black--text">
                                    Projects Funded
                                </div>
                            </div>
                        </v-card>

                        <v-card
                            @click="goToPage(walletPage)"
                            min-height="150px"
                            flat
                            class="
                                v-shadow
                                pointer
                                flex-column
                                rounded-xl
                                px-5
                                py-6
                                mb-5
                                w-100
                                d-flex
                                justify-center
                                align-center
                            "
                            color="#F8F2D8"
                        >
                            <div class="text-h4 my-2 black--text">
                                {{ formatMoney(balance) }}
                            </div>
                            <div class="d-flex justify-start">
                                <v-icon color="black">mdi-wallet</v-icon>
                                <div class="ml-2 black--text">Wallet</div>
                            </div>
                        </v-card>
                    </div>
                    <div class="d-flex flex-md-row flex-column">
                        <v-card
                            flat
                            height="150px"
                            class="
                                mb-5
                                pointer
                                w-100
                                rounded-xl
                                d-flex
                                flex-column
                                align-center
                                justify-center
                                pa-4
                                mr-md-4 mr-0
                            "
                            color="tertiary"
                        >
                            <div class="text-h5">
                                {{ formatMoney(actualNetWorth) }}
                            </div>
                            <div class="d-flex mt-4">
                                <v-icon color="black">mdi-chart-tree</v-icon>
                                <div class="ml-2 black--text">
                                    Actual Net Worth
                                </div>
                            </div>
                        </v-card>
                        <v-card
                            flat
                            height="150px"
                            class="
                                pointer
                                w-100
                                rounded-xl
                                d-flex
                                mb-5
                                flex-column
                                align-center
                                justify-center
                            "
                            color="tertiary-light pa-4"
                        >
                            <div class="text-h5">
                                {{ formatMoney(potentialNetWorth) }}
                            </div>
                            <div class="d-flex mt-4">
                                <v-icon color="black">mdi-chart-arc</v-icon>
                                <div class="text-caption ml-2">
                                    Potential Net Worth
                                </div>
                            </div>
                        </v-card>
                    </div>
                </div>
            </div>
            <div class="mt-10">
                <div class="text-h6">Recent Activities</div>
                <v-card flat>
                    <v-data-table
                        :loading="isLoadingLogs"
                        hide-default-header
                        hide-default-footer
                        :headers="activityHeaders"
                        :items="activities"
                        :items-per-page="5"
                    >
                        <template #item.status>
                            <v-icon size="18" class="success--text"
                                >mdi-arrow-down</v-icon
                            >
                        </template>
                        <template #item.datetime="{ item }">
                            {{ formatDate(item.created_at) }}
                        </template>
                    </v-data-table>
                </v-card>
            </div>
        </v-col>
        <v-col cols="12" md="4" v-if="false">
            <v-project-card />

            <v-card
                flat
                class="rounded-xl w-100 my-10 pa-5"
                color="tertiary-light"
                min-height="100%"
            >
                <div class="text-h6">Latest Posts</div>
                <div class="text-caption mt-10">No posts yet</div>
            </v-card>
        </v-col>
    </v-row>
</template>

<script lang="ts">
import Vue from "vue";

import { formatDate, formatMoney } from "@/utils/helpers";
import { PROJECTS, WALLET } from "../router/endpoints";

export default Vue.extend({
    data() {
        return {
            isLoading: true,
            isLoadingLogs: false,
            balance: 0,
            projectsFunded: 0,
            totalInflow: 0,
            totalOutflow: 0,
            walletPage: WALLET.NAME,
            projectPage: PROJECTS.NAME,
            potentialNetWorth: 0,
            actualNetWorth: 0,
            activityHeaders: [
                {
                    text: "",
                    align: "start",
                    sortable: false,
                    value: "status",
                },
                { text: "", value: "description" },
                { text: "", value: "datetime" },
            ],
            activities: [
                {
                    status: "new",
                    description: "Your wallet was just debited",
                    datetime: "2 days ago",
                },
                {
                    status: "new",
                    description: "Your wallet was just debited",
                    datetime: "2 days ago",
                },
                {
                    status: "new",
                    description: "Your wallet was just debited",
                    datetime: "2 days ago",
                },
                {
                    status: "new",
                    description: "Your wallet was just debited",
                    datetime: "2 days ago",
                },
            ],
        };
    },
    methods: {
        formatDate,
        formatMoney,
        async fetchWallet() {
            try {
                this.isLoading = true;
                const res = await this.$store.dispatch(
                    "transactions/fetchWallet",
                );
                this.balance = res.data.balance;
                this.projectsFunded = res.data.projects_funded;
                this.totalInflow = res.data.total_inflow;
                this.totalOutflow = res.data.total_outflow;
                this.actualNetWorth = res.data.actual_networth;
                this.potentialNetWorth = res.data.potential_networth;
            } finally {
                this.isLoading = false;
            }
        },
        async fetchActivityLogs() {
            try {
                this.isLoadingLogs = true;
                const res = await this.$store.dispatch(
                    "auth/fetchActivityLogs",
                );

                this.activities = res.data;
            } finally {
                this.isLoadingLogs = false;
            }
        },
        goToPage(name: string) {
            this.$router.push({ name });
        },
    },
    mounted() {
        this.fetchWallet();
        this.fetchActivityLogs();
    },
});
</script>

<style lang="scss" scoped>
::v-deep tr {
    min-height: 80px;
    // height: 80px;
    margin-top: 10px;
    margin-bottom: 10px;
}
</style>