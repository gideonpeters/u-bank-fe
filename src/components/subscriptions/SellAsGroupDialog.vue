<template>
    <v-row justify="center">
        <v-dialog
            v-bind="$attrs"
            persistent
            max-width="600px"
            transition="dialog-bottom-transition"
        >
            <v-card color="tertiary-light">
                <v-card-title>
                    <span class="text-h5">Sell as group</span>
                </v-card-title>

                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <div>
                                    Are you sure you want to sell as a group?
                                </div>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="success" text @click="sellAsGroup">
                        Yes
                    </v-btn>

                    <v-btn
                        depressed
                        :loading="isSaving"
                        color="error"
                        @click="$emit('toggle', false)"
                    >
                        No
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    inheritAttrs: true,
    props: {
        fund: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            isSaving: false,
            form: {
                unitPrice: 0,
                units: 1,
            },
        };
    },
    methods: {
        async sellAsGroup() {
            try {
                this.isSaving = true;

                // const res = await this.$store.dispatch("projects/createOffer", {
                //     subscriptionId: this.fund.id,
                //     ...this.form,
                // });
                // this.$store.commit("openSnackbar", res.message, { root: true });

                this.$emit("completed");
            } finally {
                this.isSaving = false;
            }
        },
    },
});
</script>