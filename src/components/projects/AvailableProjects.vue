<template>
    <v-row class="mt-5 mx-0 px-0">
        <v-col
            cols="12"
            md="4"
            class="mx-0 px-0"
            v-for="(project, i) in projects"
            :key="i"
        >
            <v-project-card :project="project" />
        </v-col>
    </v-row>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    data() {
        return {
            isLoading: false,
            projects: [],
        };
    },
    methods: {
        async fetchProjects() {
            try {
                this.isLoading = true;
                const res = await this.$store.dispatch(
                    "projects/fetchProjects",
                );
                this.projects = res.data.filter(
                    (project: any) => project.visible,
                );
            } finally {
                this.isLoading = false;
            }
        },
    },
    mounted() {
        this.fetchProjects();
    },
});
</script>