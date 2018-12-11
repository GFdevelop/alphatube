import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Page404Component } from './page404.component';

import { RouterModule, Routes} from '@angular/router';

@NgModule({
  declarations: [Page404Component],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class Page404Module { }
