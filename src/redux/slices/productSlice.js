import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productService from '../../api/productService.js';

export const fetchProducts = createAsyncThunk('products/fetchAll', async (_, { rejectWithValue }) => {
    try {
        return await productService.getAllProducts();
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const fetchProductById = createAsyncThunk('products/fetchById', async (id, { rejectWithValue }) => {
    try {
        return await productService.getProductById(id);
    } catch (error) {
        return rejectWithValue(error.message)
    }
});

export const createProduct = createAsyncThunk('products/create', async (data, { rejectWithValue }) => {
    try {
        return await productService.createProduct(data);
    } catch (error) {
        return rejectWithValue(error.message)
    }
});

export const updateProduct = createAsyncThunk('products/update', async ({ id, data }, { rejectWithValue }) => {
    try {
        return await productService.updateProduct(id, data);
    } catch (error) {
        return rejectWithValue(error.message)
    }
});

export const deleteProduct = createAsyncThunk('products/delete', async (id, { rejectWithValue }) => {
    try {
        await productService.deleteProduct(id);
        return id;
    } catch (error) {
        return rejectWithValue(error.message)
    }
});

const initialState = {
    items: [],
    selectedProduct: null,
    loading: false,
    error: null,
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        clearSelectedProduct: (state) => {
            state.selectedProduct = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.selectedProduct = action.payload;
            })

            .addCase(createProduct.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })

            .addCase(updateProduct.fulfilled, (state, action) => {
                const index = state.items.findIndex(p => p._id === action.payload._id);
                if (index !== -1) state.items[index] = action.payload;
            })

            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.items = state.items.filter(p => p._id !== action.payload);
            });
    },
});

export const { clearSelectedProduct } = productSlice.actions;
export default productSlice.reducer;