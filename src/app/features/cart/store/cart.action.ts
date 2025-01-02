import { createAction, props } from '@ngrx/store';
import { ICartItem ,IAddCartResponse} from '../model/cart';


export const loadCartItems = createAction('[ICartItem] load cart itmes');

export const loadCartSuccess = createAction('[ICartItems] load cart success',props<{cartItems:ICartItem[]}>())

export const loadProductsFailure = createAction(
    '[ICartItem] Load cart-item Failure',
    props<{ error: any }>()
  );

// New action for updating cart item quantity
export const updateCartItemQuantity = createAction(
  '[ICartItem] Update Cart Item Quantity',
  props<{ productId: string; quantity_purchased:number}>()
);

// Success action after updating cart item quantity
export const updateCartItemQuantitySuccess = createAction(
  '[ICartItem] Update Cart Item Quantity Success',
  props<{ cartItem: ICartItem, }>()
);
export const updateCartItemQuantityFailure = createAction(
  '[ICartItem] Load cart-item Failure',
  props<{ error: any }>()
);