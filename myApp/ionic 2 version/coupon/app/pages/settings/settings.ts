import {Component} from '@angular/core';
import {NavController,Events} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/settings/settings.html'
})
export class SettingsPage {
  constructor(private navController: NavController,
              private events: Events) {
  }

  onPageWillEnter() {
    this.events.publish('showTabs');
  }

  openOauth(oauthName){
    console.log(oauthName);
  }
}
