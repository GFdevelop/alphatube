import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './page/home/home.component';
import { VideopageComponent } from './page/videopage/videopage.component';
import { SearchComponent } from './page/search/search.component';
import { AboutComponent } from './page/about/about.component';
import { Page404Component } from './page/page404/page404.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'videopage/:videoId', component: VideopageComponent },
  { path: 'search/:q', component: SearchComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', component: Page404Component }     // this must be the last!!!
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
