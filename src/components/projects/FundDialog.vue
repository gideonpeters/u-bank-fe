<template>
    <v-row justify="center">
        <v-dialog
            v-bind="$attrs"
            persistent
            max-width="600px"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
        >
            <v-card color="tertiary-light">
                <v-card-title>
                    <span class="text-h5">Fund {{ project.name }} project</span>
                </v-card-title>
                <v-card-text>
                    <payment-information v-if="form.type != 'wallet'" />
                </v-card-text>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12" md="6">
                                <v-text-field
                                    shaped
                                    filled
                                    :rules="[rules.required]"
                                    v-model="form.units"
                                    :max="project.expected_slots"
                                    type="number"
                                    persistent-hint
                                    :hint="`Price per unit: N${project.unit_price}`"
                                    label="Number of Units*"
                                    required
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field
                                    shaped
                                    filled
                                    :value="project.unit_price * form.units"
                                    type="number"
                                    readonly
                                    label="Total Amount*"
                                    required
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-select
                                    shaped
                                    filled
                                    v-model="form.type"
                                    :rules="[rules.required]"
                                    :items="[
                                        ...paymentTypes,
                                        { name: 'Wallet', label: 'wallet' },
                                    ]"
                                    label="Payment Type*"
                                    item-value="label"
                                    item-text="name"
                                    required
                                ></v-select>
                            </v-col>
                            <v-col
                                cols="12"
                                md="6"
                                v-if="form.type === 'bank_transfer'"
                            >
                                <v-select
                                    shaped
                                    filled
                                    v-model="form.bankCode"
                                    :rules="[rules.required]"
                                    :items="banks"
                                    label="Select Paying Bank*"
                                    item-value="code"
                                    item-text="name"
                                    required
                                ></v-select>
                            </v-col>
                            <v-col
                                cols="12"
                                md="6"
                                v-if="form.type == 'bank_transfer'"
                            >
                                <v-text-field
                                    shaped
                                    filled
                                    :readonly="form.type == 'wallet'"
                                    :rules="[rules.required]"
                                    v-model="form.reference"
                                    label="Reference(e.g. Transaction ref or Date)*"
                                    required
                                ></v-text-field>
                            </v-col>
                            <v-col
                                cols="12"
                                md="6"
                                v-if="form.type != 'wallet'"
                            >
                                <v-file-input
                                    filled
                                    v-model="form.proof"
                                    shaped
                                    :rules="[rules.required, rules.max]"
                                    accept="image/png, image/jpeg, image/bmp"
                                    placeholder="Pick an image"
                                    prepend-icon=""
                                    prepend-inner-icon="mdi-paperclip"
                                    label="Payment Proof"
                                ></v-file-input>
                            </v-col>
                        </v-row>
                    </v-container>
                    <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions class="mt-10">
                    <v-spacer></v-spacer>
                    <v-btn color="error" text @click="$emit('toggle', false)">
                        Cancel
                    </v-btn>

                    <v-btn
                        depressed
                        :loading="isSaving"
                        color="success"
                        @click="fund"
                    >
                        Proceed
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import { banks } from "@/utils/nigerianBanks";
import PaymentInformation from "../PaymentInformation.vue";
import { mapState } from "vuex";

interface IFundDialog {
    isSaving: boolean;
    banks: { code: string; name: string }[];
    form: {
        amount: number;
        proof: File | string | null;
        reference: string;
        type: "online_transfer" | "bank_transfer" | "wallet" | string;
        bankCode: string | number;
        units: number;
    };
}

export default Vue.extend({
    components: { PaymentInformation },
    inheritAttrs: true,
    props: {
        project: {
            type: Object,
            required: true,
        },
    },
    data(): IFundDialog {
        return {
            isSaving: false,
            banks,
            form: {
                amount: 0,
                proof: null,
                reference: "",
                type: "",
                bankCode: "",
                units: 1,
            },
        };
    },
    computed: {
        ...mapState("transactions", ["paymentTypes"]),
        rules(): {
            required: (val: string) => string | boolean;
            min: (val: string) => string | boolean;
            max: (val: string | number) => string | boolean;
        } {
            return {
                required: (value) => !!value || "Required.",
                min: (v) => v.length === 10 || "Should be 10 characters",
                max: (value: any) =>
                    !value ||
                    value.size < 2000000 ||
                    "Avatar size should be less than 2 MB!",
            };
        },
        selectedPaymentOption(): string {
            return this.form.type;
        },
    },
    methods: {
        async fund() {
            try {
                this.isSaving = true;

                const res = await this.$store.dispatch("projects/fundProject", {
                    projectId: this.project.id,
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
        selectedPaymentOption(v) {
            if (v == "wallet") {
                this.form.reference = new Date().toString();
            }
        },
    },
});
</script>