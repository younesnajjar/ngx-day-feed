import {NgModule} from '@angular/core';
import {NgxDayFeedComponent} from './ngx-day-feed.component';
import {CommonModule} from '@angular/common';
import {AvailabilityComponent} from './availability/availability.component';


@NgModule({
  declarations: [NgxDayFeedComponent, AvailabilityComponent],
  imports: [
    CommonModule
  ],
  exports: [NgxDayFeedComponent, AvailabilityComponent]
})
export class NgxDayFeedModule {
}
