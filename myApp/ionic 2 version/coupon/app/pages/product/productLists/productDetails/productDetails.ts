/**
 * Created by liuchao on 6/25/16.
 */
import {Component, ViewChild, ElementRef} from '@angular/core';
import {Page,App, Events, NavController, NavParams, Popover} from 'ionic-angular';
import {ProductListsPop1} from "./popoverPages/productDetailsPop1";
import {ProductListsPop2} from "./popoverPages/productDetailsPop2";
import {ProductListsPop3} from "./popoverPages/productDetailsPop3";
import {getSelectedProductDetails} from '../../../../providers/productDetails-GetSelectedProductDetails-service/productDetails-GetSelectedProductDetails-service';

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

    constructor(private params: NavParams,
    private nav:NavController,
    private events: Events,
    public productDetailsService:getSelectedProductDetails) {
        this.product = params.data.product;
        this.productOrShop = "product";
        console.log(params.data);
        this.loadSelectedproductDetails();
    }

    loadSelectedproductDetails() {
      this.productDetailsService.load()
          .then(data => {
            this.productDetails = data;
            console.log(this.productDetails);
          });
    }

    presentProductListsPop1Popover(ev) {
        let productDetailsPop1 = Popover.create(ProductListsPop1, {
            contentEle: this.content.nativeElement,
            textEle: this.text.nativeElement
        });

        console.log("presentPopover");
        this.nav.present(productDetailsPop1, {
            ev: ev
        });
    }

    presentProductListsPop2Popover(ev) {
        let productDetailsPop2 = Popover.create(ProductListsPop2, {
            contentEle: this.content.nativeElement,
            textEle: this.text.nativeElement
        });

        console.log("presentPopover");
        this.nav.present(productDetailsPop2, {
            ev: ev
        });
    }

    presentProductListsPop3Popover(ev) {
        let productDetailsPop3 = Popover.create(ProductListsPop3, {
            contentEle: this.content.nativeElement,
            textEle: this.text.nativeElement
        });

        console.log("presentPopover");
        this.nav.present(productDetailsPop3, {
            ev: ev
        });
    }


}
