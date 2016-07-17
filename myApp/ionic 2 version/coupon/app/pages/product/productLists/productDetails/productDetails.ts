/**
 * Created by liuchao on 6/25/16.
 */
import {Component, ViewChild, ElementRef} from '@angular/core';
import {Page,App, ActionSheet, Events, NavController, NavParams, Popover} from 'ionic-angular';
import {getSelectedProductDetails} from '../../../../providers/productDetails-GetSelectedProductDetails-service/productDetails-GetSelectedProductDetails-service';
import {ShopDetail} from '../../../shop/shopDetail/shopDetail';

@Component({
    templateUrl: 'build/pages/product/productLists/productDetails/productDetails.html',
    providers:[getSelectedProductDetails]
})
export class ProductDetails {
    @ViewChild('popoverContent', {read: ElementRef}) content: ElementRef;
    @ViewChild('popoverText', {read: ElementRef}) text: ElementRef;
    product;
    productOrShop;
    productDetails;
    mySlideOptions = {
      autoplay: 3500,
      loop: true,
      speed: 450
    };
    constructor(private params: NavParams,
    private nav:NavController,
    private events: Events,
    public productDetailsService:getSelectedProductDetails) {
        this.product = params.data.product;
        this.productOrShop = "product";
        console.log(params.data);
        this.loadSelectedproductDetails();
    }

    onPageWillEnter() {
        this.events.publish('hideTabs');
    }


    shareActionSheet() {
        let actionSheet = ActionSheet.create({
            title: 'SHARE',
            cssClass: 'action-sheets-basic-page',
            buttons: [
                {
                    text: 'Facebook',
                    role: 'destructive',
                    icon: 'logo-facebook',
                    handler: () => {
                        console.log('Delete clicked');
                    }
                },
                {
                    text: 'email',
                    icon: 'ios-mail',
                    handler: () => {
                        console.log('Share clicked');
                    }
                },
                {
                    text: 'Wechat',
                    icon: 'arrow-dropright-circle',
                    handler: () => {
                        console.log('Play clicked');
                    }
                },
                {
                    text: 'Twitter',
                    icon: 'logo-twitter',
                    handler: () => {
                        console.log('Favorite clicked');
                    }
                },
                {
                    text: 'Google',
                    icon: 'logo-google',
                    handler: () => {
                        console.log('Favorite clicked');
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel', // will always sort to be on the bottom
                    icon: 'md-close',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });

        this.nav.present(actionSheet);

    }

    loadSelectedproductDetails() {
      this.productDetailsService.load()
          .then(data => {
            this.productDetails = data;
            console.log(this.productDetails);
          });
    }

    openShopDetailPage(shop){
        console.log(shop);
        this.nav.push(ShopDetail,{shop:shop});

    }

}
