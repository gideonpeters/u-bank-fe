<template>
    <v-row justify="center">
        <v-dialog v-bind="$attrs" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="text-h5">Withdraw from Wallet</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field
                                    shaped
                                    filled
                                    :rules="[rules.required, rules.min]"
                                    v-model="form.amount"
                                    label="Amount*"
                                    type="number"
                                    persistent-hint
                                    :hint="`You currently have ${walletBalance} in your wallet`"
                                    required
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-select
                                    shaped
                                    filled
                                    v-model="form.bank"
                                    :rules="[rules.required]"
                                    :items="bankAccounts"
                                    label="Select Destination Bank*"
                                    item-value="id"
                                    required
                                >
                                    <template #item="{ item }">
                                        <div>
                                            <div>{{ item.account_name }}</div>
                                            <div>
                                                {{ item.bank_name }} ({{
                                                    item.account_number
                                                }})
                                            </div>
                                        </div>
                                    </template>
                                    <template #selection="{ item }">
                                        <div>
                                            <div>
                                                {{ item.account_name }} ({{
                                                    item.account_number
                                                }})
                                            </div>
                                        </div>
                                    </template>
                                </v-select>
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
                        v-if="!sentOtp"
                        :loading="isSendingOtp"
                        color="blue darken-1"
                        text
                        @click="requestOtp"
                    >
                        Request OTP
                    </v-btn>
                    <v-btn
                        v-else
                        :loading="isSaving"
                        color="blue darken-1"
                        text
                        @click="withdraw"
                    >
                        Withdraw
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
        bankAccounts: {
            type: Array,
            default: () => [],
        },
        walletBalance: {
            type: [Number, String],
            default: "",
        },
    },
    data() {
        return {
            isSendingOtp: false,
            isSaving: false,
            sentOtp: false,
            form: {
                amount: "",
                otp: "",
                bank: "",
            },
        };
    },
    computed: {
        rules(): {
            required: (val: string) => string | boolean;
            min: (val: string | number) => string | boolean;
        } {
            return {
                required: (value) => !!value || "Required.",
                min: (v) => v >= 2000 || "Minimum of 2000 naira",
            };
        },
    },
    methods: {
        async requestOtp() {
            try {
                this.isSendingOtp = true;

                const res = await this.$store.dispatch(
                    "transactions/requestOtp",
                    "WITHDRAW",
                );

                if (res.status) {
                    this.sentOtp = true;
                }

                this.$store.commit("openSnackbar", res.message, { root: true });
            } finally {
                this.isSendingOtp = false;
            }
        },
        async withdraw() {
            try {
                this.isSaving = true;

                await this.$store.dispatch("transactions/withdraw", this.form);

                this.$emit("completed");
            } finally {
                this.isSaving = false;
            }
        },
    },
});
</script>