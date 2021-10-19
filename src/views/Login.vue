<template>
    <auth>
        <v-row justify="center" align="center" class="w-100">
            <v-col cols="12">
                <div class="text-left mb-2">
                    <div class="text-lg-h4 text-h5 font-weight-bold">
                        Login 🚪
                    </div>
                    <div class="text-body mt-2 mb-5 grey--text">
                        Welcome to Net Worth, Let's get you logged in
                    </div>
                </div>
            </v-col>
            <v-col cols="12" sm="12" md="12">
                <v-text-field
                    label="Email/Username"
                    v-model="form.email"
                    hide-details
                    filled
                ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="12">
                <v-text-field
                    v-model="form.password"
                    label="Password"
                    hide-details
                    filled
                ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="12">
                <v-checkbox
                    hide-details
                    v-model="form.rememberMe"
                    label="Remember Me"
                ></v-checkbox>
            </v-col>
            <v-col cols="12" sm="12" md="12">
                <v-btn
                    block
                    depressed
                    color="primary"
                    class="py-6"
                    @click="login"
                    >Login</v-btn
                >
            </v-col>
            <v-col cols="12" sm="12" md="12">
                <div class="d-flex justify-center text-subtitle-1">
                    <div class="mr-1">Don't have an account?</div>
                    <div class="pointer primary--text" @click="goToSignUp">
                        Sign up
                    </div>
                </div>
            </v-col>
            <v-col cols="12" sm="12" md="12">
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
            form: {
                email: "",
                password: "",
                rememberMe: false,
            },
        };
    },
    methods: {
        login() {
            this.$router.push({ name: DASHBOARD.NAME });
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
