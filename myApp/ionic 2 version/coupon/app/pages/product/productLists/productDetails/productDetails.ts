/**
 * Created by liuchao on 6/25/16.
 */
import {Component, ViewChild, ElementRef} from '@angular/core';
import {Page,App, Events, NavController, NavParams, Popover,} from 'ionic-angular';
import {Category} from "./popoverPages/category";
import {Location} from "./popoverPages/location";
import {Order} from "./popoverPages/order";
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

    presentCategoryPopover(ev) {
        let category = Popover.create(Category, {
            contentEle: this.content.nativeElement,
            textEle: this.text.nativeElement
        });

        console.log("presentPopover");
        this.nav.present(category, {
            ev: ev
        });
    }

    presentLocationPopover(ev) {
        let location = Popover.create(Location, {
            contentEle: this.content.nativeElement,
            textEle: this.text.nativeElement
        });

        console.log("presentPopover");
        this.nav.present(location, {
            ev: ev
        });
    }

    presentOrderPopover(ev) {
        let order = Popover.create(Order, {
            contentEle: this.content.nativeElement,
            textEle: this.text.nativeElement
        });

        console.log("presentPopover");
        this.nav.present(order, {
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
}
