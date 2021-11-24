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
                                    Verify Email 🚪
                                </div>
                                <div class="text-body mt-2 mb-5 grey--text">
                                    Enter email so we send you a verification
                                    email
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

                        <v-col cols="12">
                            <v-btn
                                block
                                :loading="isLoading"
                                depressed
                                color="primary"
                                class="py-6"
                                @click="resendEmailVerification"
                                >Send Verification</v-btn
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
        form: {
            loginId: string;
            otp: string | number;
            rememberMe: boolean;
        };
    } {
        return {
            showPassword: false,
            isLoading: false,
            form: {
                loginId: "",
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
        async verifyEmail(url: string): Promise<void> {
            try {
                this.isLoading = true;
                const res = await AuthService.verifyEmail(url);
                this.$store.commit("openSnackbar", res.message, { root: true });

                if (res.status) {
                    this.$router.push({ name: LOGIN.NAME });
                }
            } finally {
                this.isLoading = false;
            }
        },
        async resendEmailVerification(): Promise<void> {
            try {
                this.isLoading = true;
                const res = await AuthService.resendEmailVerification(
                    this.form.loginId,
                );

                this.$store.commit("openSnackbar", res.message, { root: true });
            } finally {
                this.isLoading = false;
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
        const { url, email } = this.$route.query;

        if (url) {
            this.verifyEmail(url as string);
        }
        if (email) {
            this.form.loginId = email as string;
        }
    },
});
</script>
