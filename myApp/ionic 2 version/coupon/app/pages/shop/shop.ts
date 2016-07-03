/**
 * Created by liuchao on 6/25/16.
 */
import {Component, ViewChild, ElementRef} from '@angular/core';
import {Page,App, Events, NavController, NavParams, Popover,} from 'ionic-angular';
import {Category} from "./popoverPages/category";
import {Location} from "./popoverPages/location";
import {Order} from "./popoverPages/order";
import {ShopGetAllShopsService} from '../../providers/shop-get-all-shops-service/shop-get-all-shops-service';
import {ShopDetail} from './shopDetail/shopDetail';

@Component({
    templateUrl: 'build/pages/shop/shop.html',
    providers: [ShopGetAllShopsService]
})
export class ShopPage {
    @ViewChild('popoverContent', {read: ElementRef}) content: ElementRef;
    @ViewChild('popoverText', {read: ElementRef}) text: ElementRef;
    product;
    productOrShop;
    shop;
    shops;

    constructor(private params: NavParams,
    private nav:NavController,
    private events: Events,
    private shopGetAllShopsService:ShopGetAllShopsService) {
        this.product = params.data.product;
        this.productOrShop = "product";
        console.log(params.data);
        this.shop=params.data.shop;
        this.loadShops();
    }


    loadShops(){
      this.shopGetAllShopsService.load()
        .then(data => {
          this.shops = data;
        })
    }

    openshopDetailPage(shop){
        console.log(shop);
        this.nav.push(ShopDetail,{shop:shop});

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

}
