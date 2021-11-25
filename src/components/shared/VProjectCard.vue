<template>
    <v-card
        @click="goToProject"
        class="py-4 px-6 rounded-xl pointer mx-auto mx-md-0"
        color="tertiary-light"
        flat
        width="320"
        max-width="350"
    >
        <v-img
            class="white--text align-end rounded-xl"
            height="200px"
            :src="project.image_url"
        >
            <div class="d-flex project-card__status" v-if="owned">
                <div
                    class="px-4 py-2 font-weight-medium text-uppercase"
                    :class="{
                        success: paymentStatus === 'approved',
                        error: paymentStatus !== 'approved',
                    }"
                >
                    {{
                        paymentStatus === "approved" ? "Active" : paymentStatus
                    }}
                </div>
            </div>
            <v-card-title>{{ project.name }}</v-card-title>
        </v-img>

        <v-card-subtitle class="pb-2 px-0 text-body-1">
            <div class="d-flex justify-space-between align-baseline">
                <div>₦{{ project.unit_price }}/unit</div>
                <div class="d-flex align-center">
                    <v-icon class="text-subtitle-1">mdi-timer-sand-full</v-icon>
                    <div class="text-subtitle-1 ml-1">
                        {{ formatDate(project.launched_at, DateTime.DATE_MED) }}
                    </div>
                </div>
            </div>
        </v-card-subtitle>

        <v-card-text class="text--primary px-0">
            <div class="d-flex justify-space-between align-center">
                <div>
                    <div class="d-flex pb-2 align-center">
                        <v-chip
                            small
                            class="rounded"
                            :color="project.growth > 0 ? 'success' : 'error'"
                        >
                            <v-icon size="15">{{
                                project.growth > 0
                                    ? "mdi-arrow-up"
                                    : "mdi-arrow-down"
                            }}</v-icon>
                        </v-chip>
                        <div class="ml-1">
                            {{ project.growth }}% (₦{{
                                project.sales_values[0].amount
                            }})
                        </div>
                    </div>

                    <v-chip class="px-6 mt-4" small
                        >Available ({{ project.expected_slots }} units)</v-chip
                    >
                </div>
                <div class="mt-5">
                    <v-progress-circular
                        v-if="owned"
                        :rotate="90"
                        :size="50"
                        :width="5"
                        :value="project.percent_funded"
                        class="ml-auto"
                        color="warning"
                    >
                        {{ project.percent_funded }}%
                    </v-progress-circular>
                </div>
            </div>
        </v-card-text>

        <v-card-actions class="px-0 py-0">
            <v-btn
                color="orange"
                :disabled="!project.status"
                text
                class="ml-auto"
                v-if="!owned"
            >
                Buy
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
import { PROJECT_DETAILS, SUBSCRIPTION_DETAILS } from "@/router/endpoints";
import { formatDate } from "@/utils/helpers";
import { DateTime } from "luxon";

import Vue from "vue";
export default Vue.extend({
    props: {
        owned: {
            type: Boolean,
            default: false,
        },
        project: {
            type: Object,
            required: true,
        },
        fund: {
            type: Object,
            required: false,
        },
        paymentStatus: {
            type: String,
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
        goToProject() {
            if (this.owned) {
                this.$router.push({
                    name: SUBSCRIPTION_DETAILS.NAME,
                    params: {
                        subscriptionId: this.fund.id,
                    },
                });
            } else {
                this.$router.push({
                    name: PROJECT_DETAILS.NAME,
                    params: {
                        projectId: this.project.id,
                    },
                });
            }
        },
    },
});
</script>