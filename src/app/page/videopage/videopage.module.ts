import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { VideopageComponent } from './videopage.component';
import { WikiboxComponent } from './wikibox/wikibox.component';

@NgModule({
  declarations: [VideopageComponent, WikiboxComponent],
  imports: [
	TabsModule.forRoot(),
    CommonModule,
    RouterModule
  ]
})
export class VideopageModule { }
