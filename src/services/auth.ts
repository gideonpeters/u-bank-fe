import { http } from "./../http/index";

export default class AuthService {
    static async login({
        loginId,
        password,
    }: {
        loginId: string;
        password: string;
    }) {
        const res = await http.post("/auth/login", {
            login_id: loginId,
            password,
        });

        return res.data;
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
