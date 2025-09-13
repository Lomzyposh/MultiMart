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
            const productTodecreaseQty = action.payload;
            const productExit = state.cartList.find((item) => item.id === productTodecreaseQty.id);
            if (productExit.qty === 1) {
                state.cartList = state.cartList.filter((item) => item.id !== productExit.id);
            } else {
                state.cartList = state.cartList.map((item) => item.id === productExit.id ?
                    { ...productExit, qty: productExit.qty - 1 }
                    : item)
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
