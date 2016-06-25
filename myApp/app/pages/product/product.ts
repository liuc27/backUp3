import {Component} from '@angular/core';
import {Platform, ActionSheet, NavController,NavParams} from 'ionic-angular';
import {ProductService} from '../../providers/product-service/product-service';
import {ProductDetails} from './productDetails/productDetails';


@Component({
  templateUrl: 'build/pages/product/product.html',
  providers:[ProductService]
})
export class ProductPage {
  public products:any;
  public product:any;
  
  constructor(private navController:NavController, 
              private params:NavParams,
              public productService:ProductService,
              public platform:Platform) {
    this.product=params.data.product;
    this.loadProducts();
  }

  loadProducts() {
    this.productService.load()
        .then(data => {
          this.products = data;
        });
  }

  openMenu() {
    let actionSheet = ActionSheet.create({
      title: 'Albums',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            console.log('Delete clicked');
          }
        },
        {
          text: 'Share',
          icon: !this.platform.is('ios') ? 'share' : null,
          handler: () => {
            console.log('Share clicked');
          }
        },
        {
          text: 'Play',
          icon: !this.platform.is('ios') ? 'arrow-dropright-circle' : null,
          handler: () => {
            console.log('Play clicked');
          }
        },
        {
          text: 'Favorite',
          icon: !this.platform.is('ios') ? 'heart-outline' : null,
          handler: () => {
            console.log('Favorite clicked');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel', // will always sort to be on the bottom
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    this.navController.present(actionSheet);

  }
  
  openProductDetailsPage(product){
    this.navController.push(ProductDetails,{product:product});
  }
}