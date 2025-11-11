import axiosInstance from "./axiosConfig";

const orderService = {
    createOrder: async (orderData) => {
        try {
            const response = await axiosInstance.post('/orders', orderData);
            console.log(response, 'log del createorder, orderservice')
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },
    getAllOrders: async () => {
        try {
            const response = await axiosInstance.get('/orders');
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },
    getOrderById: async (id) => {
        try {
            const response = await axiosInstance.get(`/orders/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },
    updateOrder: async (id, updateData) => {
        try {
            const response = await axiosInstance.put(`/orders/${id}`, updateData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },
    deleteOrder: async (id) => {
        try {
            const response = await axiosInstance.delete(`/orders/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },
};

export default orderService;