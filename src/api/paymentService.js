import axiosInstance from "./axiosConfig";

const paymentService = {
    createMercadoPagoPayment: async (paymentData) => {
        try {
            const response = await axiosInstance.post('/payments/mercadopago', paymentData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error
        }
    },

    createStripePaymentIntent: async (paymentData) => {
        try {
            const response = await axiosInstance.post('/payments/stripe/create-payment-intent', paymentData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    }
};

export default paymentService;