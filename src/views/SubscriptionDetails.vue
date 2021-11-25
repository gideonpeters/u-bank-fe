<template>
    <div class="w-100">
        <v-row class="mt-5" justify="space-between">
            <v-col>
                <v-btn color="tertiary-light" depressed @click="$router.go(-1)"
                    >Go Back</v-btn
                >
            </v-col>
            <v-col cols="12">
                <v-card
                    flat
                    class="rounded-xl w-100 d-flex"
                    color="tertiary-light"
                    height="250px"
                    width="100%"
                    max-width="100%"
                >
                    <v-img
                        width="100%"
                        max-width="100%"
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
            <v-col cols="12" md="8">
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
                    <v-col cols="12" md="6" class="mb-3">
                        <div class="d-flex">
                            <v-svg name="detail-icon" class="mr-2"></v-svg>
                            Unit Price: N{{ subscription.project.unit_price }}
                        </div>
                    </v-col>
                    <v-col cols="12" md="6" class="mb-3">
                        <div class="d-flex">
                            <v-svg name="detail-icon" class="mr-2"></v-svg>
                            Total Units:
                            {{ subscription.project.expected_slots }} unit(s)
                        </div>
                    </v-col>
                    <v-col cols="12" md="6" class="mb-3">
                        <div class="d-flex">
                            <v-svg name="detail-icon" class="mr-2"></v-svg>
                            Available Units:
                            {{ subscription.project.available_units }} unit(s)
                        </div>
                    </v-col>
                    <v-col cols="12" md="6" class="mb-3">
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
                    <v-col cols="12" md="6" class="mb-3">
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
                    <v-col cols="12" md="6" class="mb-3">
                        <div class="d-flex">
                            <v-svg name="detail-icon" class="mr-2"></v-svg>
                            Growth: {{ subscription.project.growth }}%
                        </div>
                    </v-col>
                    <v-col cols="12" md="6" class="mb-3">
                        <div class="d-flex">
                            <v-svg name="detail-icon" class="mr-2"></v-svg>
                            Number of units: {{ subscription.units }} unit(s)
                        </div>
                    </v-col>
                    <v-col cols="12" md="6" class="mb-3">
                        <div class="d-flex align-center">
                            <v-svg name="detail-icon" class="mr-2"></v-svg>

                            Payment Status:
                            <v-chip small class="text-capitalize ml-2">
                                {{ subscription.payment.status }}
                            </v-chip>
                        </div>
                    </v-col>
                </v-row>
                <v-row class="mt-8" v-if="isOwner && isApproved">
                    <v-col cols="12">
                        <div class="black--text font-weight-bold mt-5 mb-2">
                            Offers
                        </div>
                        <div v-if="subscription.offers.length === 0">
                            You have made no offers
                        </div>
                        <v-data-table
                            hide-default-footer
                            :loading="isLoadingOffers"
                            :headers="offerHeaders"
                            :items="subscription.offers"
                            :items-per-page="5"
                        >
                            <template #item.created_at="{ item }">
                                {{ formatDate(item.created_at) }}
                            </template>
                            <template #item.status="{ item }">
                                <v-chip
                                    x-small
                                    :color="item.status ? 'success' : 'error'"
                                    >{{
                                        item.status ? "Active" : "Inactive"
                                    }}</v-chip
                                >
                            </template>
                            <template #item.actions="{ item }">
                                <div class="d-flex align-center justify-center">
                                    <v-menu offset-y>
                                        <template
                                            v-slot:activator="{ on, attrs }"
                                        >
                                            <v-btn
                                                depressed
                                                icon
                                                v-bind="attrs"
                                                v-on="on"
                                            >
                                                <v-icon
                                                    >mdi-dots-horizontal</v-icon
                                                >
                                            </v-btn>
                                        </template>
                                        <v-list>
                                            <v-list-item
                                                @click="
                                                    offerAction.action(item)
                                                "
                                                v-for="(
                                                    offerAction, index
                                                ) in offerActions(item)"
                                                :key="index"
                                            >
                                                <v-list-item-title>{{
                                                    offerAction.title
                                                }}</v-list-item-title>
                                            </v-list-item>
                                        </v-list>
                                    </v-menu>
                                </div>
                            </template>
                        </v-data-table>
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
                    v-if="!isOwner && isApproved"
                    color="black"
                    block
                    depressed
                    class="text-none mt-8 white--text"
                    @click="createBidDialog = true"
                    >Bid</v-btn
                >
                <v-btn
                    v-if="isOwner && isApproved"
                    color="tertiary-light"
                    block
                    depressed
                    :disabled="subscription.project.percent_funded > 100"
                    class="text-none mt-8"
                    @click="offerDialog = true"
                    >Sell As Individual</v-btn
                >
                <v-btn
                    v-if="isOwner && isApproved"
                    color="black"
                    block
                    :disabled="subscription.sell_as_group"
                    depressed
                    class="text-none mt-8 white--text"
                    @click="sellAsGroupDialog = true"
                    >Sell As Group</v-btn
                >
                <!-- <v-btn color="tertiary-light" block depressed class="text-none mt-8"
                >Share Project</v-btn
            > -->
            </v-col>
            <v-col cols="12">
                <create-offer-dialog
                    v-model="offerDialog"
                    :fund="subscription"
                    @toggle="offerDialog = $event"
                    @completed="
                        offerDialog = false;
                        fetchSubscriptionById;
                    "
                />
            </v-col>
            <v-col v-if="selectedOffer">
                <bids-dialog v-model="bidsDialog" :offer="selectedOffer" />
            </v-col>
            <v-col>
                <create-bid-dialog
                    v-model="createBidDialog"
                    :offer="subscription"
                />
            </v-col>
            <v-col>
                <sell-as-group-dialog
                    :fund="subscription"
                    v-model="sellAsGroupDialog"
                    @toggle="sellAsGroupDialog = $event"
                    @completed="fetchSubscriptionById"
                />
            </v-col>
        </v-row>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { formatDate } from "@/utils/helpers";
import { DateTime } from "luxon";
import { PROJECTS, PROJECT_DETAILS } from "@/router/endpoints";
import CreateOfferDialog from "@/components/subscriptions/CreateOfferDialog.vue";
import BidsDialog from "@/components/subscriptions/BidsDialog.vue";
import SellAsGroupDialog from "@/components/subscriptions/SellAsGroupDialog.vue";
import { mapState } from "vuex";
import CreateBidDialog from "@/components/subscriptions/CreateBidDialog.vue";

export default Vue.extend({
    components: {
        BidsDialog,
        CreateOfferDialog,
        SellAsGroupDialog,
        CreateBidDialog,
    },
    data() {
        return {
            isLoading: false,
            isLoadingOffers: false,
            fundDialog: false,
            bidsDialog: false,
            createBidDialog: false,
            offerDialog: false,
            sellAsGroupDialog: false,
            DateTime,
            selectedOffer: {},
            subscription: {
                id: 0,
                user_id: 0,
                project: {
                    id: "0",
                },
                payment: {
                    status: "pending",
                },
            },
            offerHeaders: [
                { text: "Unit Price", value: "unit_price" },
                {
                    text: "Status",
                    align: "start",
                    sortable: false,
                    value: "status",
                },
                { text: "No. of units", value: "units" },
                { text: "No. of bids", value: "bid_count" },
                { text: "Created on", value: "created_at" },
                { text: "", value: "actions" },
            ],
        };
    },
    computed: {
        ...mapState("auth", ["loggedInUser"]),
        isOwner(): boolean {
            return this.loggedInUser.id === this.subscription.user_id;
        },
        isApproved(): boolean {
            return this.subscription.payment.status === "approved";
        },
    },
    methods: {
        formatDate,
        offerActions(offer: any) {
            let res = [
                {
                    title: "View Bids",
                    action: (item: any) => {
                        // console.log(item);
                        this.bidsDialog = false;
                        this.selectedOffer = item;
                        this.bidsDialog = true;
                    },
                },
            ];

            // if (offer.status) {
            //     res.push({
            //         title: "Deactivate",
            //         action: () => {
            //             //
            //         },
            //     });
            // }

            return res;
        },
        async fetchSubscriptionById() {
            try {
                this.isLoading = true;
                this.sellAsGroupDialog = false;
                const subscriptionId = this.$route.params.subscriptionId;

                const res = await this.$store.dispatch(
                    "projects/fetchSubscriptionById",
                    subscriptionId,
                );

                this.subscription = res.data;
            } finally {
                this.isLoading = false;
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