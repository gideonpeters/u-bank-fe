<template>
    <auth>
        <v-row justify="center" align="center" class="w-100"> </v-row>
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
                                    Forgot Password 🚪
                                </div>
                                <div class="text-body mt-2 mb-5 grey--text">
                                    Enter email/username so we send you a
                                    password reset otp email
                                </div>
                            </div>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
                                shaped
                                label="Email/Username"
                                :rules="[rules.required]"
                                v-model="form.loginId"
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
                        <v-col cols="12" sm="12" md="12" v-if="sentOtp">
                            <v-text-field
                                shaped
                                :append-icon="
                                    showPassword ? 'mdi-eye' : 'mdi-eye-off'
                                "
                                :rules="[rules.required, rules.min]"
                                @click:append="showPassword = !showPassword"
                                :type="showPassword ? 'text' : 'password'"
                                hint="At least 8 characters"
                                label="Password"
                                v-model="form.password"
                                hide-details
                                filled
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12" md="12" v-if="sentOtp">
                            <v-text-field
                                shaped
                                :append-icon="
                                    showConfirmPassword
                                        ? 'mdi-eye'
                                        : 'mdi-eye-off'
                                "
                                :rules="[rules.passwordMatch]"
                                @click:append="
                                    showConfirmPassword = !showConfirmPassword
                                "
                                :type="
                                    showConfirmPassword ? 'text' : 'password'
                                "
                                label="Confirm Password"
                                hint="Your password must match"
                                v-model="form.confirmPassword"
                                hide-details
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
                                @click="resetPassword"
                                >Reset Password</v-btn
                            >
                        </v-col>

                        <v-col cols="12" v-if="!sentOtp">
                            <v-btn
                                block
                                :loading="isSendingOtp"
                                depressed
                                color="primary"
                                class="py-6"
                                @click="forgotPassword"
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
                                @click="forgotPassword"
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
        isLoading: boolean;
        isSendingOtp: boolean;
        showPassword: boolean;
        showConfirmPassword: boolean;
        sentOtp: boolean;
        form: {
            loginId: string;
            password: string;
            confirmPassword: string;
            otp: string | number;
            rememberMe: boolean;
        };
    } {
        return {
            isLoading: false,
            sentOtp: false,
            isSendingOtp: false,
            showPassword: false,
            showConfirmPassword: false,
            form: {
                loginId: "",
                otp: "",
                password: "",
                confirmPassword: "",
                rememberMe: false,
            },
        };
    },
    computed: {
        rules(): {
            required: (val: string) => string | boolean;
            min: (val: string) => string | boolean;
            passwordMatch: (val: string) => boolean;
        } {
            return {
                required: (value) => !!value || "Required.",
                min: (v) => v.length >= 8 || "Min 8 characters",
                passwordMatch: (value) => value == this.form.password,
            };
        },
    },
    methods: {
        async resetPassword(): Promise<void> {
            try {
                this.isLoading = true;

                const res = await AuthService.resetPassword({
                    email: this.form.loginId,
                    password: this.form.password,
                    otp: this.form.otp,
                });

                this.$store.commit("openSnackbar", res.message, { root: true });

                if (res.status) {
                    this.$router.push({
                        name: LOGIN.NAME,
                        query: {
                            loginId: this.form.loginId,
                        },
                    });
                }
            } finally {
                this.isLoading = false;
            }
        },
        async forgotPassword(): Promise<void> {
            try {
                this.sentOtp = false;

                this.isSendingOtp = true;
                const res = await AuthService.forgotPassword(this.form.loginId);

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
            this.form.loginId = email as string;
        }
    },
});
</script>
