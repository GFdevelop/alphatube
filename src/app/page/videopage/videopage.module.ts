import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TabsModule } from 'ngx-bootstrap/tabs';
import { CarouselModule } from 'ngx-bootstrap/carousel';

import { VideopageComponent } from './videopage.component';
import { RecommenderComponent } from './recommender/recommender.component';
import { PlayerComponent } from './player/player.component'
import { WikiboxComponent } from './wikibox/wikibox.component';

@NgModule({
  declarations: [VideopageComponent, RecommenderComponent, PlayerComponent, WikiboxComponent],
  imports: [
	TabsModule.forRoot(),
    CarouselModule.forRoot(),
    CommonModule,
    RouterModule
  ]
})

export class VideopageModule { }
