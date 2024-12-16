import { Component } from '@angular/core';
import { AddressService } from '../../cart/services/address.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioButton, MatRadioModule } from '@angular/material/radio';
import { CommonModule } from '@angular/common';
import { IRoleDetails } from '../../../models/seller';
import { IPlaceOrder } from '../service/place-order.service';
import { PlaceOrderService } from '../service/place-order.service';
import { SnackbarService } from '../../../auth/services/sanckbar.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-checkout-page',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRadioModule,
    MatRadioButton,
    CommonModule,
    RouterModule
  ],
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.scss',
})
export class CheckoutPageComponent {
  shippingAddress: any = [];
  selectedAddress = '';
  selectedPaymentMode: string = '';
  cartId: string = '';
  constructor(
    private addressService: AddressService,
    private placeOrderService: PlaceOrderService,
    private snackbar:SnackbarService
  ) {
    console.log('checkout');
    this.getAddress();
  }

  ngOnInit() {
    const savedCartId = localStorage.getItem('cartId');
    if (savedCartId) {
      this.cartId = savedCartId;
      console.log('Cart ID retrieved from local storage:', this.cartId);
    } else {
      console.error('No cart ID found in local storage');
    }
  }

  getAddress() {
    this.addressService.getAdrees().subscribe({
      next: (response) => {
        console.log(' check shippning address', response.data);
        this.shippingAddress = response.data;
        this.snackbar.showSuccess("Order has been place Successfully")
      },
      error: (error) => {
        console.log(error);
        this.snackbar.showError("SOmething went wrong try again later")
      },
    });
  }


  confirmOrder(){
    const _id=this.cartId; 
    const orderDetails ={
      address : this.selectedAddress,
      paymentMode : this.selectedPaymentMode
    }
    this.placeOrderService.placeOrder(_id,orderDetails).subscribe({
      next:(response)=>{
        console.log(response.data)
      },
      error:(error:any)=>{
        console.log(error)
      }
    })

  }
}
