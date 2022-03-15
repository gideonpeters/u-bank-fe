import { resolveRequestError } from "@/utils/auth";
import axios from "axios";
import { http } from "./../http/index";

export default class AuthService {
    static async signup({
        name,
        email,
        phoneNumber,
        password,
    }: {
        name: string;
        email: string;
        phoneNumber: string;
        password: string;
    }) {
        try {
            const res = await http.post("/auth/register", {
                name,
                email,
                phone: phoneNumber,
                password,
            });

            return res.data;
        } catch (error) {
            resolveRequestError(error);
        }
    }

    static async login({
        email,
        password,
    }: {
        email: string;
        password: string;
    }) {
        try {
            const res = await http.post("/auth/login", {
                email,
                password,
            });

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

    static async generateKey() {
        try {
            const res = await http.post(`2fa/generateSecret`);

            return res.data;
        } catch (error) {
            resolveRequestError(error);
        }
    }

    static async getQR() {
        try {
            const res = await http.get(`2fa`);

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

    static async verifyEmail2Fa(form: { otp: string | number }) {
        try {
            const res = await http.post(`auth/2fa-otp`, form);

            return res.data;
        } catch (error) {
            resolveRequestError(error);
        }
    }

    static async verifySecret2Fa(form: { otp: string | number }) {
        try {
            const res = await http.post(`2fa/verify2fa`, form);

            return res.data;
        } catch (error) {
            resolveRequestError(error);
        }
    }

    static async enableSecret2Fa(form: { otp: string | number }) {
        try {
            const res = await http.post(`2fa/enable2fa`, form);

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

    static async resend2FaEmailOtp() {
        try {
            const res = await http.post("auth/send-verify-otp");

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
