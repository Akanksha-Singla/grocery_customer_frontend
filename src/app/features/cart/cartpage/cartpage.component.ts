import { Component, Output, EventEmitter } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CartserviceService } from '../services/cart/cartservice.service';
import { CartItemComponent } from '../cart-item/cart-item.component';

import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

import { SnackbarService } from '../../../auth/services/sanckbar.service';
import { CommonModule } from '@angular/common';
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
    private snackbar: SnackbarService
  ) {
    console.log('cart page');
    this.getCartItems();
  }

  ngOnIt() {
    // this.getCartItems();
  }

  getCartItems() {
    this.cartService.getCart().subscribe({
      next: (response) => {
        this.cartItems = response.data[0].items;
        this.itemTotal = response.data[0].total_amount;
        this.cartId = response.data[0]._id;
        console.log(this.cartId);
        // Store the cartId in local storage
        localStorage.setItem('cartId', this.cartId);
        console.log('total', response.data);
        console.log('cart-item', this.cartItems);
      },
      error: (error) => {
        console.error(error);
      },
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
