import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { PageModule } from './page/page.module';
import { PageSharedModule } from './page/shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    PageModule,
    PageSharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
