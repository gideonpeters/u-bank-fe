<template>
    <v-card
        class="py-4 px-6 rounded-xl pointer mx-auto mx-md-0"
        color="tertiary-light"
        flat
        width="320"
        max-width="350"
    >
        <v-img
            class="white--text align-end rounded-xl"
            height="200px"
            :src="offer.fund.project.image_url"
        >
            <div class="d-flex project-card__status" v-if="false">
                <div class="error px-4 py-2 font-weight-medium">LATEST</div>
            </div>
            <v-card-title>{{ offer.fund.project.name }}</v-card-title>
        </v-img>

        <v-card-subtitle class="pb-2 px-0 text-body-1">
            <div class="d-flex justify-space-between align-baseline">
                <div>₦{{ offer.unit_price }}/unit</div>
                <div class="d-flex align-center">
                    <v-icon class="text-subtitle-1">mdi-timer-sand-full</v-icon>
                    <div class="text-subtitle-1 ml-1">
                        {{ formatDate(offer.created_at, DateTime.DATE_MED) }}
                    </div>
                </div>
            </div>
        </v-card-subtitle>

        <v-card-text class="text--primary px-0">
            <div class="d-flex justify-space-between align-center">
                <div>
                    <div class="d-flex pb-2 align-center">
                        <!-- <v-chip
                            small
                            class="rounded"
                            :color="
                                offer.fund.project.growth > 0
                                    ? 'success'
                                    : 'error'
                            "
                        >
                            <v-icon size="15">{{
                                offer.fund.project.growth > 0
                                    ? "mdi-arrow-up"
                                    : "mdi-arrow-down"
                            }}</v-icon>
                        </v-chip> -->
                        <!-- <div class="ml-1">
                            {{ formatMoney(offer.unit_price) }}
                            (₦{{
                                offer.fund.project.sales_values[0].amount
                            }})
                        </div> -->
                    </div>

                    <v-chip class="px-6 mt-4" small
                        >Bids: {{ offer.bid_count }}
                    </v-chip>
                </div>
                <div class="mt-5">
                    <v-progress-circular
                        v-if="owned"
                        :rotate="90"
                        :size="50"
                        :width="5"
                        :value="offer.fund.project.percent_funded"
                        class="ml-auto"
                        color="warning"
                    >
                        {{ offer.fund.project.percent_funded }}%
                    </v-progress-circular>
                </div>
            </div>
        </v-card-text>

        <v-card-actions class="px-0 py-0">
            <v-btn
                color="primary"
                outlined
                :block="!owned"
                class=""
                v-if="!owned"
                @click="goToOffer"
            >
                View
            </v-btn>
            <v-btn
                color="orange"
                :disabled="!offer.fund.project.status"
                text
                class="ml-auto"
                v-if="owned"
            >
                Buy
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
import {
    OFFER_DETAILS,
    PROJECT_DETAILS,
    SUBSCRIPTION_DETAILS,
} from "@/router/endpoints";
import { formatDate, formatMoney } from "@/utils/helpers";
import { DateTime } from "luxon";

import Vue from "vue";
export default Vue.extend({
    props: {
        owned: {
            type: Boolean,
            default: false,
        },
        offer: {
            type: Object,
            required: true,
        },
        fund: {
            type: Object,
            required: false,
        },
    },
    data() {
        return {
            DateTime,
        };
    },
    methods: {
        formatDate,
        formatMoney,
        goToOffer() {
            this.$router.push({
                name: OFFER_DETAILS.NAME,
                params: {
                    offerId: this.offer.id,
                },
            });
        },
    },
});
</script>