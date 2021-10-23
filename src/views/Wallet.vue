<template>
    <div>
        <v-row class="mt-10">
            <v-col cols="12" md="6">
                <v-card flat class="rounded-xl pa-5" color="secondary">
                    <div class="text-h6">Balance</div>
                    <div class="text-h4 mt-5">N50,000,000.00</div>
                    <div class="d-flex mt-16">
                        <div>
                            <div>TOTAL INFLOW</div>
                            <div>10,000,000.00</div>
                        </div>
                        <div class="ml-4">
                            <div>TOTAL OUTFLOW</div>
                            <div>10,000,000.00</div>
                        </div>
                        <div class="ml-auto">
                            <v-btn
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
            <v-col cols="12" md="2">
                <v-card
                    flat
                    height="150px"
                    color="primary"
                    class="v-shadow rounded-xl pa-5 mb-2"
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
                        <v-svg name="withdraw-icon" class="white--text"></v-svg>
                        <div class="white--text mt-4">Add Bank Account</div>
                    </div>
                </v-card>
                <v-card
                    flat
                    height="150px"
                    color="tertiary-light"
                    class="rounded-xl pa-5"
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
                <div class="text-h6">Bank Accounts</div>
            </v-col>
        </v-row>
        <v-row class="mt-10" align="end">
            <v-col cols="12" md="8">
                <div>
                    <div class="text-h6">Transaction History</div>
                    <v-card flat>
                        <v-data-table
                            hide-default-header
                            hide-default-footer
                            :headers="transactionHeaders"
                            :items="transactions"
                            :items-per-page="5"
                        >
                            <template #item.status>
                                <v-icon size="18" class="success--text"
                                    >mdi-arrow-down</v-icon
                                >
                            </template>
                        </v-data-table>
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
                        Share your referral link to earn up to 5% commission
                    </div>
                    <v-btn block color="white" class="text-none mt-16 py-5"
                        >Copy</v-btn
                    >
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    data() {
        return {
            transactionHeaders: [
                {
                    text: "",
                    align: "start",
                    sortable: false,
                    value: "status",
                },
                { text: "", value: "description" },
                { text: "", value: "datetime" },
            ],
            transactions: [
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
});
</script>

<style lang="scss" scoped>
::v-deep tr {
    height: 80px !important;
    padding-top: 10px;
    padding-bottom: 10px;
}
</style>