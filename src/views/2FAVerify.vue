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
                                    Multi-Factor Authentication 🚪
                                </div>
                                <div class="text-body mt-2 mb-5 grey--text">
                                    {{
                                        loggedInUser.has_2fa_auth_app
                                            ? "Enter OTP from Google Authenticator App"
                                            : "Click proceed to receive an OTP to complete login"
                                    }}
                                </div>
                            </div>
                        </v-col>

                        <v-col
                            cols="12"
                            v-if="sentOtp || loggedInUser.has_2fa_auth_app"
                        >
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

                        <v-col
                            cols="12"
                            v-if="sentOtp || loggedInUser.has_2fa_auth_app"
                        >
                            <v-btn
                                block
                                :loading="isLoading"
                                depressed
                                color="primary"
                                class="py-6"
                                @click="handleSubmit"
                                >Verify</v-btn
                            >
                        </v-col>

                        <v-col
                            cols="12"
                            v-if="!sentOtp && loggedInUser.has_2fa_email"
                        >
                            <v-btn
                                block
                                :loading="isSendingOtp"
                                depressed
                                color="primary"
                                class="py-6"
                                @click="handleResend"
                                >Send OTP</v-btn
                            >
                        </v-col>
                        <v-col
                            cols="12"
                            v-if="
                                sentOtp &&
                                !isLoading &&
                                loggedInUser.has_2fa_email
                            "
                        >
                            <v-btn
                                block
                                :loading="isSendingOtp"
                                depressed
                                text
                                color="primary"
                                class="py-6"
                                @click="handleResend"
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
import { mapState } from "vuex";

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
        ...mapState("auth", ["loggedInUser"]),
    },
    methods: {
        async verifyEmail2Fa(): Promise<void> {
            try {
                this.isLoading = true;
                const res = await AuthService.verifyEmail2Fa({
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
        async verifySecret2Fa(): Promise<void> {
            try {
                this.isLoading = true;
                const res = await AuthService.verifySecret2Fa({
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
        async resend2FaEmailOtp(): Promise<void> {
            try {
                this.isSendingOtp = true;
                this.sentOtp = false;

                const res = await AuthService.resend2FaEmailOtp();

                if (res.status) {
                    this.sentOtp = true;
                }

                this.$store.commit("openSnackbar", res.message, { root: true });
            } finally {
                this.isSendingOtp = false;
            }
        },
        handleResend() {
            //
            if (this.loggedInUser?.has_2fa_email) {
                this.resend2FaEmailOtp();
            }
        },
        handleSubmit() {
            if (this.loggedInUser?.has_2fa_email) {
                this.verifyEmail2Fa();
            } else if (this.loggedInUser?.has_2fa_auth_app) {
                this.verifySecret2Fa();
            }
        },
    },
});
</script>
