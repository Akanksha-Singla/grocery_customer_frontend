import { Component, Input } from '@angular/core';
import { IProduct } from '../models/product';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { CartserviceService } from '../../cart/services/cart/cartservice.service';
import { SnackBarHarnessFilters } from '@angular/material/snack-bar/testing';
import { SnackbarService } from '../../../auth/services/sanckbar.service';

@Component({
  selector: 'app-product-item',
  imports: [
    MatCardModule,
    RouterModule,
    MatIconModule,
    CommonModule,
    MatButtonModule,
  ],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss',
})
export class ProductItemComponent {
  @Input()
  product: any;
  flag = false;

  ngOnIt() {
    console.log('ngonit');
  }
  constructor(private cartService:CartserviceService,private snackbar:SnackbarService){}
  generateStars(rating: number): string[] {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const totalStars = 5;

    const stars: string[] = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push('star');
    }

    if (hasHalfStar) {
      stars.push('star_half');
    }

    for (let i = stars.length; i < totalStars; i++) {
      stars.push('star_outline');
    }

    return stars;
  }
  addToCart(product_id:string){
    console.log("add to cart",product_id)
  this.flag=true;
  const cartData = {quantity_purchased:1}
  this.cartService.addToCart(product_id,cartData).subscribe(
    {
      next:(response)=>{
        console.log(response.data)
this.snackbar.showSuccess("Product add to cart")
      },
error:(error)=>{
console.error(error)
this.snackbar.showError("Error in adding to card")
}
    }
  );
  }
  buyNow(product_id:string){
   
   const cartData = {quantity_purchased:1}
  
   this.cartService.addToCart(product_id,cartData).subscribe({
    next:(response)=>{
      console.log(response)
      this.snackbar.showSuccess("Product added successfully")
    },
    error:(error)=>{
 console.error(error)
 this.snackbar.showError("Error in adding Product")
    }
   }
   
  );
  // this.router.navigate(['navbar/cart'])
  } 
}
