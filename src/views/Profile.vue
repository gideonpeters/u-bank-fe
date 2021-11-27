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
            <div class="d-flex justify-center mt-5" v-if="false">
                <v-btn
                    color="primary"
                    depressed
                    class="rounded-pill px-10 text-none z-4 my-2"
                >
                    Change Password
                </v-btn>
            </div>
            <div class="d-flex justify-center" v-if="!isEdit">
                <v-btn
                    @click="isEdit = true"
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
                        :readonly="!isEdit"
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
                        :readonly="!isEdit"
                        label="Middle Name"
                        v-model="form.middleName"
                        hide-details
                        filled
                    ></v-text-field>
                </v-col>

                <v-col cols="12" sm="12" md="6">
                    <v-text-field
                        shaped
                        :readonly="!isEdit"
                        label="Last Name*"
                        v-model="form.lastName"
                        hide-details
                        filled
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="6">
                    <v-text-field
                        shaped
                        :readonly="!isEdit"
                        label="Username"
                        v-model="form.username"
                        hide-details
                        filled
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="6">
                    <v-text-field
                        shaped
                        readonly
                        label="Email*"
                        v-model="form.email"
                        hide-details
                        filled
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="6">
                    <v-text-field
                        shaped
                        :readonly="!isEdit"
                        label="Phone Number*"
                        v-model="form.phoneNumber"
                        hide-details
                        filled
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="6">
                    <v-text-field
                        shaped
                        readonly
                        label="Referrer's Username"
                        v-model="form.referrer"
                        hide-details
                        filled
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="6">
                    <v-select
                        :items="['Male', 'Female']"
                        filled
                        shaped
                        label="Gender"
                    ></v-select>
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
                            :disabled="!isEdit"
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
                        :readonly="!isEdit"
                        v-model="form.nextOfKinName"
                        hide-details
                        filled
                    ></v-text-field>
                </v-col>

                <v-col cols="12" sm="12" md="6">
                    <v-text-field
                        shaped
                        label="Email*"
                        :readonly="!isEdit"
                        v-model="form.nextOfKinEmail"
                        hide-details
                        filled
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="6">
                    <v-text-field
                        shaped
                        label="Phone Number*"
                        :readonly="!isEdit"
                        v-model="form.nextOfKinPhoneNumber"
                        hide-details
                        filled
                    ></v-text-field>
                </v-col>

                <v-col cols="12" sm="12" md="6">
                    <v-text-field
                        shaped
                        label="Relationship"
                        :readonly="!isEdit"
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
                        :readonly="!isEdit"
                        v-model="form.nextOfKinAddress"
                        hide-details
                        filled
                    ></v-textarea>
                </v-col>
                <v-col cols="12" v-if="isEdit">
                    <div class="d-flex justify-center">
                        <v-btn
                            depressed
                            @click="editProfile"
                            :loading="isLoading"
                            color="info rounded-pill text-none"
                            >Save Changes</v-btn
                        >
                    </div>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    data(): {
        isLoading: boolean;
        isEdit: boolean;
        activePicker: any;
        date: any;
        menu: boolean;
        profile: {
            client: any;
        };
        form: {
            firstName: string;
            middleName: string | null;
            username: string;
            lastName: string;
            dob: string | null;
            gender: string | null;
            email: string;
            profileImage: string | null;
            phoneNumber: string;
            password: string;
            confirmPassword: string;
            referrer: string;
            nextOfKinName: string;
            nextOfKinEmail: string;
            nextOfKinPhoneNumber: string;
            nextOfKinAddress: string;
            nextOfKinRelationship: string;
        };
    } {
        return {
            isLoading: false,
            isEdit: false,
            activePicker: "",
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
                gender: null,
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
        async editProfile() {
            try {
                this.isLoading = true;
                let formData = new FormData();
                formData.append("first_name", this.form.firstName);
                formData.append("middle_name", this.form.middleName as string);
                formData.append("username", this.form.username);
                formData.append("last_name", this.form.lastName);
                formData.append("dob", this.form.dob as string);
                formData.append("gender", this.form.gender as string);
                formData.append("phone_number", this.form.phoneNumber);
                formData.append("next_of_kin_name", this.form.nextOfKinName);
                formData.append("next_of_kin_email", this.form.nextOfKinEmail);
                formData.append(
                    "next_of_kin_phone_number",
                    this.form.nextOfKinPhoneNumber,
                );
                formData.append(
                    "next_of_kin_address",
                    this.form.nextOfKinAddress,
                );
                formData.append(
                    "next_of_kin_relationship",
                    this.form.nextOfKinRelationship,
                );
                await this.$store
                    .dispatch("auth/editProfile", formData)
                    .then(() => {
                        this.fetchProfile();
                    });
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
            (this.$refs.menu as Vue & { save: (date: any) => void }).save(date);
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