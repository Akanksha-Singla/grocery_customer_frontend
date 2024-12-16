import { CommonModule } from '@angular/common';
import { Component,Input,OnInit ,Output, EventEmitter} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CartserviceService } from '../services/cart/cartservice.service';
import { SnackbarService } from '../../../auth/services/sanckbar.service';

@Component({
  selector: 'app-cart-item',
  imports: [CommonModule,MatCardModule,MatButtonModule,MatIconModule],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss'
})
export class CartItemComponent {
@Input()
cartItem:any
 constructor(private cartService:CartserviceService,private snackbar:SnackbarService){
  
 }
 @Output() totalUpdated = new EventEmitter<void>();
 @Output() deleteProduct =new EventEmitter<string>();
 ngOnInit() {
  // Use ngOnInit for initial setup after @Input is set
  console.log('ngOnInit - child cart:', this.cartItem);
}
add(cartItem: any) {
  console.log("cart-item",cartItem)
  
    cartItem.quantity_purchased += 1;
   this.updateProductQty(cartItem.product_id,cartItem.quantity_purchased)
}

dec(cartItem: any) {
  console.log("cart-item",cartItem)
  console.log("product_id")
  
  if (cartItem.quantity_purchased > 1) {
    cartItem.quantity_purchased -= 1;
    this.updateProductQty(cartItem.product_id, cartItem.quantity_purchased);
  } 

}
remove(_id:string){
 this.deleteProduct.emit(_id);
}
updateProductQty(product_id:string,quantity_purchased:number){
  console.log("add to cart",product_id)

const cartData = {quantity_purchased:quantity_purchased}
this.cartService.updateQuantity(product_id,cartData).subscribe(
  {
    next:(response)=>{
      console.log("cart updated",response.data)
      this.totalUpdated.emit();
this.snackbar.showSuccess("Product quantity updated")
    },
error:(error)=>{
console.error(error)
this.snackbar.showError("Error in updating cart")
}
  }
);
}

}
