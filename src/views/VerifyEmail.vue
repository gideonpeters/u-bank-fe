<template>
    <auth>
        <v-row justify="center" align="center" class="w-100"></v-row>
        <v-row>
            <v-col cols="12">
                <v-card
                    flat
                    :color="
                        $vuetify.breakpoint.mdAndDown ? 'white' : 'transparent'
                    "
                    class="pa-5 elevation-0"
                >
                    <v-row>
                        <v-col cols="12">
                            <div class="text-left mb-2">
                                <div
                                    class="text-lg-h4 text-h5 font-weight-bold"
                                >
                                    Verify Email 🚪
                                </div>
                                <div class="text-body mt-2 mb-5 grey--text">
                                    Enter email so we send you a verification
                                    email
                                </div>
                            </div>
                        </v-col>
                        <v-col cols="12" v-if="!sentOtp">
                            <v-text-field
                                shaped
                                label="Email"
                                :rules="[rules.required]"
                                v-model="form.email"
                                hide-details
                                filled
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" v-if="sentOtp">
                            <v-text-field
                                shaped
                                label="OTP"
                                :rules="[rules.required]"
                                v-model="form.otp"
                                hide-details
                                type="number"
                                filled
                            ></v-text-field>
                        </v-col>

                        <v-col cols="12" v-if="sentOtp">
                            <v-btn
                                block
                                :loading="isLoading"
                                depressed
                                color="primary"
                                class="py-6"
                                @click="verifyEmail"
                                >Verify</v-btn
                            >
                        </v-col>

                        <v-col cols="12" v-if="!sentOtp">
                            <v-btn
                                block
                                :loading="isSendingOtp"
                                depressed
                                color="primary"
                                class="py-6"
                                @click="resendEmailVerification"
                                >Send OTP</v-btn
                            >
                        </v-col>
                        <v-col cols="12" v-if="sentOtp && !isLoading">
                            <v-btn
                                block
                                :loading="isSendingOtp"
                                depressed
                                text
                                color="primary"
                                class="py-6"
                                @click="resendEmailVerification"
                                >Resend OTP</v-btn
                            >
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
    </auth>
</template>

<script lang="ts">
import Vue from "vue";
import Auth from "../layouts/Auth.vue";
import { DASHBOARD, LOGIN, SIGNUP } from "../router/endpoints";
import { AuthService } from "../services";

export default Vue.extend({
    components: { Auth },
    data(): {
        showPassword: boolean;
        isLoading: boolean;
        isSendingOtp: boolean;
        sentOtp: boolean;
        form: {
            email: string;
            otp: string | number;
            rememberMe: boolean;
        };
    } {
        return {
            showPassword: false,
            isLoading: false,
            sentOtp: false,
            isSendingOtp: false,
            form: {
                email: "",
                otp: "",
                rememberMe: false,
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
                min: (v) => v.length >= 8 || "Min 8 characters",
            };
        },
    },
    methods: {
        async verifyEmail(): Promise<void> {
            try {
                this.isLoading = true;
                const res = await AuthService.verifyEmail({
                    email: this.form.email,
                    otp: this.form.otp,
                });
                this.$store.commit("openSnackbar", res.message, { root: true });

                if (res.status) {
                    this.$router.push({
                        name: DASHBOARD.NAME,
                    });
                }
            } finally {
                this.isLoading = false;
            }
        },
        async resendEmailVerification(): Promise<void> {
            try {
                this.isSendingOtp = true;
                this.sentOtp = false;

                const res = await AuthService.resendEmailVerification(
                    this.form.email,
                );

                if (res.status) {
                    this.sentOtp = true;
                }

                this.$store.commit("openSnackbar", res.message, { root: true });
            } finally {
                this.isSendingOtp = false;
            }
        },
        goToSignUp() {
            this.$router.push({ name: SIGNUP.NAME });
        },
        goToForgotPassword() {
            this.$router.push({ name: SIGNUP.NAME });
        },
    },
    mounted() {
        const { email } = this.$route.query;

        if (email) {
            this.form.email = email as string;
        }
    },
});
</script>
