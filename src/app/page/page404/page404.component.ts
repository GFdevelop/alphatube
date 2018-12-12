import { Component, OnInit, ViewEncapsulation, OnDestroy} from '@angular/core';

@Component({
  selector: 'app-page404',
  templateUrl: './page404.component.html',
  styleUrls: ['./page404.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class Page404Component implements OnInit, OnDestroy {

    bodyTag: HTMLBodyElement = document.getElementsByTagName('body')[0];

    constructor() { }

    ngOnInit() {
        this.bodyTag.classList.add('videonoise');
    }

    ngOnDestroy() {
        this.bodyTag.classList.remove('videonoise');    
    }

}
