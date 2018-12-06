import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideopageComponent } from './videopage.component';
import { RecommenderComponent } from './recommender/recommender.component';
import { PlayerComponent } from './player/player.component'
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [VideopageComponent, RecommenderComponent, PlayerComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class VideopageModule { }
