import { Component } from '@angular/core';
import { ICategory } from '../models/category';
import { IProduct } from '../models/product';
import { ProductService } from '../sevices/product/product.service';
import { CategoryService } from '../sevices/product/category.service';
import { SnackbarService } from '../../../auth/services/sanckbar.service';
import { ProductItemComponent } from '../product-item/product-item.component';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-category-wise-product',
  imports: [ProductItemComponent,CommonModule,MatToolbarModule],
  templateUrl: './category-wise-product.component.html',
  styleUrl: './category-wise-product.component.scss'
})
export class CategoryWiseProductComponent {
  allCategories: ICategory[] =[]
  products:IProduct[]=[]; // Holds products of selected category
  selectedCategoryId: string = ''; // ID of the selected category
 constructor(private productService :ProductService, private snackbar:SnackbarService,private categorySErvice:CategoryService){}
 ngOnInit(): void {
  // Fetch all categories on initialization
  this.getAllCategories();
}
getAllCategories(): void {
  this.categorySErvice.allCategories().subscribe({
    next: (response) => {
      this.allCategories = response.data;
      console.log('Categories:', this.allCategories);

      // Automatically load products for the first category
      if (this.allCategories.length > 0) {
        this.loadProducts(this.allCategories[0]._id);
      }
    },
    error: (err) => {
      console.error('Error fetching categories:', err);
    },
  });
}
loadProducts(categoryId: string): void {
  this.selectedCategoryId = categoryId; // Set selected category
  this.productService.getProductByCategory(categoryId).subscribe({
    next: (response) => {
      this.products = response.data;
      console.log('Products for category:', this.products);
    },
    error: (err) => {
      console.error('Error fetching products:', err);
    },
  });
}
}
