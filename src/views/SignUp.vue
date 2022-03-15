<template>
    <auth>
        <v-row justify="center" align="center">
            <v-col cols="12">
                <v-card
                    flat
                    :color="
                        $vuetify.breakpoint.mdAndDown ? 'white' : 'transparent'
                    "
                    class="pa-5 elevation-0"
                >
                    <transition name="fade">
                        <v-row>
                            <v-col cols="12">
                                <div class="text-left mb-2">
                                    <div
                                        class="text-lg-h4 text-h5 font-weight-bold"
                                    >
                                        Sign Up 👨🏽‍💻
                                    </div>
                                    <div class="text-body mt-2 mb-5 grey--text">
                                        Welcome to U-Bank, Let's get you
                                        registered
                                    </div>
                                </div>
                            </v-col>
                            <v-col cols="12" sm="12" md="12">
                                <v-text-field
                                    shaped
                                    label="Full Name*"
                                    v-model="form.name"
                                    hide-details
                                    filled
                                ></v-text-field>
                            </v-col>

                            <v-col cols="12" sm="12" md="12">
                                <v-text-field
                                    shaped
                                    label="Email*"
                                    v-model="form.email"
                                    hide-details
                                    filled
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12" md="12">
                                <v-text-field
                                    shaped
                                    label="Phone Number*"
                                    v-model="form.phoneNumber"
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
                            <v-col cols="12" sm="12" md="12">
                                <v-text-field
                                    shaped
                                    :append-icon="
                                        showConfirmPassword
                                            ? 'mdi-eye'
                                            : 'mdi-eye-off'
                                    "
                                    :rules="[rules.passwordMatch]"
                                    @click:append="
                                        showConfirmPassword =
                                            !showConfirmPassword
                                    "
                                    :type="
                                        showConfirmPassword
                                            ? 'text'
                                            : 'password'
                                    "
                                    label="Confirm Password"
                                    hint="Your password must match"
                                    v-model="form.confirmPassword"
                                    hide-details
                                    filled
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-row align="center">
                                    <v-checkbox
                                        v-model="form.agreed"
                                        hide-details
                                        class="shrink mr-2 mt-0"
                                    ></v-checkbox>
                                    <div class="d-flex align-center">
                                        I agree to the
                                        <v-btn
                                            @click="showTerms = true"
                                            color="info"
                                            depressed
                                            text
                                            class="text-none"
                                            >Terms & Conditions</v-btn
                                        >
                                    </div>
                                </v-row>
                            </v-col>
                            <v-col>
                                <terms
                                    v-model="showTerms"
                                    @completed="
                                        form.agreed = $event;
                                        showTerms = false;
                                    "
                                />
                            </v-col>
                            <v-col cols="12" sm="12" md="12">
                                <div class="d-flex justify-end mt-8">
                                    <v-btn
                                        depressed
                                        color="primary"
                                        class="py-6 px-10"
                                        :loading="isResolving"
                                        persistent-hint
                                        @click="signup"
                                        >Register</v-btn
                                    >
                                </div>
                            </v-col>
                        </v-row>
                    </transition>
                </v-card>
            </v-col>
        </v-row>
    </auth>
</template>

<script lang="ts">
import Vue from "vue";
import Terms from "../components/Terms.vue";
import Auth from "../layouts/Auth.vue";
import { LOGIN, VERIFY_EMAIL } from "../router/endpoints";

export default Vue.extend({
    components: { Auth, Terms },
    data(): {
        isResolving: boolean;
        showTerms: boolean;
        resolvedReferrer: string;
        form: {
            name: string;
            email: string;
            phoneNumber: string;
            password: string;
            confirmPassword: string;
            rememberMe: boolean;
            agreed: boolean;
        };
        showPassword: boolean;
        showConfirmPassword: boolean;
    } {
        return {
            isResolving: false,
            showTerms: false,
            resolvedReferrer: "",
            form: {
                name: "",
                email: "",
                phoneNumber: "",
                password: "",
                confirmPassword: "",
                rememberMe: false,
                agreed: false,
            },
            showPassword: false,
            showConfirmPassword: false,
        };
    },
    computed: {
        rules(): {
            required: (val: string) => string | boolean;
            min: (val: string) => string | boolean;
            emailMatch: (val: string) => string;
            passwordMatch: (val: string) => boolean;
        } {
            return {
                required: (value) => !!value || "Required.",
                min: (v) => v.length >= 8 || "Min 8 characters",
                emailMatch: () =>
                    `The email and password you entered don't match`,
                passwordMatch: (value) => value == this.form.password,
            };
        },
    },

    methods: {
        async signup() {
            try {
                this.isResolving = true;
                const res = await this.$store.dispatch(
                    "auth/signup",
                    this.form,
                );

                this.$store.commit("openSnackbar", res.message, {
                    root: true,
                });
            } finally {
                this.isResolving = false;
            }
        },

        submit() {
            this.$router.push({ name: "" });
        },

        goToLogin() {
            this.$router.push({ name: LOGIN.NAME });
        },
    },
});
</script>
