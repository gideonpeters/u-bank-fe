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
                    <span class="text-h5">Sell as individual</span>
                </v-card-title>

                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field
                                    shaped
                                    filled
                                    v-model="form.units"
                                    :max="fund.units"
                                    type="number"
                                    persistent-hint
                                    label="Number of Units*"
                                    required
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    shaped
                                    filled
                                    v-model="form.unitPrice"
                                    type="number"
                                    label="Unit Price*"
                                    required
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    shaped
                                    filled
                                    readonly
                                    :value="form.unitPrice * form.units"
                                    type="number"
                                    label="Total Value"
                                    required
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                    <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="$emit('toggle', false)"
                    >
                        Close
                    </v-btn>

                    <v-btn
                        :loading="isSaving"
                        color="blue darken-1"
                        text
                        @click="createOffer"
                    >
                        Save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
//format Money values into Namount;

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
        async createOffer() {
            try {
                this.isSaving = true;

                const res = await this.$store.dispatch("projects/createOffer", {
                    subscriptionId: this.fund.id,
                    ...this.form,
                });
                this.$store.commit("openSnackbar", res.message, { root: true });

                this.$emit("completed");
            } finally {
                this.isSaving = false;
            }
        },
    },
    watch: {
        fund(v) {
            this.form.unitPrice = v.project.unit_price;
        },
    },
    mounted() {
        this.form.unitPrice = this.fund.project.unit_price;
    },
});
</script>