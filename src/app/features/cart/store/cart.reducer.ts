import { createReducer,on } from "@ngrx/store";
import * as CartActions from './cart.action';
import { ICartItem } from "../model/cart";
import { cartState } from "./cart.state";
import { CartModel } from "./cart.model";


export const initialCartState: CartModel = {
  cartItems: [], // Default to an empty array
  errormessage: "",
};


export const cartReducer = createReducer(
  initialCartState,

  on(CartActions.loadCartItems, (state) => ({
    ...state
   })),


  on(CartActions.loadCartSuccess, (state, { cartItems }) => ({
    ...state,
    cartItems,
    error: null
  })),


 on(CartActions.loadProductsFailure, (state, { error }) => ({
      ...state,
      error,
})),

 // Handle update cart item quantity success
 on(CartActions.updateCartItemQuantitySuccess, (state, { cartItem }) => ({
  ...state,
  cartItems: state.cartItems.map(item =>
    item.product_id === cartItem.product_id ? { ...item, quantity_purchased: cartItem.quantity_purchased } : item
  ),
  error: null,
}))
    // on(CartActions.addProduct, (state, { product }) => ({
    //   ...state,
    //   products: [...state.products, product],
    // })),
    // on(CartActions.deleteProduct, (state, { productId }) => ({
    //   ...state,
    //   products: state.products.filter((p) => p.id !== productId),
    // }))
  );