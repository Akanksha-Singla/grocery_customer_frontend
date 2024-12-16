import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAdress,IAdressResponse } from '../model/cart';
// import { IAddCartResponse } from '../model/cart';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  constructor(private http:HttpClient) {}
  baseAddAddressUrl =environment.apiEndpoint +'customer/address/add-address'
  baseGetAllAddressUrl = environment.apiEndpoint + 'customer/address/getAllLocation'

  addAddress(shippingAddres:IAdress):Observable<IAdressResponse>{
 const data = this.http.post<IAdressResponse>(this.baseAddAddressUrl,{...shippingAddres})
return data
  }
  public getAdrees():Observable<any>{
    const data = this.http.get(this.baseGetAllAddressUrl)
    return data
  }
}
