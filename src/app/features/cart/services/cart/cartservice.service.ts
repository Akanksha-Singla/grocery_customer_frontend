import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { IProduct } from '../../../product/models/product';
import { IAddCartResponse } from '../../model/cart';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartserviceService {

  constructor(private http:HttpClient) { }
  
  baseAddtoCartUrl = environment.apiEndpoint + 'customer/cart/add-to-cart/';
  baseGetCartUrl = environment.apiEndpoint + 'customer/cart/getcart';
  

 public addToCart(_id:string,cartData:{quantity_purchased:number}):Observable<IAddCartResponse>{
    const data = this.http.post<IAddCartResponse>(this.baseAddtoCartUrl+_id,{...cartData})
    return data;
  }
 public getCart():Observable<any> {
  const data = this.http.get(this.baseGetCartUrl)
  return data
 }
}
