<template>
    <div class="w-100">
        <v-row class="mt-5" justify="space-between">
            <v-col>
                <v-btn color="tertiary-light" depressed @click="$router.go(-1)"
                    >Go Back</v-btn
                >
            </v-col>
            <v-col cols="12">
                <v-card
                    flat
                    class="rounded-xl d-flex"
                    color="tertiary-light"
                    height="250px"
                    width="100%"
                    max-width="100%"
                >
                    <v-img
                        class="white--text align-end rounded-xl"
                        :src="project.image_url"
                        width="100%"
                        max-width="100%"
                        gradient="to bottom left, rgba(100,115,201,.33), rgba(25,32,72,.7)"
                    >
                        <v-card-title class="text-h4">{{
                            project.name
                        }}</v-card-title>
                    </v-img>
                </v-card>
            </v-col>
            <v-col cols="12" md="8">
                <div class="black--text font-weight-bold mt-5 mb-2">
                    Description
                </div>
                <div v-html="project.description" style="font-size: 18px"></div>
                <div class="d-flex align-center mt-8">
                    <v-progress-linear
                        :value="project.percent_funded"
                        class="mr-2"
                    ></v-progress-linear>
                    {{ project.percent_funded }}%
                </div>
                <v-row class="mt-8">
                    <v-col cols="12" md="6" class="mb-3">
                        <div class="d-flex">
                            <v-svg name="detail-icon" class="mr-2"></v-svg>
                            Unit Price: N{{ project.unit_price }}
                        </div>
                    </v-col>
                    <v-col cols="12" md="6" class="mb-3">
                        <div class="d-flex">
                            <v-svg name="detail-icon" class="mr-2"></v-svg>
                            Available Units:
                            {{ project.expected_slots }} unit(s)
                        </div>
                    </v-col>
                    <v-col cols="12" md="6" class="mb-3">
                        <div class="d-flex">
                            <v-svg name="detail-icon" class="mr-2"></v-svg>
                            Launched On:
                            {{
                                formatDate(
                                    project.launched_at,
                                    DateTime.DATE_MED,
                                )
                            }}
                        </div>
                    </v-col>
                    <v-col cols="12" md="6" class="mb-3">
                        <div class="d-flex">
                            <v-svg name="detail-icon" class="mr-2"></v-svg>
                            Potential Growth:
                            {{ project.potential_growth }}
                        </div>
                    </v-col>
                    <v-col cols="12" md="6" class="mb-3">
                        <div class="d-flex">
                            <v-svg name="detail-icon" class="mr-2"></v-svg>
                            Holding Period:
                            {{ project.max_duration }} month(s)
                        </div>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="12" md="3">
                <v-btn
                    color="warning"
                    block
                    :disabled="project.percent_funded == 100"
                    depressed
                    class="text-none mt-8"
                    @click="fundDialog = true"
                    >Subscribe</v-btn
                >
                <!-- <v-btn color="tertiary-light" block depressed class="text-none mt-8"
                >Share Project</v-btn
            > -->
            </v-col>
            <v-col cols="12">
                <fund-dialog
                    @completed="goToProjects"
                    v-model="fundDialog"
                    :project="project"
                    @toggle="fundDialog = $event"
                />
            </v-col>
        </v-row>
    </div>
</template>

<script lang="ts">
import FundDialog from "@/components/projects/FundDialog.vue";
import Vue from "vue";
import { formatDate } from "@/utils/helpers";
import { DateTime } from "luxon";
import { PROJECTS } from "@/router/endpoints";

export default Vue.extend({
    components: { FundDialog },
    data() {
        return {
            isLoading: false,
            fundDialog: false,
            DateTime,
            project: {
                title: "",
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus tellus tristique tristique lectus montes, et scelerisque morbi. Aliquam tortor, lobortis diam aliquam mollis. Convallis augue elit mattis dui suscipit quam duis urna aliquet. Vitae vulputate orci dolor adipiscing iaculis arcu, morbi morbi amet.",
                details: [
                    "Price Per Share: 600,000.00",
                    "Available Shares: 6000",
                    "Launched: 26/06/2021",
                    "Closes: 6/08/2021",
                ],
            },
        };
    },
    methods: {
        formatDate,
        async fetchProjectById() {
            try {
                this.isLoading = true;
                const projectId = this.$route.params.projectId;

                const res = await this.$store.dispatch(
                    "projects/fetchProjectById",
                    projectId,
                );

                this.project = res.data;

                this.isLoading = false;
            } finally {
            }
        },
        goToProjects() {
            this.fundDialog = false;
            this.$router.push({ name: PROJECTS.NAME });
        },
    },
    mounted() {
        this.fetchProjectById();
    },
});
</script>