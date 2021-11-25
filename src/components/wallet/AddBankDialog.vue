<template>
    <v-row justify="center">
        <v-dialog v-bind="$attrs" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="text-h5">Add Bank Account</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-select
                                    shaped
                                    filled
                                    v-model="form.bankCode"
                                    :rules="[rules.required]"
                                    :items="banks"
                                    label="Select Bank*"
                                    item-value="code"
                                    item-text="name"
                                    required
                                ></v-select>
                            </v-col>
                            <v-col cols="12" v-if="form.bankCode">
                                <v-text-field
                                    shaped
                                    filled
                                    :rules="[rules.required, rules.min]"
                                    v-model="form.accountNumber"
                                    label="Account Number*"
                                    :hint="
                                        resolvedBankAccount
                                            ? resolvedBankAccount.account_name
                                            : ''
                                    "
                                    persistent-hint
                                    type="number"
                                    :loading="isResolving"
                                    required
                                ></v-text-field>
                            </v-col>

                            <v-col cols="12" v-if="sentOtp">
                                <v-text-field
                                    shaped
                                    :rules="[rules.required]"
                                    filled
                                    v-model="form.otp"
                                    label="Otp*"
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
                        v-if="!sentOtp && resolvedBankAccount"
                        :loading="isSendingOtp"
                        color="blue darken-1"
                        text
                        @click="requestOtp"
                    >
                        Request OTP
                    </v-btn>
                    <v-btn
                        v-if="!sentOtp && !resolvedBankAccount"
                        :loading="isResolving"
                        color="blue darken-1"
                        text
                        @click="resolveBankAccount"
                    >
                        Resolve
                    </v-btn>
                    <v-btn
                        v-if="sentOtp && resolvedBankAccount"
                        :loading="isSaving"
                        color="blue darken-1"
                        text
                        @click="addBank"
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
import { banks } from "@/utils/nigerianBanks";

export default Vue.extend({
    inheritAttrs: true,
    data() {
        return {
            isSendingOtp: false,
            isSaving: false,
            isResolving: false,
            resolvedBankAccount: null,
            sentOtp: false,
            banks,
            form: {
                accountName: "",
                accountNumber: "",
                otp: "",
                bankCode: "",
            },
        };
    },
    computed: {
        rules(): {
            required: (val: string) => string | boolean;
            min: (val: string) => string | boolean;
        } {
            return {
                required: (value) => !!value || "Required.",
                min: (v) => v.length === 10 || "Should be 10 characters",
            };
        },
    },
    methods: {
        async requestOtp() {
            try {
                this.isSendingOtp = true;

                const res = await this.$store.dispatch(
                    "transactions/requestOtp",
                    "ADD_BANK",
                );

                if (res.status) {
                    this.sentOtp = true;
                }

                this.$store.commit("openSnackbar", res.message, { root: true });
            } finally {
                this.isSendingOtp = false;
            }
        },
        async addBank() {
            try {
                this.isSaving = true;

                const res = await this.$store.dispatch(
                    "transactions/addBank",
                    this.form,
                );
                this.$store.commit("openSnackbar", res.message, { root: true });

                this.$emit("completed");
            } finally {
                this.isSaving = false;
            }
        },
        async resolveBankAccount() {
            try {
                this.isResolving = true;

                const res = await this.$store.dispatch(
                    "transactions/resolveBankAccount",
                    this.form,
                );

                this.resolvedBankAccount = res.data;
                this.form.accountName = this.resolvedBankAccount.account_name;
                this.$store.commit("openSnackbar", res.message, { root: true });
            } finally {
                this.isResolving = false;
            }
        },
    },
});
</script>