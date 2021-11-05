<template>
    <auth>
        <template #sidebar>
            <v-row class="fill-height" align="center" justify="end">
                <v-col cols="12">
                    <div class="d-flex justify-center">
                        <v-stepper
                            tile
                            dark
                            class="primary"
                            width="400px"
                            elevation="0"
                            v-model="onboardingStepper"
                            vertical
                        >
                            <v-stepper-step
                                :complete="onboardingStepper > 1"
                                step="1"
                                color="white"
                                class="black--text"
                            >
                                Tell us about yourself 👨🏽‍💻
                                <small class="mt-2"
                                    >Just some information to help us know you
                                    better</small
                                >
                            </v-stepper-step>

                            <v-stepper-content step="1"> </v-stepper-content>

                            <!-- <v-stepper-step
                                :complete="onboardingStepper > 2"
                                step="2"
                            >
                                Configure your login details 🔐
                            </v-stepper-step> -->

                            <!-- <v-stepper-content step="2"> </v-stepper-content> -->

                            <v-stepper-step
                                :complete="onboardingStepper > 2"
                                step="2"
                            >
                                Interests 🕵🏽‍♂️
                            </v-stepper-step>

                            <v-stepper-content step="2"> </v-stepper-content>

                            <v-stepper-step step="3">
                                Lets go 🚀
                            </v-stepper-step>
                            <v-stepper-content step="3"> </v-stepper-content>
                        </v-stepper>
                    </div>
                </v-col>
            </v-row>
        </template>
        <v-row justify="center" align="center">
            <v-col cols="12">
                <transition name="fade">
                    <v-row v-if="onboardingStepper === 1">
                        <v-col cols="12">
                            <div class="text-left mb-2">
                                <div
                                    class="text-lg-h4 text-h5 font-weight-bold"
                                >
                                    Basic Information 👨🏽‍💻
                                </div>
                                <div class="text-body mt-2 mb-5 grey--text">
                                    Welcome to Abode, Let's get you registered
                                </div>
                            </div>
                        </v-col>
                        <v-col cols="12" sm="12" md="6">
                            <v-text-field
                                shaped
                                label="First Name*"
                                v-model="form.firstName"
                                hide-details
                                filled
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12" md="6">
                            <v-text-field
                                shaped
                                label="Last Name*"
                                v-model="form.lastName"
                                hide-details
                                filled
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12" md="6">
                            <v-text-field
                                shaped
                                label="Email*"
                                v-model="form.email"
                                hide-details
                                filled
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12" md="6">
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
                                label="Who referred you?"
                                v-model="form.referrer"
                                hint="Enter referrer's username"
                                filled
                            ></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="12" md="12">
                            <v-text-field
                                shaped
                                label="Choose a username*"
                                v-model="form.username"
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
                        <v-col cols="12" sm="12" md="12">
                            <div class="d-flex justify-end mt-8">
                                <v-btn
                                    depressed
                                    color="primary"
                                    class="py-6 px-10"
                                    :loading="isResolving"
                                    :hint="`${
                                        resolvedReferrer
                                            ? 'You were referred by ' +
                                              resolvedReferrer
                                            : ''
                                    }`"
                                    :disabled="step1Disabled"
                                    persistent-hint
                                    @click="signup"
                                    >Next</v-btn
                                >
                            </div>
                        </v-col>
                    </v-row>
                </transition>
                <transition name="fade">
                    <v-row v-if="onboardingStepper === 8">
                        <v-col cols="12">
                            <div class="text-left mb-2">
                                <div
                                    class="text-lg-h4 text-h5 font-weight-bold"
                                >
                                    Access Information 🔐
                                </div>
                                <div class="text-body mt-2 mb-5 grey--text">
                                    Choose a username and set your password
                                </div>
                            </div>
                        </v-col>

                        <v-col cols="12" sm="12" md="12">
                            <div
                                class="
                                    d-flex
                                    justify-space-between
                                    align-center
                                    mt-8
                                "
                            >
                                <v-btn
                                    depressed
                                    color="primary"
                                    class="py-6 px-10"
                                    @click="onboardingStepper = 1"
                                    >Back</v-btn
                                >
                                <v-btn
                                    depressed
                                    color="primary"
                                    class="py-6 px-10"
                                    @click="onboardingStepper = 3"
                                    >Next</v-btn
                                >
                            </div>
                        </v-col>
                    </v-row>
                </transition>
                <transition name="fade">
                    <v-row v-if="onboardingStepper === 2">
                        <v-col cols="12">
                            <div class="text-left mb-2">
                                <div
                                    class="text-lg-h4 text-h5 font-weight-bold"
                                >
                                    What are your interests? 🕵🏽‍♂️
                                </div>
                                <div class="text-body mt-2 mb-5 grey--text">
                                    We would like to know how we can help you
                                    maximise wealth on our platform
                                </div>
                            </div>
                        </v-col>
                        <v-col cols="12" sm="12" md="12">
                            <v-select
                                shaped
                                v-model="form.interests"
                                :items="interests"
                                filled
                                chips
                                :menu-props="{ bottom: true, offsetY: true }"
                                label="What kind of opportunities excite you?"
                                multiple
                            ></v-select>
                        </v-col>
                        <v-col cols="12" sm="12" md="12">
                            <v-select
                                shaped
                                v-model="form.expectations"
                                :items="expectations"
                                :menu-props="{ bottom: true, offsetY: true }"
                                filled
                                chips
                                label="What interest volumns do you hope to achieve?"
                            ></v-select>
                        </v-col>

                        <v-col cols="12" sm="12" md="12">
                            <div
                                class="
                                    d-flex
                                    justify-space-between
                                    align-center
                                    mt-8
                                "
                            >
                                <!-- <v-btn
                                    depressed
                                    color="primary"
                                    class="py-6 px-10"
                                    @click="onboardingStepper = 2"
                                    >Back</v-btn
                                > -->
                                <v-btn
                                    depressed
                                    color="primary"
                                    class="py-6 px-10"
                                    :loading="isResolving"
                                    @click="collectInterests"
                                    >Next</v-btn
                                >
                            </div>
                        </v-col>
                    </v-row>
                </transition>
                <transition name="fade">
                    <v-row v-if="onboardingStepper === 3">
                        <v-col cols="12">
                            <div class="text-left mb-2">
                                <div
                                    class="text-lg-h4 text-h5 font-weight-bold"
                                >
                                    Give us a minute... ⚙️
                                </div>
                                <div class="text-body mt-2 mb-5 grey--text">
                                    We're getting everything all crisp and clean
                                    for you
                                </div>
                            </div>
                        </v-col>
                        <v-col cols="12" sm="12" md="12">
                            <v-progress-linear
                                indeterminate
                                color="primary darken-2"
                            ></v-progress-linear>
                        </v-col>

                        <v-col cols="12" sm="12" md="12">
                            <div class="d-flex justify-end align-center mt-8">
                                <v-btn
                                    depressed
                                    color="primary"
                                    class="py-6 px-10"
                                    @click="goToLogin"
                                    >Login</v-btn
                                >
                            </div>
                        </v-col>
                    </v-row>
                </transition>
                <transition name="fade">
                    <v-row v-if="onboardingStepper !== 3">
                        <v-col cols="12" sm="12" md="12">
                            <div
                                class="
                                    d-flex
                                    justify-center
                                    text-subtitle-1
                                    mt-8
                                "
                            >
                                <div class="mr-1">Already have an account?</div>
                                <div
                                    class="pointer primary--text"
                                    @click="goToLogin"
                                >
                                    Login
                                </div>
                            </div>
                        </v-col>
                    </v-row>
                </transition>
            </v-col>
        </v-row>
    </auth>
</template>

<script lang="ts">
import Vue from "vue";
import Auth from "../layouts/Auth.vue";
import { LOGIN, SIGNUP } from "../router/endpoints";

export default Vue.extend({
    components: { Auth },
    data(): {
        onboardingStepper: number;
        isResolving: boolean;
        resolvedReferrer: string;
        form: {
            firstName: string;
            middleName?: string;
            lastName: string;
            username: string;
            email: string;
            phoneNumber: string;
            password: string;
            confirmPassword: string;
            referrer?: string;
            interests: string[];
            expectations: string;
            rememberMe: boolean;
        };
        showPassword: boolean;
        showConfirmPassword: boolean;
        interests: string[];
        expectations: string[];
    } {
        return {
            onboardingStepper: 1,
            isResolving: false,
            resolvedReferrer: "",
            form: {
                firstName: "",
                middleName: "",
                lastName: "",
                username: "",
                email: "",
                phoneNumber: "",
                password: "",
                confirmPassword: "",
                referrer: "",
                interests: [],
                expectations: "",
                rememberMe: false,
            },
            showPassword: false,
            showConfirmPassword: false,
            interests: ["agriculture", "bitcoin", "real estate"],
            expectations: [
                "less than ₦1,000,000",
                "₦1,000,000 - ₦10,000,000",
                "₦10,000,000 - ₦100,000,000",
                "greater than ₦100,000,000",
            ],
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
        step1Disabled(): boolean {
            return (
                !this.form.firstName ||
                !this.form.lastName ||
                !this.form.email ||
                !this.form.phoneNumber ||
                !this.form.username ||
                !this.form.password
            );
        },
    },

    methods: {
        async resolveReferrer() {
            try {
                if (this.form.referrer) {
                    this.resolvedReferrer = "";
                    this.isResolving = true;
                    const res = await this.$store.dispatch(
                        "auth/resolveReferrer",
                        this.form,
                    );
                    if (res.status) {
                        this.resolvedReferrer = res.data;
                        this.onboardingStepper++;
                    }
                    this.$store.commit("openSnackbar", res.message, {
                        root: true,
                    });
                } else {
                    this.onboardingStepper++;
                }
            } finally {
                this.isResolving = false;
            }
        },
        async checkUsername() {
            try {
                this.isResolving = true;
                const res = await this.$store.dispatch(
                    "auth/checkUsername",
                    this.form,
                );
                if (res.status) {
                    this.onboardingStepper++;
                } else {
                    this.$store.commit("openSnackbar", res.message, {
                        root: true,
                    });
                }
            } finally {
                this.isResolving = false;
            }
        },
        async checkEmail() {
            try {
                this.isResolving = true;
                const res = await this.$store.dispatch(
                    "auth/checkEmail",
                    this.form,
                );
                if (res.status) {
                    this.onboardingStepper++;
                } else {
                    this.$store.commit("openSnackbar", res.message, {
                        root: true,
                    });
                }
            } finally {
                this.isResolving = false;
            }
        },
        async signup() {
            try {
                this.isResolving = true;
                const res = await this.$store.dispatch(
                    "auth/signup",
                    this.form,
                );
                if (res.status) {
                    this.onboardingStepper++;
                } else {
                    this.$store.commit("openSnackbar", res.message, {
                        root: true,
                    });
                }
            } finally {
                this.isResolving = false;
            }
        },
        async collectInterests() {
            try {
                this.isResolving = true;
                this.onboardingStepper++;
                const res = await this.$store.dispatch(
                    "auth/collectInterests",
                    this.form,
                );
                if (res.status) {
                } else {
                    this.$store.commit("openSnackbar", res.message, {
                        root: true,
                    });
                }
            } finally {
                this.isResolving = false;
                this.goToLogin();
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
