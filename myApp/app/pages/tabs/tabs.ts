import {Component} from '@angular/core'
import {ProductPage} from '../product/product';
import {ShopPage} from '../shop/shop';
import {SettingsPage} from '../settings/settings';

@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {

  private tab1Root: any;
  private tab2Root: any;
  private tab3Root: any;

  constructor() {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.tab1Root = ProductPage;
    this.tab2Root = ShopPage;
    this.tab3Root = SettingsPage;
  }
}
