import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import orderService from '../../api/orderService';

export const fetchOrders = createAsyncThunk(
    "orders/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            return await orderService.getAllOrders();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchOrderById = createAsyncThunk(
    'orders/fetchById',
    async (id, { rejectWithValue }) => {
        try {
            return await orderService.getOrderById(id);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const createOrder = createAsyncThunk(
    'orders/create',
    async (orderData, { rejectWithValue }) => {
        try {
            return await orderService.createOrder(orderData);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateOrder = createAsyncThunk(
    'orders/update',
    async ({ id, updateData }, { rejectWithValue }) => {
        try {
            return await orderService.updateOrder(id, updateData);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteOrder = createAsyncThunk(
    'orders/delete',
    async (id, { rejectWithValue }) => {
        try {
            await orderService.deleteOrder(id);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    items: [],
    selectedOrder: null,
    loading: false,
    error: null,
};

const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        clearSelectedOrder: (state) => {
            state.selectedOrder = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(fetchOrderById.fulfilled, (state, action) => {
                state.selectedOrder = action.payload;
            })

            .addCase(createOrder.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })

            .addCase(updateOrder.fulfilled, (state, action) => {
                const index = state.items.findIndex((o) => o._id === action.payload._id);
                if (index !== -1) state.items[index] = action.payload;
            })

            .addCase(deleteOrder.fulfilled, (state, action) => {
                state.items = state.items.filter((o) => o._id !== action.payload);
            });
    },
});

export const { clearSelectedOrder } = orderSlice.actions;
export default orderSlice.reducer;