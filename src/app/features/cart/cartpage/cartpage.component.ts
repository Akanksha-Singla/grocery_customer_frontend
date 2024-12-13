import { Component,Output,EventEmitter } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cartpage',
  imports: [MatIconModule],
  templateUrl: './cartpage.component.html',
  styleUrl: './cartpage.component.scss'
})
export class CartpageComponent {
  @Output() close = new EventEmitter<void>();
 
  closeModal(): void {
   this.close.emit();
    }
}
