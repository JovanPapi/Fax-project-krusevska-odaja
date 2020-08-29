import axios from "../custom-build-axios/axios";

export const TransactionService = {
    transaction: (paymentData) => {
        return axios.post("/api/transaction/charge", paymentData);
    },

};