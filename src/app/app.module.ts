import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PageModule } from './page/page.module';
import { PageSharedModule } from './page/shared/shared.module';

import { LyricsService } from './services/lyrics/lyrics.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
    PageModule,
    PageSharedModule
  ],
  providers: [LyricsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
