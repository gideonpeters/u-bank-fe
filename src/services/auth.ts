import { resolveRequestError } from "@/utils/auth";
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

    static async fetchActivityLogs() {
        const res = await http.get(`activity-logs`);

        return res.data;
    }

    static async fetchProfile() {
        const res = await http.post(`/auth/me`);

        return res.data;
    }

    static async fetchReferrals() {
        const res = await http.get(`referrals`);

        return res.data;
    }

    static async checkUsername({ username }: { username: string }) {
        const res = await http.get(`username/${username}`);

        return res.data;
    }

    static async resolveReferrer({ referrer }: { referrer: string }) {
        const res = await http.post(`referrer/resolve`, {
            referrer,
        });

        return res.data;
    }

    static authenticateUser(token: string) {
        http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        localStorage.setItem("token", token);
    }
}
