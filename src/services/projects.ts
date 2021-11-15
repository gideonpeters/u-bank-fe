import { resolveRequestError } from "@/utils/auth";
import { http } from "./../http/index";

export default class ProjectService {
    static async fetchProjects() {
        try {
            const res = await http.get("/projects");

            return res.data;
        } catch (error) {
            resolveRequestError(error);
        }
    }

    static async fetchFundedProjects() {
        try {
            const res = await http.get("/funds");

            return res.data;
        } catch (error) {
            resolveRequestError(error);
        }
    }

    static async fetchProjectById(id: string | number) {
        try {
            const res = await http.get(`/projects/${id}`);

            return res.data;
        } catch (error) {
            resolveRequestError(error);
        }
    }

    static async fetchBids(id: string | number) {
        try {
            const res = await http.get(`/offers/${id}/bids`);

            return res.data;
        } catch (error) {
            resolveRequestError(error);
        }
    }

    static async fetchAllOffers() {
        try {
            const res = await http.get(`/offers`);

            return res.data;
        } catch (error) {
            resolveRequestError(error);
        }
    }

    static async fetchSubscriptionById(id: string | number) {
        try {
            const res = await http.get(`/funds/${id}`);

            return res.data;
        } catch (error) {
            resolveRequestError(error);
        }
    }

    static async fetchOfferById(id: string | number) {
        try {
            const res = await http.get(`/offers/${id}`);

            return res.data;
        } catch (error) {
            resolveRequestError(error);
        }
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
        try {
            const res = await http.post(`projects/${projectId}/fund`, {
                project_id: projectId,
                amount,
                reference,
                type,
                units,
                paying_bank_code: bankCode,
            });

            return res.data;
        } catch (error) {
            resolveRequestError(error);
        }
    }

    static async createOffer({
        subscriptionId,
        unitPrice,
        units,
    }: {
        subscriptionId: string | number;
        unitPrice: string | number;
        units: number;
    }) {
        try {
            const res = await http.post(`funds/${subscriptionId}/sell`, {
                fund_id: subscriptionId,
                unit_price: unitPrice,
                units,
            });

            return res.data;
        } catch (error) {
            resolveRequestError(error);
        }
    }

    static async createBid({
        offerId,
        amount,
        units,
    }: {
        offerId: string | number;
        amount: string | number;
        units: number;
    }) {
        try {
            const res = await http.post(`offers/${offerId}/bid`, {
                offer_id: offerId,
                amount,
                units,
            });

            return res.data;
        } catch (error) {
            resolveRequestError(error);
        }
    }
}
