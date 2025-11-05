import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import paymentService from '../../api/paymentService';

export const initMercadoPagoPayment = createAsyncThunk(
    'payments/mercadopago',
    async (paymentData, { rejectWithValue }) => {
        try {
            return await paymentService.createMercadoPagoPayment(paymentData);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const initStripePayment = createAsyncThunk(
    'payments/stripe',
    async (paymentData, { rejectWithValue }) => {
        try {
            return await paymentService.createStripePaymentIntent(paymentData);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    mercadoPagoData: null,
    stripeData: null,
    loading: false,
    error: null,
};

const paymentSlice = createSlice({
    name: 'payments',
    initialState,
    reducers: {
        clearPaymentData: (state) => {
            state.mercadoPagoData = null;
            state.stripeData = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(initMercadoPagoPayment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(initMercadoPagoPayment.fulfilled, (state, action) => {
                state.loading = false;
                state.mercadoPagoData = action.payload;
            })
            .addCase(initMercadoPagoPayment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(initStripePayment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(initStripePayment.fulfilled, (state, action) => {
                state.loading = false;
                state.stripeData = action.payload;
            })
            .addCase(initStripePayment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearPaymentData } = paymentSlice.actions;
export default paymentSlice.reducer;