/**
 * Created by liuchao on 6/25/16.
 */
import {Component, ViewChild, ElementRef} from '@angular/core';
import {Page,App, Events, NavController, NavParams, Popover,} from 'ionic-angular';
import {Category} from "./popoverPages/category";
import {Location} from "./popoverPages/location";
import {Order} from "./popoverPages/order";
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
