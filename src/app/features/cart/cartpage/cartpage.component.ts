import { Component, Output, EventEmitter } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CartserviceService } from '../services/cart/cartservice.service';
import { CartItemComponent } from '../cart-item/cart-item.component';

import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

import { SnackbarService } from '../../../auth/services/sanckbar.service';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import * as CartActions from "../store/cart.action"
import { loadCartItems, loadCartSuccess } from '../store/cart.action';

import { getCart } from '../store/cart.selector';
@Component({
  selector: 'app-cartpage',
  imports: [
    MatIconModule,
    CartItemComponent,
    RouterModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './cartpage.component.html',
  styleUrl: './cartpage.component.scss',
})
export class CartpageComponent {
  @Output() close = new EventEmitter<void>();
  cartItems: any = [];
  itemTotal = 0;
  cartId = '';

  closeModal(): void {
    this.close.emit();
  }

  constructor(
    private cartService: CartserviceService,
    private snackbar: SnackbarService,
    private store:Store
  ) {
    console.log('cart page');
    this.getCartItems();
  }
 

  ngOnInit() {
    // ...
  }


  getCartItems() {
    this.store.dispatch(CartActions.loadCartItems());
    this.store.select(getCart).subscribe((item: any) => {
      console.log("Data received from store:", item);
  
      if (!item) {
        console.error("Cart items are undefined");
        return;
      }

      // Adjust based on item structure
      this.cartItems = item.items || []; // Ensure fallback to empty array
      this.itemTotal = item.total_amount || 0; // Fallback to 0
      this.cartId = item._id || null; // Fallback to null
  
      console.log("Cart ID:", this.cartId);
      localStorage.setItem('cartId', this.cartId || '');
      console.log("Total:", this.itemTotal);
      console.log("Cart items:", this.cartItems);
    });
  }


  recalculateTotal() {
    this.itemTotal = this.cartItems.reduce(
      (total: number, item: any) =>
        total + item.quantity_purchased * item.price,
      0
    );
    console.log('Updated total:', this.itemTotal);

    //  this.getCartItems();
  }

  // Handle product removal from the parent
  onDeleteProduct(_id: string) {
    this.cartService.deleteProduct(_id).subscribe({
      next: (response) => {
        console.log('Item deleted successfully:', _id);
        this.cartItems = this.cartItems.filter(
          (item: any) => item.product_id !== _id
        );
        // Recalculate total
        this.itemTotal = this.cartItems.reduce(
          (sum: number, item: any) =>
            sum + item.price * item.quantity_purchased,
          0
        );
      },
      error: (error) => {
        console.error('Error deleting item:', error);
      },
    });
  }
}
