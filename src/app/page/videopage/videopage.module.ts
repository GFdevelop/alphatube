import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { TabsModule } from 'ngx-bootstrap/tabs';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { CarouselModule } from 'ngx-bootstrap/carousel';

import { VideopageComponent } from './videopage.component';
import { RecommenderComponent } from './recommender/recommender.component';
import { PlayerComponent } from './player/player.component';
import { WikiboxComponent } from './wikibox/wikibox.component';
import { YtPlayerModule } from 'ngx-ytplayer';

@NgModule({
  declarations: [VideopageComponent, RecommenderComponent, PlayerComponent, WikiboxComponent],
  imports: [
    TabsModule.forRoot(),
    AccordionModule.forRoot(),
    CarouselModule.forRoot(),
    CommonModule,
    RouterModule,
    FormsModule,
    YtPlayerModule
  ]
})

export class VideopageModule { }
