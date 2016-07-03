/**
 * Created by liuchao on 6/25/16.
 */
import {Component, ViewChild, ElementRef} from '@angular/core';
import {Page,App, Events, NavController, NavParams, Popover,} from 'ionic-angular';
import {Category} from "./popoverPages/category";
import {Location} from "./popoverPages/location";
import {Order} from "./popoverPages/order";
import {getSelectedShopDetail} from '../../../providers/shopDetail-GetSelectedShopDetail-service/shopDetail-GetSelectedShopDetail-service';

@Component({
    templateUrl: 'build/pages/shop/shopDetail/shopDetail.html',
    providers:[getSelectedShopDetail]
})
export class ShopDetail {
    @ViewChild('popoverContent', {read: ElementRef}) content: ElementRef;
    @ViewChild('popoverText', {read: ElementRef}) text: ElementRef;
    shop;
    productOrShop;
    shopDetail;

    constructor(private params: NavParams,
    private nav:NavController,
    private events: Events,
    public shopDetailService:getSelectedShopDetail) {
        this.shop = params.data.shop;
        this.productOrShop = "shop";
        console.log(params.data);
        this.loadSelectedShopDetail();
    }

    loadSelectedShopDetail() {
      this.shopDetailService.load()
          .then(data => {
            this.shopDetail = data;
            console.log(this.shopDetail);
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
