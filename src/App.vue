<template>
    <v-app>
        <div class="flex nw-body">
            <component :is="layout">
                <transition name="fade">
                    <router-view> </router-view>
                </transition>
            </component>
        </div>
        <v-snackbar
            top
            right
            outlined
            height="50"
            color="primary"
            v-model="snackbar.isActive"
            :timeout="snackbar.timeout"
        >
            {{ snackbar.text }}
            <v-btn small color="secondary" text @click="closeSnackbar"
                >Close</v-btn
            >
        </v-snackbar>
    </v-app>
</template>

<script>
export default {
    name: "App",
    data: () => ({
        //
    }),
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
// .nw-body {
//     height: 100vh;
//     min-height: 100vh;
//     box-sizing: border-box;
// }

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
