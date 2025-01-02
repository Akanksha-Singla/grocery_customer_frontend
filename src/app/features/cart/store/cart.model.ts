import { ICartItem } from "../model/cart";

export interface CartModel{
    cartItems:ICartItem[],
    errormessage:string;

}