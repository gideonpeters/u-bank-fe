<template>
    <v-row justify="center">
        <v-dialog v-bind="$attrs" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="text-h5">Topup Wallet</span>
                </v-card-title>
                <v-card-text>
                    <payment-information />
                </v-card-text>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field
                                    shaped
                                    filled
                                    :rules="[rules.required]"
                                    v-model="form.amount"
                                    type="number"
                                    label="Amount*"
                                    required
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    shaped
                                    filled
                                    :rules="[rules.required]"
                                    v-model="form.reference"
                                    label="Reference(e.g. Transaction ref or Date)*"
                                    required
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-select
                                    shaped
                                    filled
                                    v-model="form.type"
                                    :rules="[rules.required]"
                                    :items="paymentTypes"
                                    label="Payment Type*"
                                    item-value="label"
                                    item-text="name"
                                    required
                                ></v-select>
                            </v-col>
                            <v-col
                                cols="12"
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
                            <v-col cols="12">
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
                        @click="topup"
                    >
                        Topup
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script lang="ts">
import { banks } from "@/utils/nigerianBanks";
import Vue from "vue";
import PaymentInformation from "@/components/PaymentInformation.vue";
import { mapState } from "vuex";

export default Vue.extend({
    inheritAttrs: true,
    components: {
        PaymentInformation,
    },
    data() {
        return {
            isSaving: false,
            banks,
            form: {
                amount: "",
                reference: "",
                type: "",
                bankCode: "",
                proof: null,
            },
        };
    },
    computed: {
        ...mapState("transactions", ["paymentTypes"]),
        rules(): {
            required: (val: string) => string | boolean;
            max: (val: string | number) => string | boolean;
        } {
            return {
                required: (value) => !!value || "Required.",
                max: (value: any) =>
                    !value ||
                    value.size < 2000000 ||
                    "Avatar size should be less than 2 MB!",
            };
        },
    },
    methods: {
        async topup() {
            try {
                this.isSaving = true;

                const res = await this.$store.dispatch(
                    "transactions/topup",
                    this.form,
                );
                this.$store.commit("openSnackbar", res.message, { root: true });

                this.$emit("completed");
            } finally {
                this.isSaving = false;
            }
        },
    },
});
</script>