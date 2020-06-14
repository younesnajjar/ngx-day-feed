import {NgModule} from '@angular/core';
import {NgxDayFeedComponent} from './ngx-day-feed.component';
import {CommonModule} from '@angular/common';
import {AvailabilityComponent} from './availability/availability.component';
import {EmitterService} from 'ngx-day-feed/services/emitter.service';


@NgModule({
  declarations: [NgxDayFeedComponent, AvailabilityComponent],
  imports: [
    CommonModule
  ],
  exports: [NgxDayFeedComponent, AvailabilityComponent],
  providers: [EmitterService]
})
export class NgxDayFeedModule {
}
