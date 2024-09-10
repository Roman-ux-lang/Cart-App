import { Component, Input} from '@angular/core';
import { CartItem } from '../../models/cartItem';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  @Input() items: CartItem[] = [];
}
