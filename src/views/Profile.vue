<template>
    <v-row class="mt-5">
        <v-col cols="12" md="3">
            <div class="d-flex w-100 flex-column align-center justify-center">
                <v-avatar size="120" color="tertiary-light">
                    <img v-if="form.profileImage" :src="form.profileImage" />
                </v-avatar>
                <div class="mt-5 mb-1 text-h6">
                    {{ form.firstName }} {{ form.lastName }}
                </div>
                <div class="mb-5 grey--text">{{ form.email }}</div>
            </div>
            <div class="d-flex justify-center mt-5">
                <v-btn
                    color="primary"
                    depressed
                    class="rounded-pill px-10 text-none z-4 my-2"
                >
                    Change Password
                </v-btn>
            </div>
            <div class="d-flex justify-center">
                <v-btn
                    color="secondary"
                    depressed
                    class="rounded-pill black--text px-10 text-none z-4 my-2"
                >
                    Edit Profile
                </v-btn>
            </div>
        </v-col>
        <v-col cols="12" md="9">
            <v-row>
                <v-col cols="12">
                    <div class="text-h6">Personal Information</div>
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
                        label="Middle Name"
                        v-model="form.middleName"
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
                        label="Username"
                        v-model="form.username"
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
                <v-col cols="12" sm="12" md="6">
                    <v-text-field
                        shaped
                        label="Referrer's Username"
                        v-model="form.referrer"
                        hide-details
                        filled
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="6">
                    <v-menu
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="form.dob"
                                label="Date of Birth"
                                prepend-inner-icon="mdi-calendar"
                                readonly
                                filled
                                shaped
                                v-bind="attrs"
                                v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker
                            v-model="form.dob"
                            :active-picker.sync="activePicker"
                            :max="
                                new Date(
                                    Date.now() -
                                        new Date().getTimezoneOffset() * 60000,
                                )
                                    .toISOString()
                                    .substr(0, 10)
                            "
                            min="1950-01-01"
                            @change="save"
                        ></v-date-picker>
                    </v-menu>
                </v-col>
            </v-row>
            <v-row class="mt-10">
                <v-col cols="12">
                    <div class="text-h6">Next of kin Information</div>
                </v-col>
                <v-col cols="12" sm="12" md="6">
                    <v-text-field
                        shaped
                        label="Full Name*"
                        v-model="form.nextOfKinName"
                        hide-details
                        filled
                    ></v-text-field>
                </v-col>

                <v-col cols="12" sm="12" md="6">
                    <v-text-field
                        shaped
                        label="Email*"
                        v-model="form.nextOfKinEmail"
                        hide-details
                        filled
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="6">
                    <v-text-field
                        shaped
                        label="Phone Number*"
                        v-model="form.nextOfKinPhoneNumber"
                        hide-details
                        filled
                    ></v-text-field>
                </v-col>

                <v-col cols="12" sm="12" md="6">
                    <v-text-field
                        shaped
                        label="Relationship"
                        v-model="form.nextOfKinRelationship"
                        hide-details
                        filled
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                    <v-textarea
                        shaped
                        rows="3"
                        label="Address"
                        v-model="form.nextOfKinAddress"
                        hide-details
                        filled
                    ></v-textarea>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    data() {
        return {
            isLoading: false,
            activePicker: null,
            date: null,
            menu: false,
            profile: {
                client: {},
            },
            form: {
                firstName: "",
                middleName: "",
                username: "",
                lastName: "",
                dob: null,
                email: "",
                profileImage: "",
                phoneNumber: "",
                password: "",
                confirmPassword: "",
                referrer: "",
                nextOfKinName: "",
                nextOfKinEmail: "",
                nextOfKinAddress: "",
                nextOfKinRelationship: "",
                nextOfKinPhoneNumber: "",
            },
        };
    },
    methods: {
        async fetchProfile() {
            try {
                this.isLoading = true;
                const res = await this.$store.dispatch("auth/fetchProfile");

                this.profile = res.data;
                this.matchForm(this.profile);
            } finally {
                this.isLoading = false;
            }
        },
        matchForm(profile: any) {
            this.form.firstName = profile.client.first_name;
            this.form.middleName = profile.client.middle_name;
            this.form.username = profile.username;
            this.form.lastName = profile.client.last_name;
            this.form.email = profile.email;
            this.form.phoneNumber = profile.client.phone_number;
            this.form.referrer = profile.client.referrer.username;
        },
        save(date: any) {
            this.$refs.menu.save(date);
        },
    },
    mounted() {
        this.fetchProfile();
    },
    watch: {
        menu(val) {
            val && setTimeout(() => (this.activePicker = "YEAR"));
        },
    },
});
</script>