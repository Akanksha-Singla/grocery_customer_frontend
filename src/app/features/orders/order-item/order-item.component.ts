import { EventEmitter, Input, Output } from "@angular/core";
import { Component} from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { OrderService } from "../services/order.service";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-order-item',
  imports: [MatIcon,CommonModule],
  templateUrl: './order-item.component.html',
  styleUrl: './order-item.component.scss'
})
export class OrderItemComponent {
@Output() close= new EventEmitter<void>();
@Input() orderId:any =""


orderDetails!:any
totalAmount=0

closeModal():void{
  this.close.emit();
}

constructor(private orderService :OrderService){}

ngOnInit(){
  this.getOrderByID();
}
getOrderByID(){
  console.log("order_id",this.orderId)
  const {selected_id} = this.orderId
  this.orderService.getOrderById(selected_id).subscribe({
   next:(response)=>{
    this.orderDetails = response.data.items
    this.totalAmount = response.data.totalPrice
    console.log(response.data)
   },
   error:(err)=>{
    console.error(err)
   }
  })
}
}
