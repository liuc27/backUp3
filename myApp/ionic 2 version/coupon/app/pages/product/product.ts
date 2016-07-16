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
  private menu1:any;
  private menu2:any;


  constructor(private nav:NavController,
              private params:NavParams,
              public productService:ProductService,
              private events:Events,
              public platform:Platform) {
    this.product=params.data.product;
    this.loadProducts();
    this.menu1=[{
      id: 0,
      name: 'Dine',
      icon: 'ios-wine',
      color: 'red',
      type: 'food'
    }, {
      id: 1,
      name: 'Fashion',
      icon: 'ios-basket',
      color: '#5383FF',
      type: 'shopping'

    }, {
      id: 2,
      name: 'Beauty',
      icon: 'ios-color-wand',
      color: 'pink',
      type: 'beauty'
    }, {
      id: 3,
      name: 'Sleep',
      icon: 'ios-moon',
      color: '#5383FF',
      type: 'hotel'
    }, {
      id: 4,
      name: 'Movie',
      icon: 'ios-film',
      color: 'silver',
      type: 'movie'
    }];
    this.menu2=[{
      id: 5,
      name: 'Car',
      icon: 'ios-car',
      color: 'gold',
      type: 'car'
    }, {
      id: 6,
      name: 'Cafe',
      icon: 'ios-cafe',
      color: 'lightgreen',
      type: 'job'
    }, {
      id: 7,
      name: 'KaraOK',
      icon: 'ios-musical-notes',
      color: 'lightgreen',
      type: 'job'
    }, {
      id: 8,
      name: 'Hospital',
      icon: 'md-add',
      color: 'lightgreen',
      type: 'job'
    }, {
      id: 9,
      name: 'All',
      icon: 'ios-eye',
      color: 'orange',
      type: 'all'
    }];
  }

  onPageWillEnter() {
    this.events.publish('showTabs');
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
