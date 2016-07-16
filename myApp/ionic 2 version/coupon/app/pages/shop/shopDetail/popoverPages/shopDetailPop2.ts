/**
 * Created by liuchao on 6/26/16.
 */
import {Component} from '@angular/core';
import {NavController, NavParams, Events} from 'ionic-angular';

@Component({
    templateUrl: 'build/pages/shop/shopDetail/popoverPages/shopDetailPop2.html',
})

export class shopDetailPop2 {
    background: string;
    contentEle: any;
    textEle: any;
    fontFamily;

    colors = {
        'white': {
            'bg': 'rgb(255, 255, 255)',
            'fg': 'rgb(0, 0, 0)'
        },
        'tan': {
            'bg': 'rgb(249, 241, 228)',
            'fg': 'rgb(0, 0, 0)'
        },
        'grey': {
            'bg': 'rgb(76, 75, 80)',
            'fg': 'rgb(255, 255, 255)'
        },
        'black': {
            'bg': 'rgb(0, 0, 0)',
            'fg': 'rgb(255, 255, 255)'
        },
    };

    constructor(private navParams: NavParams, private nav:NavController, private events:Events) {

    }

    ngOnInit() {
        if (this.navParams.data) {
            this.contentEle = this.navParams.data.contentEle;
            this.textEle = this.navParams.data.textEle;
        }
    }

    getColorName(background) {
        let colorName = 'white';

        if (!background) return 'white';

        for(var key in this.colors) {
            if (this.colors[key].bg == background) {
                colorName = key;
            }
        }

        return colorName;
    }

    setFontFamily() {
        if (this.textEle.style.fontFamily) {
            this.fontFamily = this.textEle.style.fontFamily.replace(/'/g, "");

        }
    }

    changeBackground(color) {
        this.background = color;
        this.contentEle.style.backgroundColor = this.colors[color].bg;
        this.textEle.style.color = this.colors[color].fg;
        this.nav.pop();

    }

    changeFontSize(direction) {
        this.textEle.style.fontSize = direction;
        this.nav.pop();

    }

    changeFontFamily() {
        if (this.fontFamily) {
            this.textEle.style.fontFamily = this.fontFamily;
            this.nav.pop();
        }
    }

}
