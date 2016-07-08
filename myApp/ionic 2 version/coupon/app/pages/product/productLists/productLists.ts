/**
 * Created by liuchao on 6/25/16.
 */
import {Component, ViewChild, ElementRef} from '@angular/core';
import {Page,App, Events, NavController, NavParams, Popover} from 'ionic-angular';
import {ProductListsPop1} from "./popoverPages/productListsPop1";
import {ProductListsPop2} from "./popoverPages/productListsPop2";
import {ProductListsPop3} from "./popoverPages/productListsPop3";
import {ProductDetails} from './productDetails/productDetails';
import {ProductPage} from '../product';

import {getSelectedProductLists} from '../../../providers/productLists-GetSelectedProductLists-service/productLists-GetSelectedProductLists-service';

@Component({
    templateUrl: 'build/pages/product/productLists/productLists.html',
    providers:[getSelectedProductLists]
})
export class ProductLists {
    @ViewChild('popoverContent', {read: ElementRef}) content: ElementRef;
    @ViewChild('popoverText', {read: ElementRef}) text: ElementRef;
    product;
    productOrShop;
    productLists;

    constructor(private params: NavParams,
    private nav:NavController,
    private events: Events,
    public productListsService:getSelectedProductLists) {
        this.product = params.data.product;
        this.productOrShop = "product";
        console.log(params.data);
        this.loadSelectedProductLists();
    }

    loadSelectedProductLists() {
      this.productListsService.load()
          .then(data => {
            this.productLists = data;
            console.log(this.productLists);
          });
    }

    presentProductListsPop1Popover(ev) {
        let productListsPop1 = Popover.create(ProductListsPop1, {
            contentEle: this.content.nativeElement,
            textEle: this.text.nativeElement
        });

        console.log("presentPopover");
        this.nav.present(productListsPop1, {
            ev: ev
        });
    }

    presentProductListsPop2Popover(ev) {
        let productListsPop2 = Popover.create(ProductListsPop2, {
            contentEle: this.content.nativeElement,
            textEle: this.text.nativeElement
        });

        console.log("presentPopover");
        this.nav.present(productListsPop2, {
            ev: ev
        });
    }

    presentProductListsPop3Popover(ev) {
        let productListsPop3 = Popover.create(ProductListsPop3, {
            contentEle: this.content.nativeElement,
            textEle: this.text.nativeElement
        });

        console.log("presentPopover");
        this.nav.present(productListsPop3, {
            ev: ev
        });
    }

    onPageWillEnter() {
      this.hideTabs();
    }

    hideTabs(){
      console.log("enter");
      this.events.publish('hideTabs');
    }

    showTabs() {
      console.log("leave")
      this.events.publish('showTabs');
    }

    popBack(){
        this.showTabs();
        console.log("pp1");
        this.nav.pop();
    }

    openProductDetailsPage(product){
      console.log("detail open");
      this.nav.push(ProductDetails,{product:product});
    }
}
