/**
 * Created by liuchao on 6/25/16.
 */
import {Component, ViewChild, ElementRef} from '@angular/core';
import {Page,App, Events, NavController, NavParams, Popover,} from 'ionic-angular';
import {shopPop1} from "./popoverPages/shopPop1";
import {shopPop2} from "./popoverPages/shopPop2";
import {shopPop3} from "./popoverPages/shopPop3";
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
        this.events = events;
        this.product = params.data.product;
        this.productOrShop = "product";
        console.log(params.data);
        this.shop=params.data.shop;
        this.loadShops();
    }

    onPageWillEnter() {
        this.events.publish('showTabs');
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
    presentShopPop1Popover(ev) {
        let shopPop1Page = Popover.create(shopPop1, {
            contentEle: this.content.nativeElement,
            textEle: this.text.nativeElement
        });

        console.log("presentPopover");
        this.nav.present(shopPop1Page, {
            ev: ev
        });
    }

    presentShopPop2Popover(ev) {
        let shopPop2Page = Popover.create(shopPop2, {
            contentEle: this.content.nativeElement,
            textEle: this.text.nativeElement
        });

        console.log("presentPopover");
        this.nav.present(shopPop2Page, {
            ev: ev
        });
    }

    presentShopPop3Popover(ev) {
        let shopPop3Page = Popover.create(shopPop3, {
            contentEle: this.content.nativeElement,
            textEle: this.text.nativeElement
        });

        console.log("presentPopover");
        this.nav.present(shopPop3Page, {
            ev: ev
        });
    }

}
