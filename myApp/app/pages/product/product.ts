import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {CouponService} from '../../providers/coupon-service/coupon-service';

@Component({
  templateUrl: 'build/pages/product/product.html',
  providers:[CouponService]
})
export class ProductPage {
  public coupons:any;
  constructor(private navController: NavController,public couponService:CouponService) {
  this.loadCoupons();
  }

  loadCoupons(){
    this.couponService.load()
        .then(data => {
          this.coupons = data;
        });
  }
}
