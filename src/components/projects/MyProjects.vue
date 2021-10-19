<template>
    <v-row class="mt-5 mx-0 px-0">
        <v-col cols="4" v-for="i in 6" :key="i">
            <v-project-card owned />
        </v-col>
    </v-row>
</template>