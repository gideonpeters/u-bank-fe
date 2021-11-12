<template>
    <v-row class="mt-5 mx-0 px-0">
        <v-col
            cols="12"
            md="4"
            class="mx-0 px-0"
            v-for="(offer, i) in offers"
            :key="i"
        >
            <offer-card :offer="offer" />
        </v-col>
    </v-row>
</template>

<script lang="ts">
import OfferCard from "./OfferCard.vue";

import Vue from "vue";
export default Vue.extend({
    components: {
        OfferCard,
    },
    data() {
        return {
            isLoading: false,
            offers: [],
        };
    },
    methods: {
        async fetchAllOffers() {
            try {
                this.isLoading = true;
                const res = await this.$store.dispatch(
                    "projects/fetchAllOffers",
                );
                this.offers = res.data.filter((offer: any) => offer.status);
            } finally {
                this.isLoading = false;
            }
        },
    },
    mounted() {
        this.fetchAllOffers();
    },
});
</script>