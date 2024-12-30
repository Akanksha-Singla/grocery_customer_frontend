import { CommonModule } from '@angular/common';
import { Component,HostListener } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule,Router } from '@angular/router';
import { SnackbarService } from '../../auth/services/sanckbar.service';
import { CartpageComponent } from '../../features/cart/cartpage/cartpage.component';
import { AuthService } from '../../auth/services/auth.service';
import { MatTooltipModule } from '@angular/material/tooltip';
@Component({
  selector: 'app-layout',
  imports: [CartpageComponent,MatToolbarModule,MatIconModule,RouterModule,MatSidenavModule,CommonModule,MatListModule,MatButtonModule,MatTooltipModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
userImage: string = '';
userName:string =''
image!:string;
collapsed: boolean = false;
isScreenSmall = false;
sidenavOpened = true;
isModalVisible = false;


showModal() {
  this.isModalVisible = true;
}
hideModal() {
   this.isModalVisible = false;
}
menus :any=[
  // {
  //   label: `Dashboard`,
  //   redirectURL: '/dashboard',
  //   icon: 'dashboard',
  // },
  {
    label: 'All Products',
    redirectURL: '/all-products',
    icon: 'check_circle',
  },
  {
    label: 'Categories',
    redirectURL: '/categories',
    icon: 'category',
  },
  {
    label: 'My Orders',
    redirectURL: '/all-orders',
    icon: 'store',
  },
  // {
  //   label: 'Logout',
  //   redirectURL: '/logout',
  //   icon: 'exit_to_app',
  // },
];
constructor(private snackBar:SnackbarService,public router:Router,private authService:AuthService){

}
checkScreenSize() {
  this.isScreenSmall = window.innerWidth < 803;
  if (this.isScreenSmall) {
    this.sidenavOpened = false; // Close sidenav on small screens
  }
}

ngOnInit(): void {
  this.checkScreenSize();
  this.getUser()
}
@HostListener('window:resize', [])
onResize() {
  this.checkScreenSize();
}
collapsedState() {
  this.collapsed = !this.collapsed;
  console.log(this.collapsed);
}
sidenavWidth() {
  return this.collapsed ? '65px' : '250px';
}
handleMenuClick(label: string) {
  if (label === 'Logout') {
    this.logout();
  }
  if (this.isScreenSmall) {
    this.sidenavOpened = false; // Close sidenav after navigation on small screens
  }
}
toggleSidenav() {
  this.sidenavOpened = !this.sidenavOpened;
}
sidenavMargin(): string {
  return this.isScreenSmall ? '0px' : '240px';
}
logout() {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('role');
  this.snackBar.showError('Logged out successfully...');
  this.router.navigate(['/']);
}

getUser(){
this.authService.getUser().subscribe({
  next:(response)=>{
  this.userName = response.data.username
  
  },
  error:(error)=>{
    console.log(error)
  }
})
}
}
