<template>
    <v-app>
        <div class="d-flex overflow-y-hidden">
            <div class="container mt-5 mx-md-10 mx-3 overflow-x-hidden">
                <div class="d-flex w-100 align-center">
                    <transition name="fade">
                        <div class="d-flex align-center w-100">
                            <div
                                class="mr-auto"
                                v-if="$vuetify.breakpoint.mdAndDown"
                            >
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

                            <div
                                class="text-md-h4 text-h5 font-weight-medium mr-auto"
                                :key="title"
                            >
                                {{ title }}
                            </div>
                            <div
                                class="d-flex align-center"
                                v-if="$vuetify.breakpoint.mdAndDown"
                            >
                                <v-img
                                    @click="goToHome"
                                    src="./../assets/images/abode_logo--short.png"
                                    contain
                                    width="30px"
                                    height="50px"
                                ></v-img>
                            </div>
                        </div>
                    </transition>
                    <div>
                        <v-menu offset-y>
                            <template v-slot:activator="{ on, attrs }">
                                <v-avatar
                                    color="orange"
                                    size="62"
                                    v-bind="attrs"
                                    v-on="on"
                                >
                                    <span class="white--text text-h5">{{
                                        loggedInUser.name[0]
                                    }}</span>
                                </v-avatar>
                            </template>
                            <v-list>
                                <v-list-item @click="setup2fa">
                                    Setup 2FA
                                </v-list-item>
                                <v-list-item @click="logout">
                                    Logout
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </div>
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
    MFA,
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
    },

    methods: {
        logout() {
            localStorage.removeItem("token");
            this.$router.push({ name: LOGIN.NAME });
        },
        goToHome() {
            this.$router.push({ name: DASHBOARD.NAME });
        },
        setup2fa() {
            this.$router.push({ name: MFA.NAME });
        },
    },
});
</script>
