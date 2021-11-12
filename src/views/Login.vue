<template>
    <auth>
        <v-row justify="center" align="center" class="w-100">
            <v-col cols="12">
                <div class="text-left mb-2">
                    <div class="text-lg-h4 text-h5 font-weight-bold">
                        Login 🚪
                    </div>
                    <div class="text-body mt-2 mb-5 grey--text">
                        Welcome to Abode, Let's get you logged in
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
            <v-col cols="12" sm="12" md="12">
                <v-text-field
                    shaped
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
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
                <v-checkbox
                    hide-details
                    v-model="form.rememberMe"
                    label="Remember Me"
                ></v-checkbox>
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
            <v-col cols="12">
                <div class="d-flex justify-center text-subtitle-1">
                    <div class="mr-1">Don't have an account?</div>
                    <div class="pointer primary--text" @click="goToSignUp">
                        Sign up
                    </div>
                </div>
            </v-col>
            <v-col cols="12">
                <div class="d-flex justify-center">
                    <v-btn
                        depressed
                        text
                        @click="goToForgotPassword"
                        color="primary"
                        class="text-none text-subtitle-1"
                        >Forgot Password?</v-btn
                    >
                </div>
            </v-col>
        </v-row>
    </auth>
</template>

<script lang="ts">
import Vue from "vue";
import Auth from "../layouts/Auth.vue";
import { DASHBOARD, SIGNUP } from "../router/endpoints";

export default Vue.extend({
    components: { Auth },
    data() {
        return {
            showPassword: false,
            isLoading: false,
            form: {
                loginId: "",
                password: "",
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
        async login(): Promise<void> {
            try {
                this.isLoading = true;
                const res = await this.$store.dispatch("auth/login", this.form);
                if (res.status) {
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
            this.$router.push({ name: SIGNUP.NAME });
        },
    },
});
</script>
