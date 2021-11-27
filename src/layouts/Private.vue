<template>
    <v-app>
        <!-- <v-sidebar
            @toggle="drawer = $event"
            isMobile
            app
            absolute
            class="z-5"
            temporary
            v-model="drawer"
            v-if="$vuetify.breakpoint.mdAndDown"
        /> -->
        <v-navigation-drawer
            dark
            color="primary"
            width="100%"
            style="height: -webkit-fill-available"
            height="100%"
            absolute
            temporary
            v-model="drawer"
        >
            <v-btn
                @click="drawer = false"
                icon
                class="absolute"
                color="white"
                style="top: 15px; right: 15px"
            >
                <v-icon size="45px">mdi-close</v-icon>
            </v-btn>
            <template v-slot:prepend>
                <v-list-item>
                    <v-img
                        src="./../assets/images/abode_logo--white.png"
                        contain
                        width="150px"
                        height="150px"
                    ></v-img>
                </v-list-item>
                <v-list-item>
                    <div class="d-flex w-100 flex-column align-center">
                        <v-avatar size="120" color="tertiary-light">
                            <img
                                v-if="client && client.profile_image"
                                :src="client.profile_image"
                            />
                            <span
                                class="black--text text-h4"
                                v-if="client && !client.profile_image"
                                >{{ client.first_name[0] }}
                                {{ client.last_name[0] }}</span
                            >
                        </v-avatar>
                        <div class="mt-5 mb-1 text-h6">
                            {{ loggedInUser.name }}
                        </div>
                        <div class="mb-5 grey--text text--lighten-2">
                            {{ loggedInUser.email }}
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
            <div class="d-flex justify-center z-4 my-5">
                <v-btn
                    @click="logout"
                    depressed
                    class="rounded-pill px-10 text-none my-2"
                >
                    Logout
                </v-btn>
            </div>
            <template v-slot:append>
                <!-- <v-svg
                    name="sidebar-pattern"
                    class="sidebar__pattern z-1"
                    width="350"
                /> -->
            </template>
        </v-navigation-drawer>
        <div class="d-flex overflow-y-hidden">
            <v-card
                v-if="!$vuetify.breakpoint.mdAndDown"
                max-height="100vh"
                height="100vh"
                min-width="330px"
                flat
                color="transparent"
                class="
                    d-none d-md-flex
                    align-center
                    overflow-y-hidden
                    pl-5
                    pr-10
                "
            >
                <v-card
                    min-width="330"
                    max-width="330"
                    color="transparent"
                    flat
                    height="95%"
                    class="h-100 rounded-xl pa-5 fixed"
                >
                    <v-sidebar permanent floating />
                </v-card>
            </v-card>
            <div class="container mt-5 mx-md-10 mx-3 overflow-x-hidden">
                <div class="d-flex w-100 align-center">
                    <transition name="fade">
                        <div class="d-flex align-center w-100">
                            <div
                                v-if="$vuetify.breakpoint.mdAndDown"
                                class="mr-auto"
                            >
                                <v-img
                                    @click="goToHome"
                                    src="./../assets/images/abode_logo--short.png"
                                    contain
                                    width="40px"
                                    height="50px"
                                ></v-img>
                            </div>

                            <div
                                class="
                                    text-md-h4 text-h5
                                    font-weight-medium
                                    mr-auto
                                "
                                :key="title"
                            >
                                {{ title }}
                            </div>
                            <v-btn
                                class="mr-3"
                                depressed
                                icon
                                @click="drawer = !drawer"
                                v-if="$vuetify.breakpoint.mdAndDown"
                            >
                                <v-icon>mdi-menu</v-icon>
                            </v-btn>
                        </div>
                    </transition>
                    <!-- <div>
                    <v-badge avatar bordered overlap class="pointer">
                        <template v-slot:badge>
                            <v-avatar size="10"> 1 </v-avatar>
                        </template>

                        <v-icon>mdi-bell</v-icon>
                    </v-badge>
                </div> -->
                </div>
                <!-- <div class="overflow-y-auto"> -->
                <div class="d-flex w-100">
                    <transition name="fade"> <router-view /> </transition>
                </div>
                <!-- </div> -->
                <!-- <v-main class="nw-body"> -->
                <!-- </v-main> -->
            </div>
        </div>
    </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { RouteMeta } from "vue-router";
import { mapState } from "vuex";
import {
    DASHBOARD,
    LOGIN,
    PORTFOLIO,
    PROFILE,
    PROJECTS,
    SETTINGS,
    WALLET,
} from "./../router/endpoints";

export default Vue.extend({
    data() {
        return {
            drawer: null,
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
                // {
                //     title: "Settings",
                //     icon: "settings-icon",
                //     route: SETTINGS.NAME,
                // },
            ],
        };
    },
    computed: {
        title(): string {
            const routeMeta: RouteMeta | undefined = this.$route.meta;

            return routeMeta?.title;
        },
        ...mapState("auth", ["loggedInUser"]),
        client() {
            return this.loggedInUser.client || {};
        },
    },

    methods: {
        logout() {
            this.$router.push({ name: LOGIN.NAME });
        },
        goToHome() {
            this.$router.push({ name: DASHBOARD.NAME });
        },
    },
});
</script>
