import {NgModule} from '@angular/core';
import {NgxDayFeedComponent} from './ngx-day-feed.component';
import {CommonModule} from '@angular/common';
import {FeedItemComponent} from './feed-item/feed-item.component';
import {EmitterService} from './services/emitter.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';


@NgModule({
  declarations: [NgxDayFeedComponent, FeedItemComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
  exports: [NgxDayFeedComponent, FeedItemComponent],
  providers: [EmitterService]
})
export class NgxDayFeedModule {
}
