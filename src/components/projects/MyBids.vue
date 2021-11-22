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
                        @click="reject(item.id)"
                        depressed
                        text
                        :loading="isPaying"
                        color="success"
                        :disabled="item.status !== 'approved'"
                        class="ml-2"
                    >
                        Pay
                    </v-btn>
                </div>
            </template>
        </v-data-table>
    </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { formatDate } from "@/utils/helpers";

export default Vue.extend({
    data() {
        return {
            isFetchingBids: false,
            isPaying: false,
            isWithdrawing: false,
            bids: [],
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

                const res = await this.$store.dispatch("projects/fetchMyBids");

                this.bids = res.data;
            } finally {
                this.isFetchingBids = false;
            }
        },
    },
    mounted() {
        this.fetchMyBids();
    },
});
</script>