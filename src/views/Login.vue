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
                                    {{
                                        !loggedInUser.name
                                            ? "Login"
                                            : `Welcome back ${loggedInUser.name}`
                                    }}
                                    🚪
                                </div>
                                <div class="text-body mt-2 mb-5 grey--text">
                                    Let's get you logged in
                                </div>
                            </div>
                        </v-col>
                        <v-col cols="12" v-if="!loggedInUser.name">
                            <v-text-field
                                shaped
                                label="Email"
                                :rules="[rules.required]"
                                v-model="form.email"
                                hide-details
                                filled
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12" md="12">
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

                        <v-col cols="12">
                            <v-btn
                                block
                                :loading="isLoading"
                                depressed
                                color="primary"
                                class="py-6"
                                @click="login"
                                >Login</v-btn
                            >
                        </v-col>
                        <v-col cols="12" v-if="loggedInUser.name">
                            <div class="d-flex justify-center text-subtitle-1">
                                <div class="mr-1">
                                    Not {{ loggedInUser.email }}?
                                </div>
                                <div
                                    class="pointer primary--text"
                                    @click="clearUser"
                                >
                                    Sign In with different account
                                </div>
                            </div>
                        </v-col>
                    </v-row>
                    <v-col cols="12">
                        <div class="d-flex justify-center text-subtitle-1">
                            <div class="mr-1">Don't have an account?</div>
                            <div
                                class="pointer primary--text"
                                @click="goToSignUp"
                            >
                                Sign up
                            </div>
                        </div>
                    </v-col>
                </v-card>
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
    MFA_VERIFY,
} from "../router/endpoints";
import { mapState, mapMutations } from "vuex";

export default Vue.extend({
    components: { Auth },
    data() {
        return {
            showPassword: false,
            isLoading: false,
            form: {
                email: "",
                password: "",
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
        ...mapMutations("auth", ["setUser"]),
        async login(): Promise<void> {
            try {
                this.isLoading = true;
                if (this.loggedInUser)
                    this.form.email = this.loggedInUser.email;
                const res = await this.$store.dispatch("auth/login", this.form);

                if (!res.data.user.email_verified_at) {
                    this.$store.commit(
                        "openSnackbar",
                        "You need to verify your account",
                        { root: true },
                    );
                    this.$router.push({
                        name: VERIFY_EMAIL.NAME,
                        query: {
                            email: this.form.email,
                        },
                    });
                } else if (
                    res.status &&
                    (this.loggedInUser?.has_2fa_auth_app ||
                        this.loggedInUser?.has_2fa_email)
                ) {
                    this.$router.push({ name: MFA_VERIFY.NAME });
                } else if (
                    res.status &&
                    !(
                        this.loggedInUser?.has_2fa_auth_app ||
                        this.loggedInUser?.has_2fa_email
                    )
                ) {
                    this.$router.push({ name: DASHBOARD.NAME });
                }
            } finally {
                this.isLoading = false;
            }
        },
        goToSignUp() {
            this.$router.push({ name: SIGNUP.NAME });
        },
        goToForgotPassword() {
            this.$router.push({ name: FORGOT_PASSWORD.NAME });
        },
        clearUser() {
            this.setUser(null);
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
