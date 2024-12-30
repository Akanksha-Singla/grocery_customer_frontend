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
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-checkout-page',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRadioModule,
    MatRadioButton,
    CommonModule,
    RouterModule,
    MatCardModule
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
    private snackbar:SnackbarService,
    private router:Router
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
        this.snackbar.showSuccess("address loaded Successfully")
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
      
    }
    console.log(orderDetails)
    this.placeOrderService.placeOrder(_id,orderDetails).subscribe({
      next:(response)=>{
        const {razorpayOrder} = response.data
        console.log("response. dtaa in place order",response.data.razorpayOrder.id)
        const options = {
          key: 'rzp_test_ycthcmooN0xIxG', // Replace with Razorpay Key ID
          amount: razorpayOrder.amount,
          currency: razorpayOrder.currency,
          name: 'Your Company Name',
          description: 'Test Transaction',
          order_id: razorpayOrder.id, // Order ID from backend
          handler: (response: any) => {
            console.log('Payment successful', response);
            // this.verifyPayment(response);
          },
          prefill: {
            name: 'Customer Name',
            email: 'customer@example.com',
            contact: '9999999999',
          },
          theme: {
            color: '#F37254',
          },
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();
        this.snackbar.showSuccess("Order has been place Successfully")
        this.router.navigate(['/thankyou'])
      },
      error:(error:any)=>{
        console.log(error);
        this.snackbar.showError("SOmething went wrong try again later")
      }
    })

  }
}
