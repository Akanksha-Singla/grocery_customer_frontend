import { createFeatureSelector,createSelector } from "@ngrx/store";
import { CartModel } from "./cart.model";


const getCartState = createFeatureSelector<CartModel>('cart');

export const getCart = createSelector(getCartState,(state)=>{
    console.log("store",state.cartItems)
    return state.cartItems;
})