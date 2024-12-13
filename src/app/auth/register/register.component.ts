import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../services/auth.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { Router,RouterModule } from '@angular/router';
import { SnackbarService } from '../services/sanckbar.service';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatOptionModule,
    MatSelectModule,
    MatGridListModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    RouterModule,
  
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  customerForm: FormGroup;

 

  constructor(
   
    private authService: AuthService,
    
    private router:Router,
    private snackbar:SnackbarService
  ) {
    this.customerForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9.\-_$@*!]+$/),
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        // CustomPasswordValidators.logPatternError(),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),

      contact_number: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[0-9]{10}$/),
      ]),
      role: new FormControl("Customer"),
      address: new FormControl('', [
        Validators.minLength(5),
        Validators.maxLength(50),
      ]),
     
    });
  }

  ngOnInit(): void {
   
    this.checkPasswordsMatch();
  }

  checkPasswordsMatch() {
    const password = this.password?.value;
    const confirmPassword = this.confirmPassword?.value;
    if (password && confirmPassword) {
      const matchError = password === confirmPassword ? null : { match: true };
      this.customerForm.get('confirmPassword')?.setErrors(matchError);
    }
  }
  get username() {
    return this.customerForm.get('username');
  }
  get errorMessageUserName(): string {
    const control = this.username;
    if (!control) return '';
    if (control.dirty && control.touched) {
      switch (true) {
        case control.hasError('required'):
          return 'Username is required!';
        case control.hasError('pattern'):
          return 'Only letters, numbers, and special characters . - _ $ @ * ! are allowed.';
        case control.hasError('minlength'):
          return 'Username is at least 3 character!';
        case control.hasError('maxlength'):
          return 'Maximum length is 20 characters.';
        default:
          return '';
      }
    } else {
      return '';
    }
  }
  get email() {
    return this.customerForm.get('email');
  }

  get errorMessageEmail(): string {
    const control = this.email;
    if (!control) return '';
    if (control.dirty && control.touched) {
      switch (true) {
        case control.hasError('required'):
          return 'Email is required';
        case control.hasError('email'):
          return 'Please enter a valid email';
        default:
          return '';
      }
    } else {
      return '';
    }
  }
  get contact_number() {
    return this.customerForm.get('contact_number');
  }
  get errorMessageContact_number(): string {
    const control = this.contact_number;
    if (!control) return '';
    if (control.dirty && control.touched) {
      switch (true) {
        case control.hasError('required'):
          return 'Contact Number is required!';
        case control.hasError('pattern'):
          return 'Contact number must be exactly 10 digits!';
        default:
          return '';
      }
    } else {
      return '';
    }
  }
  get address() {
    return this.customerForm.get('address');
  }
  get errorMessageAddress(): string {
    const control = this.address;
    if (!control) return '';
    if (control.dirty && control.touched) {
      switch (true) {
        case control.hasError('required'):
          return 'Address is required!';
        case control.hasError('minlength'):
          return 'Address is at least 5 character!';
        case control.hasError('maxlength'):
          return 'Address length is 50 characters.';
        default:
          return '';
      }
    } else {
      return '';
    }
  }
  get password() {
    return this.customerForm.get('password');
  }
  get errorMessagePassword(): string {
    const control = this.password;
    if (!control) return '';
    if (control.dirty && control.touched) {
      switch (true) {
        case control.hasError('required'):
          return 'Password is required!';
        case control.hasError('minlength'):
          return 'Minimum 8 characters are required.';
        case control.errors?.['noNumber']:
          return 'At least one number is required.';
        case control.errors?.['noSpecialChars']:
          return 'At least one special character is required.';
        case control.errors?.['noLowerCase']:
          return 'At least one lowercase character is required.';
        case control.errors?.['noUpperCase']:
          return 'At least one uppercase character is required.';
        default:
          return '';
      }
    } else {
      return '';
    }
  }

  get confirmPassword() {
    return this.customerForm.get('confirmPassword');
  }
  get errorMessageConfirmPassword(): string {
    const control = this.customerForm.get('confirmPassword');
    if (!control) return '';

    if (control.touched && control.dirty) {
      if (control.hasError('match')) {
        return 'Passwords do not match!';
      }
      if (control.hasError('required')) {
        return 'Confirm password is required!';
      }
    }
    return '';
  }
 
  







  collectData() {
    console.log('employee', this.customerForm.value);
    if (this.customerForm.valid) {
      const { confirmPassword, ...formData } = this.customerForm.value;
      this.authService.register(formData).subscribe({
        next: (responseData) => {
          console.log('Register', responseData);
          if (responseData.statusCode === 201) {
            console.log('Admin Registered Data', responseData);
            this.snackbar.showSuccess('Registration successfully!');
            this.router.navigate(['/']);
          }
        },
        error: (error) => {
          this.snackbar.showError('Registration failed:');
          console.log('Registration failed:...', error);
        },
      });
    } else {
      // markAllControlsAsDirtyAndTouched(this.customerForm);
      this.snackbar.showError('Please Fill in all required information');
    }
  }
}
