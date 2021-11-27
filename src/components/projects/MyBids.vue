<template>
    <v-card>
        <v-data-table
            hide-default-footer
            :loading="isFetchingBids"
            :headers="bidHeaders"
            :items="bids"
            :items-per-page="5"
        >
            <template #item.created_at="{ item }">
                {{ formatDate(item.created_at) }}
            </template>

            <template #item.actions="{ item }">
                <div class="d-flex">
                    <!-- <v-btn
                        depressed
                        text
                        :loading="isWithdrawing"
                        color="error"
                        :disabled="item.status !== 'pending'"
                        @click="accept(item.id)"
                    >
                        Withdraw
                    </v-btn> -->
                    <v-btn
                        @click="pay(item)"
                        depressed
                        text
                        color="success"
                        :disabled="
                            item.status !== 'approved' ||
                            item.payment.status !== 'approved'
                        "
                        class="ml-2"
                    >
                        {{
                            item.payment
                                ? `Payment ${item.payment.status}`
                                : "Pay"
                        }}
                    </v-btn>
                </div>
            </template>
        </v-data-table>
        <pay-bid-dialog
            v-if="selectedBid"
            v-model="payBidDialog"
            :bid="selectedBid"
            @completed="fetchMyBids"
        />
    </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { formatDate } from "@/utils/helpers";
import PayBidDialog from "./PayBidDialog.vue";

export default Vue.extend({
    components: { PayBidDialog },
    data() {
        return {
            payBidDialog: false,
            isFetchingBids: false,
            isPaying: false,
            isWithdrawing: false,
            bids: [],
            selectedBid: null,
            bidHeaders: [
                { text: "Bid unit price", value: "unit_price" },
                { text: "Number of units", value: "units" },
                {
                    text: "Status",
                    align: "start",
                    sortable: false,
                    value: "status",
                },
                { text: "Name of Bidder", value: "user.name" },
                { text: "Username", value: "user.username" },
                { text: "Placed on", value: "created_at" },
                { text: "", value: "actions" },
            ],
        };
    },
    methods: {
        formatDate,
        async fetchMyBids() {
            try {
                this.isFetchingBids = true;
                this.payBidDialog = false;

                const res = await this.$store.dispatch("projects/fetchMyBids");

                this.bids = res.data;
            } finally {
                this.isFetchingBids = false;
            }
        },
        pay(item: any) {
            if (item.status !== "approved") {
                this.selectedBid = item;
                this.payBidDialog = true;
            }
        },
    },
    mounted() {
        this.fetchMyBids();
    },
});
</script>