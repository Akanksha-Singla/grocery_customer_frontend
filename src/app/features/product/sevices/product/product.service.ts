import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import {
  CloudinaryResponse,
  IAddProduct,
  IAllProduct,
  IGetProduct,
  IProduct,
} from '../../models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  baseGetAllProducts =
    environment.apiEndpoint + 'seller/product/getAllProducts';

  baseGetProductByIdUrl =
    environment.apiEndpoint + 'seller/product/getProductById/';
  baseSearchUrl = environment.apiEndpoint + 'seller/product/search';
  baseGetProductByCategory= environment.apiEndpoint + 'seller/product/getProductByCategory/'

  getAllProducts(page?: number, limit?: number): Observable<IAllProduct> {
    const data = this.http.get<IAllProduct>(
      `${this.baseGetAllProducts}?page=${page}&limit=${limit}`
    );
    return data;
  }
  searchProduct(query?: string): Observable<IAllProduct> {
    const data = this.http.get<IAllProduct>(
      `${this.baseSearchUrl}?query=${query}`
    );
    return data;
  }

  getProductById(_id: string): Observable<IGetProduct> {
    const data = this.http.get<IGetProduct>(this.baseGetProductByIdUrl + _id);
    return data;
  }

  getProductByCategory(_id:string):Observable<IAllProduct>{
    const data = this.http.get<IAllProduct>(this.baseGetProductByCategory+_id)
    return data;
  }
}
