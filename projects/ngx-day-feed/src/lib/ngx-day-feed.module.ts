import {NgModule} from '@angular/core';
import {NgxDayFeedComponent} from './ngx-day-feed.component';
import {CommonModule} from '@angular/common';
import {AvailabilityComponent} from './availability/availability.component';
import {EmitterService} from 'ngx-day-feed/services/emitter.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {VarDirective} from 'ngx-day-feed/directives/var.directive';


@NgModule({
  declarations: [NgxDayFeedComponent, AvailabilityComponent, VarDirective],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
  exports: [NgxDayFeedComponent, AvailabilityComponent],
  providers: [EmitterService]
})
export class NgxDayFeedModule {
}
