<template>
    <v-app>
        <div class="flex nw-body">
            <component :is="layout">
                <transition name="fade">
                    <router-view> </router-view>
                </transition>
            </component>
        </div>
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
    },
};
</script>

<style lang="scss">
.nw-body {
    height: 100vh;
    min-height: 100vh;
    box-sizing: border-box;
}

::v-deep .v-application {
    [class*="text-"] {
        font-family: $font-family, sans-serif !important;
    }
    font-family: $font-family, sans-serif !important;
}

::v-deep html,
body {
    font-family: $font-family, sans-serif !important;
}

::v-deep v-app {
    font-family: $body-font-family !important;
}
</style>
