<template>
    <v-row class="w-100 mt-8">
        <v-col cols="12" md="8">
            <div
                class="
                    d-flex
                    flex-md-row flex-column
                    justify-space-between
                    align-center
                "
            >
                <v-project-card />
                <div class="w-100 ml-md-5 ml-0 mt-5 mt-md-0">
                    <v-card
                        min-height="150px"
                        flat
                        class="
                            pointer
                            flex-column
                            rounded-xl
                            v-shadow
                            white--text
                            px-5
                            py-6
                            w-100
                            d-flex
                            justify-center
                            align-center
                        "
                        color="primary"
                    >
                        <v-svg name="wallet-metric" width="60" height="25" />
                        <div class="text-h4 my-2">₦50,000</div>
                        <div>Wallet</div>
                    </v-card>
                    <div class="d-flex mt-5">
                        <v-card
                            flat
                            height="150px"
                            class="
                                pointer
                                w-100
                                rounded-xl
                                d-flex
                                flex-column
                                align-center
                                justify-center
                            "
                            color="tertiary-light pa-4"
                        >
                            <div class="text-h5">5</div>
                            <div class="text-caption">Projects funded</div>
                        </v-card>
                        <v-card
                            flat
                            height="150px"
                            class="
                                pointer
                                w-100
                                rounded-xl
                                d-flex
                                flex-column
                                align-center
                                justify-center
                            "
                            color="tertiary pa-4 ml-4"
                        >
                            5 Projects funded
                        </v-card>
                    </div>
                </div>
            </div>
            <div class="mt-10">
                <div class="text-h6">Recent Activities</div>
                <v-card flat>
                    <v-data-table
                        hide-default-header
                        hide-default-footer
                        :headers="activityHeaders"
                        :items="activities"
                        :items-per-page="5"
                    >
                        <template #item.status>
                            <v-icon size="18" class="success--text"
                                >mdi-arrow-down</v-icon
                            >
                        </template>
                    </v-data-table>
                </v-card>
            </div>
        </v-col>
        <v-col cols="12" md="4">
            <v-card
                min-height="150px"
                flat
                class="
                    flex-column
                    rounded-xl
                    v-shadow
                    white--text
                    px-5
                    py-6
                    w-100
                    d-flex
                    justify-center
                    align-center
                "
                color="primary"
            >
            </v-card>
            <v-card
                flat
                class="rounded-xl w-100 mt-10"
                color="tertiary-light"
                height="100%"
            ></v-card>
        </v-col>
    </v-row>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    data() {
        return {
            activityHeaders: [
                {
                    text: "",
                    align: "start",
                    sortable: false,
                    value: "status",
                },
                { text: "", value: "description" },
                { text: "", value: "datetime" },
            ],
            activities: [
                {
                    status: "new",
                    description: "Your wallet was just debited",
                    datetime: "2 days ago",
                },
                {
                    status: "new",
                    description: "Your wallet was just debited",
                    datetime: "2 days ago",
                },
                {
                    status: "new",
                    description: "Your wallet was just debited",
                    datetime: "2 days ago",
                },
                {
                    status: "new",
                    description: "Your wallet was just debited",
                    datetime: "2 days ago",
                },
            ],
        };
    },
});
</script>

<style lang="scss" scoped>
::v-deep tr {
    height: 80px !important;
    padding-top: 10px;
    padding-bottom: 10px;
}
</style>