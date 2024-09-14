import { Component, OnInit } from '@angular/core';
import { CatalogComponent } from '../catalog/catalog.component';
import { CartItem } from '../../models/cartItem';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router, RouterOutlet } from '@angular/router';
import { SharingDataService } from '../../services/sharing-data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'cart-app',
  standalone: true,
  imports: [CatalogComponent, NavbarComponent, RouterOutlet],
  templateUrl: './cart-app.component.html',
  styleUrl: './cart-app.component.css'
})
export class CartAppComponent implements OnInit{

  items: CartItem[] = [];
  total: number = 0;

  constructor(
    private router: Router,
    private sharingDataService: SharingDataService){}
  
  ngOnInit(): void {
    //this.items = JSON.parse(sessionStorage.getItem('cart')!) || [];
    this.items = JSON.parse(sessionStorage.getItem('cart') || '[]');
    this.calculateTotal();
    this.onDeleteCart();
    this.onAddCart();
  }

  onAddCart(){
    this.sharingDataService.productEventEmitter.subscribe(product =>{
      const hasItem = this.items.find(item => {return item.product?.id === product.id});
      if(hasItem){
        this.items = this.items.map(item => {
          if(item.product?.id === product.id){
            return{
              ...item,
              quantity: item.quantity + 1
            }
          }
          return item;
        })
      }else{ 
        //this.items = [...this.items, {product, quantity:1}];
        this.items = [...this.items, {product: {...product}, quantity:1}];
      }

      this.calculateTotal();
      this.saveSession();
      this.router.navigate(['/cart'],{
        state: {items: this.items, total: this.total}
      })

      Swal.fire({
        title: "Shopping Cart",
        text: "New product added",
        icon: "success"
      });
    });
  }

  onDeleteCart(): void{
    this.sharingDataService.idProductEventEmitter.subscribe(id => {
      console.log(id + ' se ha ejecutado el evento idProductEventEmitter');

      Swal.fire({
        title: "Are you sure to delete?",
        text: "Care the product will be removed from the shopping cart.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          this.items = this.items.filter(item => item.product!.id !== id);
          if(this.items.length == 0){
            sessionStorage.removeItem('cart');
            sessionStorage.clear();
          }
          this.calculateTotal();
          this.saveSession();
    
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            this.router.navigate(['/cart'],{
              state: {items: this.items, total: this.total}
            });
          });
          
          Swal.fire({
            title: "Deleted!",
            text: "The product has been removed from the shopping cart.",
            icon: "success"
          });
        }
      });
    })
  }

  calculateTotal(): void {
    this.total = this.items.reduce((acumulate, item) => acumulate + (item.product!.price * item.quantity), 0);
  }

  saveSession(): void {
    sessionStorage.setItem('cart', JSON.stringify(this.items));
  }
}
