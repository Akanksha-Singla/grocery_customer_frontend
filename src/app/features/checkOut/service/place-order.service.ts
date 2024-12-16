import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PlaceOrderService {

  constructor(private http:HttpClient) {  }
  
  basePlaceOrderUrl= environment.apiEndpoint + 'customer/order/place-order/'


  placeOrder(_id:string,orderDetails:IPlaceOrder):Observable<IPlaceOrderResponse>{
    console.log(_id,orderDetails)
    const data = this.http.post<IPlaceOrderResponse>(this.basePlaceOrderUrl+_id,{...orderDetails})
     return data
  }

}
export interface IPlaceOrder{
  address:string;
  paymentMode:string
}

export interface IPlaceOrderResponse{
  statusCode:number,
  sucess:boolean,
  message:string,
  data:any
}