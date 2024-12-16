import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AddressService } from '../../cart/services/address.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { SnackbarService } from '../../../auth/services/sanckbar.service';

@Component({
  selector: 'app-add-shipping-address',
  imports: [ ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    RouterModule,
    CommonModule,
  MatCardModule,MatIconModule],
  templateUrl: './add-shipping-address.component.html',
  styleUrl: './add-shipping-address.component.scss'
})
export class AddShippingAddressComponent {
  addressForm: FormGroup;
  constructor(private addressService:AddressService,private snackbar:SnackbarService){
    this.addressForm = new FormGroup({
      label: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      street: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      city: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
      ]),
      state: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
      ]),
      postalCode: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{5,6}$/), // Pattern for 5 or 6-digit postal codes
      ]),
      country: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ]),
      isDefault: new FormControl(false), // Optional checkbox
    });
  }
  onSubmit() {
    if (this.addressForm.valid) {
      const newAddress = this.addressForm.value;
      console.log('Address Form Data:', newAddress);
       this.addressService.addAddress(newAddress).subscribe({
        next:(response)=>{
          console.log(response.data);
         this.snackbar.showSuccess("address added successfully")

        },
        error:(error)=>{
          console.error(error)
          this.snackbar.showError("Error in adding address")
        }
       })
     
    } else {
     this.snackbar.showError("Fill required details")
    }
}
getErrorMessage(controlName: string): string {
  const control = this.addressForm.get(controlName);
  if (!control || !control.touched || !control.dirty) return '';

  switch (controlName) {
    case 'label':
      if (control.hasError('required')) return 'Label is required!';
      if (control.hasError('minlength')) return 'Minimum length is 3 characters.';
      if (control.hasError('maxlength')) return 'Maximum length is 20 characters.';
      break;
    case 'street':
      if (control.hasError('required')) return 'Street is required!';
      if (control.hasError('minlength')) return 'Minimum length is 3 characters.';
      if (control.hasError('maxlength')) return 'Maximum length is 50 characters.';
      break;
    case 'city':
      if (control.hasError('required')) return 'City is required!';
      if (control.hasError('minlength')) return 'Minimum length is 2 characters.';
      if (control.hasError('maxlength')) return 'Maximum length is 30 characters.';
      break;
    case 'state':
      if (control.hasError('required')) return 'State is required!';
      if (control.hasError('minlength')) return 'Minimum length is 2 characters.';
      if (control.hasError('maxlength')) return 'Maximum length is 30 characters.';
      break;
    case 'postalCode':
      if (control.hasError('required')) return 'Postal Code is required!';
      if (control.hasError('pattern')) return 'Postal Code must be 5 or 6 digits.';
      break;
    case 'country':
      if (control.hasError('required')) return 'Country is required!';
      if (control.hasError('minlength')) return 'Minimum length is 3 characters.';
      if (control.hasError('maxlength')) return 'Maximum length is 30 characters.';
      break;
    default:
      return '';
  }

  return '';
}

}
