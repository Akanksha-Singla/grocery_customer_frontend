import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, mergeMap, switchMap } from 'rxjs/operators';
import * as CartActions from "./cart.action"
import { IAddCartResponse, ICartItem } from '../model/cart';
import { CartserviceService } from '../services/cart/cartservice.service';


@Injectable()
export class CartEffect{
//     constructor(private actions$:Actions, private cartService :CartserviceService)
// {}

actions$ = inject(Actions)
cartService = inject(CartserviceService)

    _loadCart = createEffect(()=> this.actions$.pipe(
        ofType(CartActions.loadCartItems),
        exhaustMap((action)=>{
            return this.cartService.getCart().pipe(
                map((data)=>{
                    console.log("effect",data.data[0])
                  return CartActions.loadCartSuccess({cartItems:data.data[0]})
                }),
                catchError((err)=>of(CartActions.loadProductsFailure({error:err.message})))
            )
            
        })
    ))
    updateCartItemQuantity$ = createEffect(() =>
        this.actions$.pipe(
          ofType(CartActions.updateCartItemQuantity),
          exhaustMap(action =>
            this.cartService.updateQuantity(action.productId, action.quantity_purchased).pipe(
              map((updatedCartItem: any) => {
                return CartActions.updateCartItemQuantitySuccess({ cartItem: updatedCartItem });
              }),
              catchError(error => of(CartActions.loadProductsFailure({ error: error.message })))
            )
          )
        )
      );
}