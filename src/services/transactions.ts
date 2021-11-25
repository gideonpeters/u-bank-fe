import { resolveRequestError } from "@/utils/auth";
import { http } from "./../http/index";

export default class TransactionService {
    static async fetchTransactions() {
        try {
            const res = await http.get("/transactions");
            return res.data;
        } catch (error) {
            resolveRequestError(error);
        }
    }

    static async fetchWallet() {
        try {
            const res = await http.get("/wallets");
            return res.data;
        } catch (error) {
            resolveRequestError(error);
        }
    }

    static async fetchBankAccounts() {
        try {
            const res = await http.get("/bank-accounts");
            return res.data;
        } catch (error) {
            resolveRequestError(error);
        }
    }

    static async requestOtp(purpose: string) {
        try {
            const res = await http.post("/otp", {
                purpose,
            });
            return res.data;
        } catch (error) {
            resolveRequestError(error);
        }
    }

    static async addBank({
        accountNumber,
        accountName,
        bankCode,
        otp,
    }: {
        accountNumber: string;
        accountName: string;
        bankCode: string;
        otp: string;
    }) {
        try {
            const res = await http.post("/bank-accounts", {
                account_name: accountName,
                account_number: accountNumber,
                bank_code: bankCode,
                otp,
            });
            return res.data;
        } catch (error) {
            resolveRequestError(error);
        }
    }

    static async resolveBankAccount({
        accountNumber,
        bankCode,
    }: {
        accountNumber: string;
        bankCode: string;
    }) {
        try {
            const res = await http.post("/bank-accounts/resolve", {
                account_number: accountNumber,
                bank_code: bankCode,
            });
            return res.data;
        } catch (error) {
            resolveRequestError(error);
        }
    }

    static async topup({
        amount,
        reference,
        type,
        bankCode,
        proof,
    }: {
        amount: string;
        bankCode: string;
        type: "online_transfer" | "bank_transfer";
        reference: string;
        proof: any;
    }) {
        const formData = new FormData();
        formData.append("amount", amount);
        formData.append("reference", reference);
        formData.append("type", type);
        formData.append("paying_bank_code", bankCode);
        formData.append("payment_proof", proof);
        try {
            const res = await http.post("/wallets/topup", formData);

            return res.data;
        } catch (error) {
            resolveRequestError(error);
        }
    }

    static async withdraw({
        amount,
        bankId,
        otp,
    }: {
        amount: string | number;
        bankId: string | number;
        otp: string;
    }) {
        try {
            const res = await http.post("/wallets/withdraw", {
                amount,
                bank_account_id: bankId,
                otp,
            });
            return res.data;
        } catch (error) {
            resolveRequestError(error);
        }
    }
}
