import axiosInstance from "./axiosConfig";

const productService = {
    getAllProducts: async () => {
        try {
            console.log('llamando a la service de products')
            const response = await axiosInstance.get('/products');
            console.log('respuesta del service de products', response)
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    getProductById: async (id) => {
        try {
            const response = await axiosInstance.get(`/products/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    createProduct: async (productData) => {
        try {
            const response = await axiosInstance.post(`/products`, productData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    updateProduct: async (id, updatedData) => {
        try {
            const response = await axiosInstance.put(`/products/${id}`, updatedData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    deleteProduct: async (id) => {
        try {
            const response = await axiosInstance.delete(`/products/${id}`);
            return response.data
        } catch (error) {
            throw error.response?.data || error;
        }
    }
};

export default productService;