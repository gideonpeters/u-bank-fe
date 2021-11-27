<template>
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
            >
                <v-img
                    class="white--text align-end rounded-xl w-100 h-100"
                    :src="offer.fund.project.image_url"
                    gradient="to bottom left, rgba(100,115,201,.33), rgba(25,32,72,.7)"
                >
                    <v-card-title class="text-h4">{{
                        offer.fund.project.name
                    }}</v-card-title>
                </v-img>
            </v-card>
        </v-col>
        <v-col cols="12" md="8">
            <div class="black--text font-weight-bold mt-5 mb-2">
                Description
            </div>
            <div v-html="offer.fund.project.description"></div>
            <div class="d-flex align-center mt-8">
                <v-progress-linear
                    :value="offer.fund.project.percent_funded"
                    class="mr-2"
                ></v-progress-linear>
                {{ offer.fund.project.percent_funded }}%
            </div>
            <v-row class="mt-8">
                <v-col cols="12" md="6" class="mb-3">
                    <div class="d-flex">
                        <v-svg name="detail-icon" class="mr-2"></v-svg>
                        Unit Price: N{{ offer.fund.project.unit_price }}
                    </div>
                </v-col>
                <v-col cols="12" md="6" class="mb-3">
                    <div class="d-flex">
                        <v-svg name="detail-icon" class="mr-2"></v-svg>
                        Offered Unit Price: N{{ offer.unit_price }}
                    </div>
                </v-col>
                <v-col cols="12" md="6" class="mb-3">
                    <div class="d-flex">
                        <v-svg name="detail-icon" class="mr-2"></v-svg>
                        Available Units:
                        {{ offer.units }} unit(s)
                    </div>
                </v-col>

                <v-col cols="12" md="6" class="mb-3">
                    <div class="d-flex">
                        <v-svg name="detail-icon" class="mr-2"></v-svg>
                        Acquired On:
                        {{
                            formatDate(offer.fund.created_at, DateTime.DATE_MED)
                        }}
                    </div>
                </v-col>
                <v-col cols="12" md="6" class="mb-3">
                    <div class="d-flex">
                        <v-svg name="detail-icon" class="mr-2"></v-svg>
                        Potential Growth:
                        {{ offer.fund.project.potential_growth }}
                    </div>
                </v-col>
                <v-col cols="12" md="6" class="mb-3">
                    <div class="d-flex">
                        <v-svg name="detail-icon" class="mr-2"></v-svg>
                        Growth so Far: {{ offer.fund.project.growth }}%
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
                v-if="!isOwner"
                color="black"
                block
                dark
                depressed
                class="text-none mt-8"
                @click="createBidDialog = true"
                >Bid</v-btn
            >
            <v-btn
                v-if="isOwner"
                color="tertiary-light"
                block
                depressed
                class="text-none mt-8"
                @click="offerDialog = true"
                >Sell As Individual</v-btn
            >

            <!-- <v-btn color="tertiary-light" block depressed class="text-none mt-8"
                >Share Project</v-btn
            > -->
        </v-col>
        <v-col cols="12">
            <create-offer-dialog
                v-model="offerDialog"
                :fund="offer.fund"
                @toggle="offerDialog = $event"
                @completed="
                    offerDialog = false;
                    fetchOfferById;
                "
            />
        </v-col>
        <v-col>
            <bids-dialog
                @toggle="bidsDialog = $event"
                v-model="bidsDialog"
                :offer="selectedOffer"
            />
        </v-col>
        <v-col>
            <create-bid-dialog
                @toggle="createBidDialog = $event"
                v-model="createBidDialog"
                :offer="offer"
                @completed="fetchOfferById"
            />
        </v-col>
    </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import { formatDate } from "@/utils/helpers";
import { DateTime } from "luxon";
import { PROJECTS, PROJECT_DETAILS } from "@/router/endpoints";
import CreateOfferDialog from "@/components/subscriptions/CreateOfferDialog.vue";
import BidsDialog from "@/components/subscriptions/BidsDialog.vue";
import { mapState } from "vuex";
import CreateBidDialog from "@/components/subscriptions/CreateBidDialog.vue";

export default Vue.extend({
    components: {
        BidsDialog,
        CreateOfferDialog,
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
            offer: {
                fund: {
                    project: {
                        id: "0",
                    },
                },
                user_id: "0",
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
            return this.loggedInUser.id === this.offer.user_id;
        },
    },
    methods: {
        formatDate,
        offerActions(offer: any) {
            let res = [
                {
                    title: "View Bids",
                    action: (item: any) => {
                        console.log(item);
                        this.bidsDialog = false;
                        this.selectedOffer = item;
                        this.bidsDialog = true;
                    },
                },
            ];

            if (offer.status) {
                res.push({
                    title: "Deactivate",
                    action: () => {
                        //
                    },
                });
            }

            return res;
        },
        async fetchOfferById() {
            try {
                this.isLoading = true;
                this.createBidDialog = false;
                const offerId = this.$route.params.offerId;

                const res = await this.$store.dispatch(
                    "projects/fetchOfferById",
                    offerId,
                );

                this.offer = res.data;

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
                    projectId: this.offer.fund.project.id,
                },
            });
        },
    },
    mounted() {
        this.fetchOfferById();
    },
});
</script>