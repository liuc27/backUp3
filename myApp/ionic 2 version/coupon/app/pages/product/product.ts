import {Component} from '@angular/core';
import {Platform, Events, ActionSheet, NavController,NavParams} from 'ionic-angular';
import {ProductService} from '../../providers/product-getAllProducts-service/product-getAllProducts-service';
import {ProductLists} from './productLists/productLists';


@Component({
  templateUrl: 'build/pages/product/product.html',
  providers:[ProductService]
})
export class ProductPage {
  public products:any;
  public product:any;


  constructor(private nav:NavController,
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

    this.nav.present(actionSheet);

  }

  openProductListsPage(product){
    this.nav.push(ProductLists,{product:product});
  }

}
