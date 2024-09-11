import { Component, EventEmitter} from '@angular/core';
import { CartItem } from '../../models/cartItem';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
 
  items: CartItem[] = [];
  total: number = 0;
  
  idProductEventEmitter: EventEmitter<number> = new EventEmitter<number>();
 
  onDeleteCart(id: number){
    this.idProductEventEmitter.emit(id);
  }
}
