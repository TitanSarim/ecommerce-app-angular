import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { CartService } from '../cart.service';
import { CurrencyPipe, NgFor } from '@angular/common';


@Component({
  selector: 'app-cart-view',
  standalone: true,
  imports: [NgFor, CurrencyPipe],
  templateUrl: './cart-view.component.html',
  styleUrl: './cart-view.component.css'
})
export class CartViewComponent implements OnInit {

  cartItems: Product[] = [];
  totalPrice: number = 0;
  constructor(private cartService: CartService){}


  ngOnInit(): void {
    this.cartService.getCartItems().subscribe(data => {
      this.cartItems = data;
      this.totalPrice = this.getTotalPrice();
    })
  }

  getTotalPrice(): number {
    let totalPrice = 0;
    for(let item of this.cartItems){
      totalPrice += item.price
    }
    return totalPrice;
  }

  clearCart() : void{
    this.cartService.clearCart().subscribe()
  }

}
