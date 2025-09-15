import { createSlice } from "@reduxjs/toolkit";

const storedCartList =
    localStorage.getItem('cartList') !== null ? JSON.parse(localStorage.getItem('cartList')) : [];

const initialState = {
    cartList: storedCartList
}

/* 
I want you to explain to me well because I have never done CRA or Redux only vite.
Where is still confusing is how the redux is what it is doing and how it is being used from Index.js to Store and the linked ones like navbar, cartslice and the rest . I want a full pledged way that i will surely understand. 

*/

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const productToAdd = action.payload.product;
            const quantity = action.payload.num;
            const productExit = state.cartList.find((item) => item.id === productToAdd.id);
            if (productExit) {
                state.cartList = state.cartList.map((item) => item.id === action.payload.product.id ? { ...productExit, qty: productExit.qty + action.payload.num } : item);
            } else {
                state.cartList.push({ ...productToAdd, qty: quantity });
            }
        },

        decreaseQty: (state, action) => {
            const id =
                typeof action.payload === "object" && action.payload !== null
                    ? action.payload.id
                    : action.payload;

            const existing = state.cartList.find((item) => item.id === id);
            if (!existing) return; // <<< guard fixes the crash

            if (existing.qty <= 1) {
                state.cartList = state.cartList.filter((item) => item.id !== id);
            } else {
                existing.qty -= 1;
            }
        },
        deleteProduct: (state, action) => {
            const productToDelete = action.payload;
            state.cartList = state.cartList.filter(
                (item) => item.id !== productToDelete.id
            );
        }

    }
});

export const cartMiddleware = (store) => (next) => (action) => {
    const result = next(action);
    if (action.type?.startsWith('cart/')) {
        const cartList = store.getState().cart.cartList;
        localStorage.setItem('cartList', JSON.stringify(cartList));
    }
    return result;
}
export const { addToCart, decreaseQty, deleteProduct } = cartSlice.actions;

export default cartSlice.reducer;