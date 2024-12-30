import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

export interface IAllOrder {
  message: string,
  image:string;
  statusCode: number,
  data: any,
  pagination?: {
    currentPage: number,
    totalItems: number,
    totalPages: number
  }
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }
  
  baseGetAllOrdersUrl = environment.apiEndpoint + 'customer/order/get-all'
  baseGetOrderByIdUrl = environment.apiEndpoint + 'customer/order/get-order/'

  getAllOrders(status?: string, page: number = 1, limit: number = 10): Observable<IAllOrder> {
    console.log("status in service",status)
    let url = `${this.baseGetAllOrdersUrl}?page=${page}&limit=${limit}`;
  
    if (status) {
      url += `&status=${status}`;
    }
  
    return this.http.get<IAllOrder>(url);
  }
  
  getOrderById(orderId:string):Observable<any>{
    const data = this.http.get(this.baseGetOrderByIdUrl + orderId)
    return data
  }
}
