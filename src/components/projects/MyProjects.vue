<template>
    <v-row class="mt-5 mx-0 px-0">
        <v-col
            cols="12"
            md="4"
            v-for="fundedProject in fundedProjects"
            :key="fundedProject.id"
        >
            <v-project-card
                :project="fundedProject.project"
                :fund="fundedProject"
                owned
            />
        </v-col>
    </v-row>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    data() {
        return {
            isLoading: false,
            fundedProjects: [],
        };
    },
    methods: {
        async fetchFundedProjects() {
            try {
                this.isLoading = true;
                const res = await this.$store.dispatch(
                    "projects/fetchFundedProjects",
                );
                this.fundedProjects = res.data;
            } finally {
                this.isLoading = false;
            }
        },
    },
    mounted() {
        this.fetchFundedProjects();
    },
});
</script>