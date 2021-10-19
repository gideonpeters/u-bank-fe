<template>
    <v-row class="mt-5" justify="space-between">
        <v-col cols="12">
            <v-card
                flat
                class="rounded-xl w-100"
                color="tertiary-light"
                height="250px"
            ></v-card>
        </v-col>
        <v-col cols="8">
            <div class="black--text font-weight-bold mt-5 mb-2">
                Description
            </div>
            <div v-html="project.description"></div>
            <div class="d-flex align-center mt-8">
                <v-progress-linear value="15" class="mr-2"></v-progress-linear>
                15%
            </div>
            <v-row class="mt-8">
                <v-col
                    cols="6"
                    class="mb-3"
                    v-for="(detail, ix) in project.details"
                    :key="ix"
                >
                    <div class="d-flex">
                        <v-svg name="detail-icon" class="mr-2"></v-svg>
                        {{ detail }}
                    </div>
                </v-col>
            </v-row>
        </v-col>
        <v-col cols="3">
            <v-btn color="warning" block depressed class="text-none mt-8"
                >Fund Project</v-btn
            >
            <v-btn color="tertiary-light" block depressed class="text-none mt-8"
                >Share Project</v-btn
            >
        </v-col>
    </v-row>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    data() {
        return {
            project: {
                title: "",
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus tellus tristique tristique lectus montes, et scelerisque morbi. Aliquam tortor, lobortis diam aliquam mollis. Convallis augue elit mattis dui suscipit quam duis urna aliquet. Vitae vulputate orci dolor adipiscing iaculis arcu, morbi morbi amet.",
                details: [
                    "Duration: 6 Months",
                    "Duration: 6 Months",
                    "Duration: 6 Months",
                    "Duration: 6 Months",
                ],
            },
        };
    },
    methods: {},
});
</script>