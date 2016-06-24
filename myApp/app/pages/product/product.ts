import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ProductService} from '../../providers/product-service/product-service';

@Component({
  templateUrl: 'build/pages/product/product.html',
  providers:[ProductService]
})
export class ProductPage {
  public products:any;
  constructor(private navController: NavController,public productService:ProductService) {
  this.loadProducts();
  }

  loadProducts(){
    this.productService.load()
        .then(data => {
          this.products = data;
        });
  }
}
