import { CommonModule  } from '@angular/common';
import { Component ,Input, Output, EventEmitter, ElementRef, Renderer2,ViewChild } from '@angular/core';
import { ProductItemComponent } from '../../../features/product/product-item/product-item.component';

@Component({
  selector: 'app-card-swiper',
  imports: [CommonModule,ProductItemComponent],
  templateUrl: './card-swiper.component.html',
  styleUrl: './card-swiper.component.scss'
})
export class CardSwiperComponent {

  @Input() cards!: any[] // Accept card data
  @Input() swipeSpeed: number = 300; // Duration of the transition in ms
  @Input() visibleCards: number = 3 // Number of visible cards at a time
  @Output() cardClick = new EventEmitter<any>(); // Emit event when a card is clicked

  currentIndex = 0;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    // console.log("cards",this.cards)
  }


ngOnIt(){
  // console.log("cards",this.cards)
}
ngViewChild(){
  console.log("cards",this.cards)
}
onNext() {
  console.log(this.cards)
  if (this.currentIndex + this.visibleCards < this.cards.length) {
    this.currentIndex += this.visibleCards;
  }
}

  
  // Go to the previous group of cards
  onPrev() {
    if (this.currentIndex > 0) {
      this.currentIndex -= this.visibleCards;
    }
  }
  get visibleCardSet() {
    return this.cards.slice(this.currentIndex, this.currentIndex + this.visibleCards);
  }
  onCardClick(card: any) {
   
    this.cardClick.emit(card);
  }
}
