import { http } from "./../http/index";

export default class ProjectService {
    static async fetchProjects() {
        const res = await http.get("/projects");

        return res.data;
    }

    static async fetchFundedProjects() {
        const res = await http.get("/funds");

        return res.data;
    }

    static async fetchProjectById(id: string | number) {
        const res = await http.get(`/projects/${id}`);

        return res.data;
    }

    static async fetchSubscriptionById(id: string | number) {
        const res = await http.get(`/funds/${id}`);

        return res.data;
    }

    static async fundProject({
        projectId,
        amount,
        reference,
        type,
        units,
        bankCode,
    }: {
        projectId: string | number;
        amount: string | number;
        reference: string;
        type: "online_transfer" | "bank_transfer" | "wallet";
        units: number;
        bankCode: string | number;
    }) {
        const res = await http.post(`projects/${projectId}/fund`, {
            project_id: projectId,
            amount,
            reference,
            type,
            units,
            paying_bank_code: bankCode,
        });

        return res.data;
    }
}