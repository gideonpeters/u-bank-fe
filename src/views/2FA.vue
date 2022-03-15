<template>
    <auth>
        <v-row justify="center" align="center" class="w-100"></v-row>
        <v-row v-if="step === 0">
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
                            <div class="text-left">
                                <div
                                    class="text-lg-h4 text-h5 font-weight-bold"
                                >
                                    Multi-Factor Authentication 🚪
                                </div>
                                <div class="text-body mt-2 mb-5 grey--text">
                                    Welcome to U-Bank, Kindly select an option
                                    to secure your account
                                </div>
                            </div>
                        </v-col>
                        <v-col cols="12">
                            <v-radio-group v-model="radioGroup">
                                <v-radio
                                    class="mb-3"
                                    v-for="mfaOption in mfaOptions"
                                    :key="mfaOption.key"
                                    :label="mfaOption.label"
                                    :value="mfaOption.key"
                                ></v-radio>
                            </v-radio-group>
                        </v-col>
                        <v-col cols="12" v-if="radioGroup">
                            <v-btn
                                block
                                depressed
                                color="primary"
                                class="py-6"
                                @click="step = 1"
                                >Proceed</v-btn
                            >
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
        <v-row v-if="step === 1 && radioGroup === 'EMAIL_OTP'">
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
                            <div class="text-left">
                                <div
                                    class="text-lg-h4 text-h5 font-weight-bold"
                                >
                                    Multi-Factor Authentication 🚪
                                </div>
                                <div class="text-body mt-2 mb-5 grey--text">
                                    Email OTP selected, validate email OTP to
                                    complete!
                                </div>
                            </div>
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
                                @click="verifyEmail2Fa"
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
                                @click="resendEmail2FaOtp"
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
                                @click="resendEmail2FaOtp"
                                >Resend OTP</v-btn
                            >
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
        <v-row v-if="step === 1 && radioGroup === 'GOOGLE_AUTHENTICATOR'">
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
                            <div class="text-left">
                                <div
                                    class="text-lg-h4 text-h5 font-weight-bold"
                                >
                                    Multi-Factor Authentication 🚪
                                </div>
                                <div class="text-body mt-2 mb-5 grey--text">
                                    Generate Secret Key for Google Authenticator
                                    App
                                </div>
                            </div>
                        </v-col>

                        <v-col cols="12">
                            <v-btn
                                block
                                depressed
                                :loading="isGeneratingKey"
                                color="primary"
                                class="py-6"
                                @click="generateKey"
                                >Generate Secret</v-btn
                            >
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
        <v-row v-if="step === 2">
            <v-col cols="12">
                <div class="text-left">
                    <div class="text-lg-h4 text-h5 font-weight-bold">
                        Multi-Factor Authentication 🚪
                    </div>
                    <div class="text-body mt-2 mb-5 grey--text">
                        Kindly scan this code using your google authenticator
                        app
                    </div>
                </div>
            </v-col>

            <v-col cols="12">
                <div v-html="loginSecurity.google2fa_url" />
                <div class="mt-2">
                    Or use this code:
                    {{ spacify(loginSecurity.secret) }}
                </div>
            </v-col>
            <v-col cols="12">
                <v-btn
                    block
                    depressed
                    color="primary"
                    class="py-6"
                    @click="step = 3"
                    >Proceed</v-btn
                >
            </v-col>
        </v-row>
        <v-row v-if="step === 3">
            <v-col cols="12">
                <div class="text-left">
                    <div class="text-lg-h4 text-h5 font-weight-bold">
                        Multi-Factor Authentication 🚪
                    </div>
                    <div class="text-body mt-2 mb-5 grey--text">
                        Kindly enter the OTP provided in your google
                        authenticator app!
                    </div>
                </div>
            </v-col>

            <v-col cols="12">
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

            <v-col cols="12">
                <v-btn
                    block
                    depressed
                    color="primary"
                    class="py-6"
                    :loading="isLoading"
                    @click="enableSecret2Fa"
                    >Finish</v-btn
                >
            </v-col>
        </v-row>
    </auth>
</template>

<script lang="ts">
import Vue from "vue";
import Auth from "../layouts/Auth.vue";
import {
    DASHBOARD,
    FORGOT_PASSWORD,
    SIGNUP,
    VERIFY_EMAIL,
} from "../router/endpoints";
import { AuthService } from "../services";
import { mapActions } from "vuex";

export default Vue.extend({
    components: { Auth },
    data() {
        return {
            step: 0,
            isGeneratingKey: false,
            DASHBOARD,
            radioGroup: "",
            mfaOptions: [
                { label: "Use Email OTPs", key: "EMAIL_OTP" },
                {
                    label: "Use Google Authenticator",
                    key: "GOOGLE_AUTHENTICATOR",
                },
            ],
            loginSecurity: {},
            sentOtp: false,
            isSendingOtp: false,
            isLoading: false,
            form: {
                otp: "",
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
        ...mapActions("auth", ["fetchProfile"]),
        async generateKey() {
            this.isGeneratingKey = true;

            try {
                const res = await AuthService.generateKey();
                console.log(res);
                if (res.status) {
                    this.step = 2;
                    this.$store.commit("openSnackbar", res.message, {
                        root: true,
                    });
                    await this.getQr();
                }
            } catch (error) {
                this.isGeneratingKey = false;
            } finally {
                this.isGeneratingKey = false;
            }
        },
        async getQr() {
            const res = await AuthService.getQR();
            console.log(res);
            this.loginSecurity = res.data;
        },
        async verifyEmail2Fa() {
            try {
                this.isLoading = true;
                const res = await AuthService.verifyEmail2Fa({
                    otp: this.form.otp,
                });

                this.$store.commit("openSnackbar", res.message, { root: true });

                if (res.status) {
                    this.fetchProfile();

                    this.$router.push({
                        name: DASHBOARD.NAME,
                    });
                }
            } finally {
                this.isLoading = false;
            }
        },
        async resendEmail2FaOtp() {
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
        spacify(str: any, after = 4, c = " ") {
            if (!str) {
                return false;
            }
            after = after || 4;
            c = c || " ";
            var v = str.replace(/[^\dA-Z]/g, ""),
                reg = new RegExp(".{" + after + "}", "g");
            return str.replace(/\W/gi, "").replace(/(.{4})/g, "$1 ");
        },
        async enableSecret2Fa(): Promise<void> {
            try {
                this.isLoading = true;
                const res = await AuthService.enableSecret2Fa({
                    otp: this.form.otp,
                });

                this.$store.commit("openSnackbar", res.message, { root: true });

                if (res.status) {
                    this.fetchProfile();
                    this.$router.push({
                        name: DASHBOARD.NAME,
                    });
                }
            } finally {
                this.isLoading = false;
            }
        },
    },
});
</script>
