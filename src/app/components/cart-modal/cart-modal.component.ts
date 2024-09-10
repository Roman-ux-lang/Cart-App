import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from '../../models/cartItem';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-cart-modal',
  standalone: true,
  imports: [CartComponent],
  templateUrl: './cart-modal.component.html',
  styleUrl: './cart-modal.component.css'
})
export class CartModalComponent {

  @Input() items: CartItem[] = [];
  // @Input() total: number = 0;

  @Output() closeCartEventEmitter = new EventEmitter();
  @Output() idProductEventEmitter: EventEmitter<number> = new EventEmitter<number>();

  onDeleteCart(id: number){
    this.idProductEventEmitter.emit(id);
  }

  closeCart(): void {
    this.closeCartEventEmitter.emit();
  }
}
