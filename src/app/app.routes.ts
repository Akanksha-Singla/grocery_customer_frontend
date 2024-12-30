import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './auth/gaurds/auth-guards';
import { LayoutComponent } from './layout/layout/layout.component';
import { CartpageComponent } from './features/cart/cartpage/cartpage.component';
import { AddShippingAddressComponent } from './features/shipping-address/add-shipping-address/add-shipping-address.component';
import { CheckoutPageComponent } from './features/checkOut/checkout-page/checkout-page.component';
import { CategoryWiseProductComponent } from './features/product/category-wise-product/category-wise-product.component';
import { ThankyouComponent } from './features/checkOut/thankyou/thankyou.component';
import { OrdersComponent } from './features/orders/orders/orders.component';
import { PageNotFoundComponent } from './shared/component/page-not-found/page-not-found.component';

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
    path: 'page-not-found', 
    component: PageNotFoundComponent 
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
      {
        path:'thankyou',
        loadComponent:()=> import('./features/checkOut/thankyou/thankyou.component').then(
          (m)=>ThankyouComponent
        )
      },
      {
        path:'all-orders',
        loadComponent:()=> import('./features/orders/orders/orders.component').then(
          (m)=>OrdersComponent
        )
      },

     
    ],
  },

 
  { path: '**', redirectTo: 'page-not-found' },
];
