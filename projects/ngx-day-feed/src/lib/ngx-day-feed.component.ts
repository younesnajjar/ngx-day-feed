import {AfterContentInit, Component, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList} from '@angular/core';
import {AvailabilityComponent} from './availability/availability.component';
import {EmitterService} from 'ngx-day-feed/services/emitter.service';
import {DayFeedConfig} from 'ngx-day-feed/models/config.model';

@Component({
  selector: 'ngx-day-feed',
  template: `

    <div class="feed-container">
      <div class="hours-container">
        <div *ngFor="let hour of hours; let i = index" class="feed-moment">
          {{ hourFormatter(hour) }}
        </div>
      </div>

      <div class="availabilities-container">
        <ng-content></ng-content>
      </div>
    </div>

  `,
  styleUrls: ['./ngx-day-feed.component.scss']
})
export class NgxDayFeedComponent implements OnInit, AfterContentInit {
  @ContentChildren(AvailabilityComponent) inputTabs: QueryList<AvailabilityComponent>;

  @Output() itemClick = new EventEmitter<{ index: number }>();

  @Input() minHour = 8;
  @Input() maxHour = 21;
  @Input() config: DayFeedConfig;

  public hours: string[];


  constructor(private emitterService: EmitterService) {
    this.setItemClickEvent();
  }


  ngAfterContentInit(): void {
    this.setTopDistances();
  }

  setTopDistances() {
    setTimeout(() => {
      this.inputTabs.forEach((item, index) => {
        const totalMinutes: number = (this.maxHour - this.minHour) * 60;
        item.index = index;
        item.startMinute = (item.startMinute) ? item.startMinute : 0;
        item.endMinute = (item.endMinute) ? item.endMinute : 0;
        item.top = ((item.startHour - this.minHour) * 60 + item.startMinute) / totalMinutes * 100;
        item.height = ((item.endHour - item.startHour) * 60 + item.endMinute - item.startMinute) / totalMinutes * 100;
      });
    });

  }

  ngOnInit() {
    this.generateHours(this.minHour, this.maxHour, 60);
  }

  private generateHours(startHour: number, endHour: number, stepSizeMinutes: number) {
    const hours: string[] = [];
    let i = startHour * 60;
    while (i < endHour * 60) {
      hours.push(('0' + Math.floor(i / 60)).slice(-2) + ':' + ('0' + (i % 60)).slice(-2));
      i = i + stepSizeMinutes;
    }
    this.hours = hours;
  }

  setItemClickEvent() {
    this.emitterService.itemClick$.subscribe((i) => {
      this.itemClick.emit({index: i});
    });
  }

  hourFormatter(hour: string) {
    const {hours} = this.config;
    return (hours.callback) ? hours.callback(hour) : hour;
  }

}
