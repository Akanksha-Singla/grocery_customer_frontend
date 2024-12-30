import { CommonModule } from '@angular/common';
import { Component ,ViewChild} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { OrderService } from '../services/order.service';
import { MatTableModule,MatTableDataSource } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { OrderItemComponent } from '../order-item/order-item.component';

@Component({
  selector: 'app-orders',
  imports: [MatPaginatorModule,MatPaginator,CommonModule,MatButtonModule,MatTableModule,FormsModule,MatFormFieldModule,MatIconModule,OrderItemComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})

export class OrdersComponent {
  displayedColumns: string[] = [
    
    '_id',
    'totalPrice',
    'address',
     'paymentStatus',
     'orderStatus',
     'createdAt',
    
  ];
 selected_id=''
  allOrders:any =[]
  isModalVisible = false;
  showModal(id:string) {
    this.selected_id = id;
    console.log("id",this.selected_id)
    console.log("show clicked")
    this.isModalVisible = true;
  }
  hideModal() {
     this.isModalVisible = false;
  }
  orderStatus=['pending',"shipped","delivered","cancelled"]
  constructor(private orderService :OrderService){}
  totalItems = 0;
  currentPage = 1;
  onPageChange() {
    this.currentPage + 5;
  }
  dataSource = new MatTableDataSource<any>(this.allOrders);
  ngOnInit(){
    this.getAllOrders()
  }
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  selectedStatus =''

  onStatusChange(event: any): void {
    this.selectedStatus = event.target.value
    console.log('Selected order status:',this.selectedStatus);
    this.getAllOrders(this.selectedStatus);  // Call the function to filter orders based on the selected status
  }

  getAllOrders(status?:string){
    const pageNew = this.currentPage;
    console.log("status in get all",status)
    this.orderService.getAllOrders(status,pageNew, 100).subscribe({
      next: (response) => {
        console.log('res', response.data);
        this.allOrders = response.data;
        this.dataSource.data = this.allOrders;
      },
      error: (err) => {
        // this.snackbar.showError('Error in fetching products');
        console.log(err);
      },
    });
  }

  
  
}
