<template>
    <v-card flat color="transparent" class="d-flex" width="100%" no-gutters>
        <v-card flat color="transparent" width="30%">
            <v-select
                hide-details
                shaped
                class="overflow-hidden rounded-tr-0 rounded-br-0"
                v-model="countryCode"
                :menu-props="{ bottom: true, offsetY: true }"
                item-value="callingCode"
                :items="countries"
                filled
            >
                <template #item="{ item }">
                    <div class="d-flex align-center">
                        <v-img :src="item.flag" width="30px"> </v-img>
                        <div class="ml-2">
                            {{ item.callingCode }}
                        </div>
                    </div>
                </template>
                <template #selection="{ item }">
                    <div class="d-flex flex-column align-center py-1 pr-2">
                        <div class="mb-1 caption">
                            {{ item.callingCode }}
                        </div>
                        <v-img :src="item.flag" width="30px"> </v-img>
                    </div>
                </template>
            </v-select>
        </v-card>
        <v-card flat color="transparent" width="100%">
            <v-text-field
                shaped
                label="Phone Number"
                class="rounded-tl-0 rounded-bl-0"
                v-model="phoneNumber"
                hide-details
                filled
            />
        </v-card>
    </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import countries from "./../../utils/countries";

export default Vue.extend({
    data() {
        return {
            countries,
            countryCode: "",
            phoneNumber: "",
        };
    },
    methods: {
        updateValue() {
            this.$emit("input", this.countryCode + this.phoneNumber);
        },
    },
    watch: {
        phoneNumber() {
            this.updateValue();
        },
        countryCode() {
            this.updateValue();
        },
    },
});
</script>