import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgxDayFeedModule} from 'ngx-day-feed';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxDayFeedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
