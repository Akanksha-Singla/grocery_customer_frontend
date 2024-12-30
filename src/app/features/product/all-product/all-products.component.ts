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
import { CategoryService } from '../sevices/product/category.service';
import { ICategory } from '../models/category';

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
    MatPaginatorModule,
  ],
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.scss',
})
export class AllProductsComponent {
  allProducts: IProduct[] = [];
  allCategories: ICategory[] = [];
  hasMoreProducts: boolean = true;

  constructor(
    private productService: ProductService,
    private snackbar: SnackbarService,
    private categorySErvice: CategoryService
  ) {}
  ngOnInit(): void {
    this.getProducts();
  }

  filterSellers(searchTerm: any) {
    console.log('emitted', searchTerm);
    this.searchProduct(searchTerm);
  }
  totalPages!:number
  getProducts(page?:number) {
    this.productService.getAllProducts(page).subscribe({
      next: (response) => {
        this.allProducts = response.data;
        const pagination = response.pagination;
       
         
        if(pagination){
        this.hasMoreProducts = pagination?.currentPage < pagination?.totalPages;
        this.currentPage = pagination.currentPage;
        this.totalPages = pagination.totalPages
        }
      this.snackbar.showSuccess('Products fetched successfully');
      },
      error: (err) => {
        this.snackbar.showError('Error in fetching products');
      },
    });
  }

  handleCardClick(card: any) {
    console.log('Clicked card:', card);
  }

  searchProduct(query: any) {
    console.log('catched', query);
    if (!query) {
      this.getProducts();
    }
    this.productService.searchProduct(query).subscribe({
      next: (response) => {
        console.log('searched data', response.data);
        this.allProducts = response.data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  currentPage = 1;
nextPage(){
  console.log("next",this.hasMoreProducts)
  if (this.hasMoreProducts) {
    this.getProducts(this.currentPage + 1);
  }
}
previousPage(){
  if (this.currentPage > 1) {
    this.currentPage -= 1;
    this.getProducts(this.currentPage);
  }
}
}
