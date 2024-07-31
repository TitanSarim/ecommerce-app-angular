import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../../models/product';
import { CurrencyPipe, NgFor } from '@angular/common';
import { CartService } from '../../cart/cart.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [NgFor, CurrencyPipe],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})


export class ProductListComponent implements OnInit{

  products: Product[] = [];
  filteredProducts: Product[] = [];
  sortOrder: string = '';

  constructor(private productService: ProductService, private cartService: CartService){

  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      this.filteredProducts = data
    })
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product).subscribe({
      next: () => {
        // add alert of message using snackbar
      }
    })
  }

  applyFilter(event: Event): void{
    let searchTerm = (event.target as HTMLInputElement).value
    searchTerm = searchTerm.toLowerCase();

    this.filteredProducts = this.products.filter(
      product => product.name.toLowerCase().includes(searchTerm)
    )
    // this.sortProducts()
  }

  sortProducts(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const sortValue = target.value;
    this.sortOrder = sortValue;

    if (this.sortOrder === 'priceLowToHigh') {
      this.filteredProducts.sort((a, b) => a.price - b.price);
    } else if (this.sortOrder === 'priceHighToLow') {
      this.filteredProducts.sort((a, b) => b.price - a.price);
    }
  }

}
