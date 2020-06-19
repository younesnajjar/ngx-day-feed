import {NgModule} from '@angular/core';
import {NgxDayCalendarComponent} from './ngx-day-calendar.component';
import {CommonModule} from '@angular/common';
import {CalendarItemComponent} from './calendar-item/calendar-item.component';
import {EmitterService} from 'ngx-day-feed/services/emitter.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {VarDirective} from 'ngx-day-feed/directives/var.directive';


@NgModule({
  declarations: [NgxDayCalendarComponent, CalendarItemComponent, VarDirective],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
  exports: [NgxDayCalendarComponent, CalendarItemComponent],
  providers: [EmitterService]
})
export class NgxDayCalendarModule {
}
