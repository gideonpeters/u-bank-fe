<template>
    <v-app>
        <div class="">
            <component :is="layout">
                <transition name="fade">
                    <router-view> </router-view>
                </transition>
            </component>
        </div>
        <v-snackbar
            top
            right
            height="50"
            color="info"
            v-model="snackbar.isActive"
            :timeout="snackbar.timeout"
        >
            <div class="d-flex align-center">
                {{ snackbar.text }}
                <v-btn
                    class="ml-auto"
                    small
                    color="secondary"
                    text
                    @click="closeSnackbar"
                    >Close</v-btn
                >
            </div>
        </v-snackbar>
    </v-app>
</template>

<script>
export default {
    name: "App",
    data: () => ({}),
    computed: {
        layout() {
            return this.$route.meta.layout || "public";
        },
        snackbar() {
            return this.$store.state.snackbar;
        },
    },
    methods: {
        closeSnackbar() {
            return this.$store.commit("closeSnackbar");
        },
    },
};
</script>

<style lang="scss">
.v-application {
    font-family: $body-font-family, sans-serif !important;
    .title {
        // To pin point specific classes of some components
        font-family: $title-font, sans-serif !important;
    }
}

.v-application .v-application--wrap * {
    font-family: $body-font-family !important;
}

v-app {
    font-family: $body-font-family !important;
}

// ::v-deep .v-application {
//     [class*="text-"] {
//         font-family: $font-family, sans-serif !important;
//     }
//     font-family: $font-family, sans-serif !important;
// }

// ::v-deep html,
body {
    overflow-x: hidden;
}

// ::v-deep v-app {
//     font-family: $body-font-family !important;
// }
</style>
