import { createSlice } from "@reduxjs/toolkit";

const savedCart = JSON.parse(localStorage.getItem("cartItems")) || [];

const initialState = {
    items: savedCart,
    totalQuantity: savedCart.reduce((acc, item) => acc + item.quantity, 0),
    totalPrice: savedCart.reduce((acc, item) => acc + item.price * item.quantity, 0),
};

const saveToLocalStorage = (items) => {
    localStorage.setItem('cartItems', JSON.stringify(items));
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload;
            const existingItem = state.items.find((item) => item._id === product._id);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...product, quantity: 1 });
            }

            state.totalQuantity = state.items.reduce((acc, item) => acc + item.quantity, 0);
            state.totalPrice = state.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

            saveToLocalStorage(state.items);
        },
        removeFromCart: (state, action) => {
            const id = action.payload;
            state.items = state.items.filter((item) => item._id !== id);

            state.totalQuantity = state.items.reduce((acc, item) => acc + item.quantity, 0);
            state.totalPrice = state.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

            saveToLocalStorage(state.items);
        },
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.items.find((item) => item._id === id);

            if (item && quantity > 0) {
                item.quantity = quantity;
            }

            state.totalQuantity = state.items.reduce((acc, item) => acc + item.quantity, 0);
            state.totalPrice = state.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

            saveToLocalStorage(state.items);
        },

        clearCart: (state) => {
            state.items = [];
            state.totalQuantity = 0;
            state.totalPrice = 0;
            localStorage.removeItem('cartItems');
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;