<template>
    <v-row class="mt-5">
        <v-col cols="12">
            <v-card
                flat
                class="rounded-xl w-100"
                color="tertiary-light"
                height="250px"
            ></v-card>
        </v-col>
        <v-col>
            <v-card flat color="transparent">
                <v-tabs v-model="tab" background-color="transparent">
                    <v-tab
                        exact
                        replace
                        v-for="item in tabItems"
                        :key="item.tab"
                        @click="$router.replace({ query: { tab: item.tab } })"
                    >
                        {{ item.title }}
                    </v-tab>
                </v-tabs>
                <v-tabs-items v-model="tab">
                    <v-tab-item v-for="(item, indx) in tabItems" :key="indx">
                        <available-projects v-if="indx === 0" />
                        <my-projects v-if="indx === 1" />
                        <!-- <available-projects v-if="indx === 2" />
                        <available-projects v-if="indx === 3" />
                        <available-projects v-if="indx === 4" /> -->
                    </v-tab-item>
                </v-tabs-items>
            </v-card>
        </v-col>
    </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import AvailableProjects from "../components/projects/AvailableProjects.vue";
import MyProjects from "../components/projects/MyProjects.vue";
// import AvailableProjects from "./../components/projects/AvailableProjects.vue";

interface TabItem {
    title: string;
    tab: string;
    content: string;
}

export default Vue.extend({
    components: {
        AvailableProjects,
        MyProjects,
        // AvailableProjects,
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
                    title: "Available",
                    content: "Tab 1 Content",
                },
                {
                    tab: "my-projects",
                    title: "My Subscriptions",
                    content: "Tab 2 Content",
                },
                // { tab: "sales", title: "Sales", content: "Tab 3 Content" },
                // {
                //     tab: "my-offers",
                //     title: "My Offers",
                //     content: "Tab 3 Content",
                // },
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