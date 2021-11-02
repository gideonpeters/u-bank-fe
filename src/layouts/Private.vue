<template>
    <div class="d-flex overflow-y-hidden">
        <v-sidebar
            app
            v-model="drawer"
            absolute
            temporary
            class="d-none d-md-flex"
            v-if="$vuetify.breakpoint.smAndDown"
        />
        <v-card
            max-height="100vh"
            height="100vh"
            min-width="330px"
            flat
            color="transparent"
            class="d-none d-lg-flex align-center overflow-y-hidden pl-5 pr-10"
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
        <div class="container mt-5 mx-10">
            <div class="d-flex w-100 justify-space-between align-center">
                <transition name="fade">
                    <div class="d-flex align-center">
                        <v-btn
                            class="mr-3"
                            depressed
                            icon
                            @click="drawer = !drawer"
                            v-if="$vuetify.breakpoint.smAndDown"
                        >
                            <v-icon>mdi-menu</v-icon>
                        </v-btn>

                        <div
                            class="text-md-h4 text-h5 font-weight-medium"
                            :key="title"
                        >
                            {{ title }}
                        </div>
                    </div>
                </transition>
                <div>
                    <v-badge avatar bordered overlap class="pointer">
                        <template v-slot:badge>
                            <v-avatar size="10"> 1 </v-avatar>
                        </template>

                        <v-icon>mdi-bell</v-icon>
                    </v-badge>
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
