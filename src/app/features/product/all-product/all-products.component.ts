import { Component, ViewChild, HostListener, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { IProduct } from '../models/product';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../sevices/product/product.service';
import { SnackbarService } from '../../../auth/services/sanckbar.service';
import { Router, RouterModule } from '@angular/router';
import { SearchbarComponent } from '../../../shared/component/searchbar/searchbar.component';
import { ProductItemComponent } from '../product-item/product-item.component';
import {
  ReactiveFormsModule,
  FormControl,
  FormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';
import {
  MatSlideToggle,
  MatSlideToggleModule,
} from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { CardSwiperComponent } from '../../../shared/component/card-swiper/card-swiper.component';
@Component({
  selector: 'app-all-products',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    FormsModule,
    MatSlideToggleModule,
    MatButtonModule,
    SearchbarComponent,
    CommonModule,
    ProductItemComponent,
    CardSwiperComponent
  ],
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.scss',
})
export class AllProductsComponent {
  allProducts:IProduct[] = []
constructor(private productService :ProductService, private snackbar:SnackbarService){}
  ngOnInit():void{
this.getProducts()
  }

  getProducts(){
    this.productService.getAllProducts().subscribe({
next:(response)=>{
  this.allProducts = response.data
  console.log(response.data)
  this.snackbar.showSuccess("Products fetched successfully")
},
error:(err)=>{
  this.snackbar.showError("Error in fetching products")
}

    })
  }
  handleCardClick(card: any) {
    console.log('Clicked card:', card);
  }
}
