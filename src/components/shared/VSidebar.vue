<template>
    <v-card class="h-100 w-100" flat width="100%">
        <v-navigation-drawer
            width="100%"
            class="z-4 w-100 py-10"
            dark
            color="primary"
            v-bind="$attrs"
        >
            <template v-slot:prepend>
                <v-list-item>
                    <div
                        class="
                            font-weight-bold
                            d-flex
                            w-100
                            mb-8
                            text-h5
                            align-center
                            flex-column
                        "
                    >
                        Net Worth
                    </div>
                </v-list-item>
                <v-list-item>
                    <div class="d-flex w-100 flex-column align-center">
                        <v-avatar size="120">
                            <img
                                src="https://randomuser.me/api/portraits/men/80.jpg"
                            />
                        </v-avatar>
                        <div class="mt-5 mb-1 text-h6">Jeffery Ehikioya</div>
                        <div class="mb-5 grey--text text--lighten-2">
                            jeff@gmail.com
                        </div>
                    </div>
                </v-list-item>
            </template>
            <v-list dense rounded class="z-4">
                <v-list-item
                    v-for="item in items"
                    :key="item.title"
                    link
                    :to="{ name: item.route }"
                    class="mb-2 z-4"
                >
                    <v-list-item-icon>
                        <v-svg :name="item.icon" />
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title v-html="item.title" />
                    </v-list-item-content>
                </v-list-item>
            </v-list>
            <template v-slot:append>
                <div class="d-flex justify-center z-4">
                    <v-btn
                        @click="logout"
                        depressed
                        class="rounded-pill px-10 text-none my-2"
                    >
                        Logout
                    </v-btn>
                </div>
                <v-svg
                    name="sidebar-pattern"
                    class="sidebar__pattern z-1"
                    width="350"
                />
            </template>
        </v-navigation-drawer>
    </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import {
    DASHBOARD,
    LOGIN,
    PORTFOLIO,
    PROFILE,
    PROJECTS,
    SETTINGS,
    WALLET,
} from "../../router/endpoints";
export default Vue.extend({
    inheritAttrs: true,
    data() {
        return {
            items: [
                {
                    title: "Dashboard",
                    icon: "dashboard-icon",
                    route: DASHBOARD.NAME,
                },
                { title: "My Wallet", icon: "wallet-icon", route: WALLET.NAME },
                {
                    title: "Projects",
                    icon: "projects-icon",
                    route: PROJECTS.NAME,
                },
                { title: "Profile", icon: "profile-icon", route: PROFILE.NAME },
                {
                    title: "<div class='d-flex align-center'>My Portfolio <div class='px-2 error ml-2 rounded-pill text-caption' color='error'>Coming Soon</div> </div>",
                    icon: "portfolio-icon",
                    route: PORTFOLIO.NAME,
                },
                {
                    title: "Settings",
                    icon: "settings-icon",
                    route: SETTINGS.NAME,
                },
            ],
        };
    },
    methods: {
        logout() {
            this.$router.push({ name: LOGIN.NAME });
        },
    },
});
</script>