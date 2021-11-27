import { resolveRequestError } from "@/utils/auth";
import axios from "axios";
import { http } from "./../http/index";

export default class AuthService {
    static async signup({
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
        username,
        referrer,
    }: {
        firstName: string;
        lastName: string;
        email: string;
        phoneNumber: string;
        password: string;
        username: string;
        referrer: string;
    }) {
        try {
            const res = await http.post("/auth/register", {
                first_name: firstName,
                last_name: lastName,
                email,
                phone_number: phoneNumber,
                password,
                username,
                referrer,
            });

            return res.data;
        } catch (error: any) {
            resolveRequestError(error);
        }
    }

    static async login({
        loginId,
        password,
    }: {
        loginId: string;
        password: string;
    }) {
        try {
            const res = await http.post("/auth/login", {
                login_id: loginId,
                password,
            });

            return res.data;
        } catch (error) {
            resolveRequestError(error);
        }
    }

    static async collectInterests({
        email,
        expectations,
        interests,
    }: {
        email: string;
        expectations: string;
        interests: string[];
    }) {
        try {
            const res = await http.post("clients/collect-interests", {
                email,
                type_interests: interests.toString(),
                volume_interests: expectations,
            });

            return res.data;
        } catch (error) {
            resolveRequestError(error);
        }
    }

    static async fetchActivityLogs() {
        try {
            const res = await http.get(`activity-logs`);

            return res.data;
        } catch (error) {
            resolveRequestError(error);
        }
    }

    static async fetchProfile() {
        try {
            const res = await http.post(`/auth/me`);

            return res.data;
        } catch (error) {
            resolveRequestError(error);
        }
    }

    static async editProfile(payload: any) {
        try {
            const res = await http.post(`/auth/me/update`, payload);

            return res.data;
        } catch (error) {
            resolveRequestError(error);
        }
    }

    static async fetchReferrals() {
        try {
            const res = await http.get(`referrals`);

            return res.data;
        } catch (error) {
            resolveRequestError(error);
        }
    }

    static async checkUsername({ username }: { username: string }) {
        try {
            const res = await http.get(`username/${username}`);

            return res.data;
        } catch (error) {
            resolveRequestError(error);
        }
    }

    static async resolveReferrer({ referrer }: { referrer: string }) {
        try {
            const res = await http.post(`referrer/resolve`, {
                referrer,
            });

            return res.data;
        } catch (error) {
            resolveRequestError(error);
        }
    }

    static async forgotPassword(email: string) {
        try {
            const res = await http.post(`auth/forgot-password`, { email });

            return res.data;
        } catch (error) {
            resolveRequestError(error);
        }
    }

    static async resetPassword(form: {
        otp: string | number;
        email: string;
        password: string;
    }) {
        try {
            const res = await http.post(`auth/reset-password`, form);

            return res.data;
        } catch (error) {
            resolveRequestError(error);
        }
    }

    static async verifyEmail(form: { otp: string | number; email: string }) {
        try {
            const res = await http.post(`auth/email/verify`, form);

            return res.data;
        } catch (error) {
            resolveRequestError(error);
        }
    }

    static async resendEmailVerification(email: string) {
        try {
            const res = await http.post("auth/verify-email", { email });

            return res.data;
        } catch (error) {
            resolveRequestError(error);
        }
    }

    static authenticateUser(token: string) {
        http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        localStorage.setItem("token", token);
    }
}
