<template>
    <v-row class="mt-5" justify="space-between">
        <v-col cols="12">
            <v-card
                flat
                class="rounded-xl w-100 d-flex"
                color="tertiary-light"
                height="250px"
            >
                <v-img
                    class="white--text align-end rounded-xl w-100 h-100"
                    :src="subscription.project.image_url"
                    gradient="to bottom left, rgba(100,115,201,.33), rgba(25,32,72,.7)"
                >
                    <v-card-title class="text-h4">{{
                        subscription.project.name
                    }}</v-card-title>
                </v-img>
            </v-card>
        </v-col>
        <v-col cols="8">
            <div class="black--text font-weight-bold mt-5 mb-2">
                Description
            </div>
            <div v-html="subscription.project.description"></div>
            <div class="d-flex align-center mt-8">
                <v-progress-linear
                    :value="subscription.project.percent_funded"
                    class="mr-2"
                ></v-progress-linear>
                {{ subscription.project.percent_funded }}%
            </div>
            <v-row class="mt-8">
                <v-col cols="6" class="mb-3">
                    <div class="d-flex">
                        <v-svg name="detail-icon" class="mr-2"></v-svg>
                        Unit Price: N{{ subscription.project.unit_price }}
                    </div>
                </v-col>
                <v-col cols="6" class="mb-3">
                    <div class="d-flex">
                        <v-svg name="detail-icon" class="mr-2"></v-svg>
                        Available Units:
                        {{ subscription.project.expected_slots }} unit(s)
                    </div>
                </v-col>
                <v-col cols="6" class="mb-3">
                    <div class="d-flex">
                        <v-svg name="detail-icon" class="mr-2"></v-svg>
                        Launched At:
                        {{
                            formatDate(
                                subscription.project.launched_at,
                                DateTime.DATE_MED,
                            )
                        }}
                    </div>
                </v-col>
                <v-col cols="6" class="mb-3">
                    <div class="d-flex">
                        <v-svg name="detail-icon" class="mr-2"></v-svg>
                        Acquired On:
                        {{
                            formatDate(
                                subscription.created_at,
                                DateTime.DATE_MED,
                            )
                        }}
                    </div>
                </v-col>
                <v-col cols="6" class="mb-3">
                    <div class="d-flex">
                        <v-svg name="detail-icon" class="mr-2"></v-svg>
                        Growth: {{ subscription.project.growth }}%
                    </div>
                </v-col>
                <v-col cols="6" class="mb-3">
                    <div class="d-flex">
                        <v-svg name="detail-icon" class="mr-2"></v-svg>
                        Number of units: {{ subscription.units }} unit(s)
                    </div>
                </v-col>
            </v-row>
        </v-col>
        <v-col cols="12" md="3">
            <v-btn
                color="warning"
                block
                depressed
                class="text-none mt-8"
                @click="goToProject"
                >Go To Project</v-btn
            >
            <v-btn
                color="tertiary-light"
                block
                depressed
                class="text-none mt-8"
                @click="fundDialog = true"
                >Sell</v-btn
            >
            <!-- <v-btn color="tertiary-light" block depressed class="text-none mt-8"
                >Share Project</v-btn
            > -->
        </v-col>
    </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import { formatDate } from "@/utils/helpers";
import { DateTime } from "luxon";
import { PROJECTS, PROJECT_DETAILS } from "@/router/endpoints";

export default Vue.extend({
    data() {
        return {
            isLoading: false,
            fundDialog: false,
            DateTime,
            subscription: {
                project: {
                    id: "0",
                },
            },
        };
    },
    methods: {
        formatDate,
        async fetchSubscriptionById() {
            try {
                this.isLoading = true;
                const subscriptionId = this.$route.params.subscriptionId;

                const res = await this.$store.dispatch(
                    "projects/fetchSubscriptionById",
                    subscriptionId,
                );

                this.subscription = res.data;

                this.isLoading = false;
            } finally {
            }
        },
        goToProjects() {
            this.fundDialog = false;
            this.$router.push({ name: PROJECTS.NAME });
        },
        goToProject() {
            this.$router.push({
                name: PROJECT_DETAILS.NAME,
                params: {
                    projectId: this.subscription.project.id,
                },
            });
        },
    },
    mounted() {
        this.fetchSubscriptionById();
    },
});
</script>