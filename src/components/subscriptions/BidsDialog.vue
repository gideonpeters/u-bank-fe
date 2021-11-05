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

                        <template #item.actions>
                            <div class="d-flex">
                                <v-btn depressed text color="success">
                                    Accept
                                </v-btn>
                                <v-btn
                                    depressed
                                    text
                                    color="error"
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
            bids: [],
            bidHeaders: [
                { text: "Bid unit price", value: "amount" },
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
                this.$store.commit("openSnackbar", res.message, { root: true });
            } finally {
                this.isFetchingBids = false;
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