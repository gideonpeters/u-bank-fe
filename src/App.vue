<template>
    <v-app>
        <div class="flex nw-body">
            <router-view />
        </div>
    </v-app>
</template>

<script>
export default {
    name: "App",

    data: () => ({
        //
    }),
};
</script>

<style lang="scss" scoped>
.nw-body {
    height: 100vh;
    min-height: 100vh;
    box-sizing: border-box;
}
</style>
