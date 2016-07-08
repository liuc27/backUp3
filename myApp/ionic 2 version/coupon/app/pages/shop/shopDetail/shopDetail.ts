/**
 * Created by liuchao on 6/25/16.
 */
import {Component, ViewChild, ElementRef} from '@angular/core';
import {Page,App, Events, NavController, NavParams, Popover,} from 'ionic-angular';
import {shopDetailPop1} from "./popoverPages/shopDetailPop1";
import {shopDetailPop2} from "./popoverPages/shopDetailPop2";
import {shopDetailPop3} from "./popoverPages/shopDetailPop3";
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

    presentShopDetailPop1Popover(ev) {
        let shopDetailPop1Page = Popover.create(shopDetailPop1, {
            contentEle: this.content.nativeElement,
            textEle: this.text.nativeElement
        });

        console.log("presentPopover");
        this.nav.present(shopDetailPop1Page, {
            ev: ev
        });
    }

    presentShopDetailPop2Popover(ev) {
        let shopDetailPop2Page = Popover.create(shopDetailPop2, {
            contentEle: this.content.nativeElement,
            textEle: this.text.nativeElement
        });

        console.log("presentPopover");
        this.nav.present(shopDetailPop2Page, {
            ev: ev
        });
    }

    presentShopDetailPop3Popover(ev) {
        let shopDetailPop3Page = Popover.create(shopDetailPop3, {
            contentEle: this.content.nativeElement,
            textEle: this.text.nativeElement
        });

        console.log("presentPopover");
        this.nav.present(shopDetailPop3Page, {
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
