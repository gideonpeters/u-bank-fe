<template>
    <div class="w-100">
        <v-row class="mt-5">
            <v-col cols="12">
                <v-card
                    flat
                    class="rounded-xl w-100"
                    color="tertiary-light"
                    height="250px"
                ></v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-card
                    flat
                    color="transparent"
                    max-width="100%"
                    class="w-100 overflow-x-hidden px-0 mx-0"
                >
                    <v-tabs
                        v-model="tab"
                        background-color="transparent"
                        class="px-0 mx-0 w-100"
                    >
                        <v-tab
                            exact
                            replace
                            v-for="item in tabItems"
                            :key="item.tab"
                            @click="
                                $router.replace({
                                    query: { tab: item.tab },
                                })
                            "
                        >
                            {{ item.title }}
                        </v-tab>
                    </v-tabs>
                    <v-tabs-items v-model="tab">
                        <v-tab-item
                            v-for="(item, indx) in tabItems"
                            :key="indx"
                        >
                            <available-projects v-if="indx === 0" />
                            <my-projects v-if="indx === 1" />
                            <available-offers v-if="indx === 2" />
                        </v-tab-item>
                    </v-tabs-items>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import AvailableProjects from "../components/projects/AvailableProjects.vue";
import AvailableOffers from "../components/projects/AvailableOffers.vue";
import MyProjects from "../components/projects/MyProjects.vue";

interface TabItem {
    title: string;
    tab: string;
    content: string;
}

export default Vue.extend({
    components: {
        AvailableProjects,
        MyProjects,
        AvailableOffers,
    },
    data(): {
        tab: number | string | string[] | null | undefined | TabItem;
        tabItems: TabItem[];
    } {
        return {
            tab: null,
            tabItems: [
                {
                    tab: "available",
                    title: "Offers",
                    content: "Tab 1 Content",
                },
                {
                    tab: "my-projects",
                    title: "My Subscriptions",
                    content: "Tab 2 Content",
                },
                // { tab: "sales", title: "Sales", content: "Tab 3 Content" },
                {
                    tab: "available-offers",
                    title: "Asset Market",
                    content: "Tab 3 Content",
                },
                // { tab: "my-bids", title: "My Bids", content: "Tab 4 Content" },
            ],
        };
    },
    methods: {
        initialiseTab() {
            const tab: string | (string | null)[] = this.$route.query.tab!;

            if (tab) {
                const tabItem: TabItem | undefined = this.tabItems!.find(
                    (item: TabItem) => item.tab === tab,
                );
                const index: number = this.tabItems.indexOf(tabItem!);

                this.tab = index;
            }
        },
    },
    watch: {
        // tab(v) {
        //     console.log("v" + v);
        // },
    },
    mounted() {
        this.initialiseTab();
    },
});
</script>
