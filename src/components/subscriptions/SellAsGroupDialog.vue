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
                                    You can not undo this action
                                </div>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="success"
                        :loading="isSaving"
                        text
                        @click="sellAsGroup"
                    >
                        Yes
                    </v-btn>

                    <v-btn
                        depressed
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
        };
    },
    methods: {
        async sellAsGroup() {
            try {
                this.isSaving = true;

                const res = await this.$store.dispatch("projects/sellAsGroup", {
                    fundId: this.fund.id,
                    action: true,
                });
                this.$store.commit("openSnackbar", res.message, { root: true });

                this.$emit("completed");
            } finally {
                this.isSaving = false;
            }
        },
    },
});
</script>