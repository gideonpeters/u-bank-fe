<template>
    <div>
        <v-sidebar
            @toggle="drawer = $event"
            isMobile
            app
            absolute
            class="z-5"
            temporary
            v-model="drawer"
            v-if="$vuetify.breakpoint.mdAndDown"
        />
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
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { RouteMeta } from "vue-router";

export default Vue.extend({
    data() {
        return {
            drawer: false,
        };
    },
    computed: {
        title(): string {
            const routeMeta: RouteMeta | undefined = this.$route.meta;

            return routeMeta?.title;
        },
    },
    methods: {
        logout() {},
    },
});
</script>
