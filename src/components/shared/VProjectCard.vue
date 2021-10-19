<template>
    <v-card
        @click="goToProject"
        class="mx-auto py-4 px-6 rounded-xl pointer"
        color="secondary"
        flat
        width="320"
        max-width="350"
    >
        <v-img
            class="white--text align-end rounded-xl"
            height="200px"
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        >
            <div class="d-flex project-card__status">
                <div class="error px-4 py-2 font-weight-medium">LATEST</div>
            </div>
            <v-card-title>Ehi Homes</v-card-title>
        </v-img>

        <v-card-subtitle class="pb-2 px-0 text-body-1">
            <div class="d-flex justify-space-between align-baseline">
                <div>₦50,000/unit</div>
                <div class="d-flex align-center">
                    <v-icon class="text-subtitle-1">mdi-timer-sand-full</v-icon>
                    <div class="text-subtitle-1 ml-1">08/12/2021</div>
                </div>
            </div>
        </v-card-subtitle>

        <v-card-text class="text--primary px-0">
            <div class="d-flex justify-space-between align-center">
                <div>
                    <div class="d-flex pb-2 align-center">
                        <v-chip small class="rounded" color="success"
                            >UP</v-chip
                        >
                        <div class="ml-1">50% (₦50,000)</div>
                    </div>

                    <v-chip class="px-6 mt-4" small
                        >Available (50 units)</v-chip
                    >
                </div>
                <div class="mt-5">
                    <v-progress-circular
                        v-if="owned"
                        :rotate="90"
                        :size="50"
                        :width="5"
                        :value="50"
                        class="ml-auto"
                        color="warning"
                    >
                        {{ 50 }}
                    </v-progress-circular>
                </div>
            </div>
        </v-card-text>

        <v-card-actions class="px-0 py-0">
            <v-btn color="orange" text class="ml-auto" v-if="!owned">
                Buy
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
import { PROJECT_DETAILS } from "@/router/endpoints";
import Vue from "vue";
export default Vue.extend({
    props: {
        owned: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        goToProject() {
            this.$router.push({
                name: PROJECT_DETAILS.NAME,
                params: {
                    projectId: "1",
                },
            });
        },
    },
});
</script>