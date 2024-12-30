import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ILogin,ILoginResponse,ISeller,IRoleDetails,ISellerRegister,IToken } from '../../models/seller';
import { environment } from '../../../environments/environment';
import { IUser,IUserResponse } from '../models/user';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
baseUrlRegister= environment.apiEndpoint+ 'auth/register'
  constructor(private http: HttpClient) { }
baseUrlLogin= environment.apiEndpoint + 'auth/login'
baseGetUserUrl = environment.apiEndpoint + 'auth/get-user'

register(
    formData: ISeller
  ): Observable<ISellerRegister> {

    // console.log(admin)
    return this.http.post<ISellerRegister>(this. baseUrlRegister, formData);
  }
getUser():Observable<IUserResponse>{
return this.http.get<IUserResponse>(this.baseGetUserUrl)

}
  userLogin(loginCredentails:ILogin):Observable<IToken>{
    console.log(loginCredentails)
    const data = this.http.post<IToken>(this.baseUrlLogin,loginCredentails)
    console.log("service",data)
    return data;
    }
    isAuthenticated(): boolean {
      const setToken = sessionStorage.getItem('token');
      if (setToken) {
        return true;
      }
      return false;
    }
}
