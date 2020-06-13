import {NgModule} from '@angular/core';
import {NgxDayFeedComponent} from './ngx-day-feed.component';
import {CommonModule} from '@angular/common';


@NgModule({
  declarations: [NgxDayFeedComponent],
  imports: [
    CommonModule
  ],
  exports: [NgxDayFeedComponent]
})
export class NgxDayFeedModule {
}
