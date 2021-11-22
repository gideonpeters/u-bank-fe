<template>
    <v-row justify="center">
        <v-dialog
            v-model="show"
            max-width="800px"
            transition="dialog-bottom-transition"
        >
            <v-card flat min-height="500px">
                <v-card-title>
                    <span class="text-h5">View Bids</span>
                </v-card-title>

                <v-card-text>
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
                                <v-btn
                                    depressed
                                    text
                                    :loading="isAccepting"
                                    color="success"
                                    :disabled="item.status !== 'pending'"
                                    @click="accept(item.id)"
                                >
                                    Accept
                                </v-btn>
                                <v-btn
                                    @click="reject(item.id)"
                                    depressed
                                    text
                                    :loading="isRejecting"
                                    color="error"
                                    :disabled="item.status !== 'pending'"
                                    class="ml-2"
                                >
                                    Reject
                                </v-btn>
                            </div>
                        </template>
                    </v-data-table>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import { formatDate } from "@/utils/helpers";

export default Vue.extend({
    inheritAttrs: true,
    props: {
        offer: {
            type: Object,
            required: true,
        },
        value: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            isFetchingBids: false,
            isAccepting: false,
            isRejecting: false,
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
    computed: {
        show: {
            get() {
                return this.value;
            },
            set(value) {
                this.$emit("input", value);
            },
        },
    },
    methods: {
        formatDate,
        async fetchBids() {
            try {
                this.isFetchingBids = true;

                const res = await this.$store.dispatch("projects/fetchBids", {
                    offerId: this.offer.id,
                });

                this.bids = res.data;
                // this.$store.commit("openSnackbar", res.message, { root: true });
            } finally {
                this.isFetchingBids = false;
            }
        },
        async accept(id: string | number) {
            try {
                this.isAccepting = true;

                const res = await this.$store.dispatch("projects/acceptBid", {
                    bidId: id,
                });

                this.$store.commit("openSnackbar", res.message, { root: true });
            } finally {
                this.isAccepting = false;
                this.fetchBids();
            }
        },
        async reject(id: string | number) {
            try {
                this.isRejecting = true;

                const res = await this.$store.dispatch("projects/rejectBid", {
                    bidId: id,
                });

                this.$store.commit("openSnackbar", res.message, { root: true });
            } finally {
                this.isRejecting = false;
                this.fetchBids();
            }
        },
    },
    watch: {
        show(v) {
            if (v) {
                this.fetchBids();
            } else {
                this.bids = [];
            }
        },
    },
});
</script>