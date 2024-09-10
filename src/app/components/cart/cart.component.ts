import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CartItem } from '../../models/cartItem';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnChanges {
 
  @Input() items: CartItem[] = [];
  @Output() idProductEventEmitter: EventEmitter<number> = new EventEmitter<number>();
  
  total!: number;
  
  ngOnChanges(changes: SimpleChanges): void {
    // let itemsChanges = changes['items'];
    this.calculateTotal();
    this.saveSession();
  }

  onDeleteCart(id: number){
    this.idProductEventEmitter.emit(id);

  }

  calculateTotal(): void {
    this.total = this.items.reduce((acumulate, item) => acumulate + (item.product!.price * item.quantity), 0);
  }

  saveSession(): void {
    sessionStorage.setItem('cart', JSON.stringify(this.items));
  }
}
