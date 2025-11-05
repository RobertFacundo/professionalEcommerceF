import { configureStore } from "@reduxjs/toolkit";
import productReducer from './slices/productSlice';
import cartReducer from './slices/cartSlice';
import orderReducer from './slices/orderSlice';
import paymentReducer from './slices/paymentSlice';

export const store = configureStore({
    reducer: {
        products: productReducer,
        cart: cartReducer,
        orders: orderReducer,
        payments: paymentReducer
    },
});

export default store;