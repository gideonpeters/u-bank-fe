import { http } from "./../http/index";

export default class TransactionService {
    static async fetchTransactions() {
        const res = await http.get("/transactions");
        return res.data;
    }

    static async fetchWallet() {
        const res = await http.get("/wallets");
        return res.data;
    }

    static async fetchBankAccounts() {
        const res = await http.get("/bank-accounts");
        return res.data;
    }

    static async requestOtp(purpose: string) {
        const res = await http.post("/otp", {
            purpose,
        });
        return res.data;
    }

    static async addBank({
        accountName,
        accountNumber,
        bankCode,
        otp,
    }: {
        accountName: string;
        accountNumber: string;
        bankCode: string;
        otp: string;
    }) {
        const res = await http.post("/bank-accounts", {
            account_name: accountName,
            account_number: accountNumber,
            bank_code: bankCode,
            otp,
        });
        return res.data;
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

        const res = await http.post("/wallets/topup", formData);

        return res.data;
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
        const res = await http.post("/wallets/withdraw", {
            amount,
            bank_account_id: bankId,
            otp,
        });
        return res.data;
    }
}
