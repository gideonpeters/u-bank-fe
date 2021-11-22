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

    static async fetchUserBids() {
        try {
            const res = await http.get(`/bids/all`);

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
        proof,
    }: {
        projectId: string | number;
        amount: string | number;
        reference: string;
        type: "online_transfer" | "bank_transfer" | "wallet";
        units: number;
        bankCode: string | number;
        proof: any;
    }) {
        try {
            const formData = new FormData();
            formData.append("project_id", projectId.toString());
            formData.append("amount", amount.toString());
            formData.append("reference", reference);
            formData.append("type", type);
            formData.append("units", units.toString());
            formData.append("paying_bank_code", bankCode.toString());
            formData.append("payment_proof", proof);

            const res = await http.post(`projects/${projectId}/fund`, formData);

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
        unitPrice,
        units,
    }: {
        offerId: string | number;
        unitPrice: string | number;
        units: number;
    }) {
        try {
            const res = await http.post(`offers/${offerId}/bid`, {
                offer_id: offerId,
                unit_price: unitPrice,
                units,
            });

            return res.data;
        } catch (error) {
            resolveRequestError(error);
        }
    }

    static async sellAsGroup({
        action,
        id,
    }: {
        action: boolean;
        id: string | number;
    }) {
        try {
            const res = await http.post(`/funds/${id}/sell-as-group`, {
                action,
            });

            return res.data;
        } catch (error) {
            resolveRequestError(error);
        }
    }

    static async acceptBid({ id }: { id: string | number }) {
        try {
            const res = await http.post(`/bids/${id}/accept-or-reject`, {
                action: true,
            });

            return res.data;
        } catch (error) {
            resolveRequestError(error);
        }
    }

    static async rejectBid({ id }: { id: string | number }) {
        try {
            const res = await http.post(`/bids/${id}/accept-or-reject`, {
                action: false,
            });

            return res.data;
        } catch (error) {
            resolveRequestError(error);
        }
    }

    static async payBid({
        bidId,
        reference,
        type,
        bankCode,
        proof,
    }: {
        bidId: string | number;
        reference: string;
        type: "online_transfer" | "bank_transfer" | "wallet";
        units: number;
        bankCode: string | number;
        proof: any;
    }) {
        try {
            const formData = new FormData();
            formData.append("bid_id", bidId.toString());
            formData.append("amount", "2500");
            formData.append("reference", reference);
            formData.append("type", type);
            formData.append("paying_bank_code", bankCode.toString());
            formData.append("payment_proof", proof);

            const res = await http.post(`bids/${bidId}/pay`, formData);

            return res.data;
        } catch (error) {
            resolveRequestError(error);
        }
    }
}
