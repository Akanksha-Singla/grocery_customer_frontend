import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './auth/gaurds/auth-guards';
import { LayoutComponent } from './layout/layout/layout.component';
import { CartpageComponent } from './features/cart/cartpage/cartpage.component';
import { AddShippingAddressComponent } from './features/shipping-address/add-shipping-address/add-shipping-address.component';
import { CheckoutPageComponent } from './features/checkOut/checkout-page/checkout-page.component';
import { CategoryWiseProductComponent } from './features/product/category-wise-product/category-wise-product.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  
  { 
    path: 'login', 
    component: LoginComponent 
  },
  
  { 
    path: 'register', 
    component: RegisterComponent 
  },
  
 
  {
    path: '',
    component: LayoutComponent, 
    canActivate: [AuthGuard],
    children: [
      {
        path: 'all-products',
        loadComponent: () =>
          import('./features/product/all-product/all-products.component').then(
            (m) => m.AllProductsComponent
          ),
      },
      {
        path:'cart',
        loadComponent:()=> import('./features/cart/cartpage/cartpage.component').then(
          (m)=>CartpageComponent
        )
      },
      {
        path:'address',
        loadComponent:()=> import('./features/shipping-address/add-shipping-address/add-shipping-address.component').then(
          (m)=>AddShippingAddressComponent
        )
      },
      {
        path:'checkout',
        loadComponent:()=> import('./features/checkOut/checkout-page/checkout-page.component').then(
          (m)=>CheckoutPageComponent
        )
      },
      {
        path:'categories',
        loadComponent:()=> import('./features/product/category-wise-product/category-wise-product.component').then(
          (m)=>CategoryWiseProductComponent
        )
      },

     
    ],
  },

 
  { path: '**', redirectTo: 'login' },
];
