import {AfterContentInit, Component, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList} from '@angular/core';
import {AvailabilityComponent} from './availability/availability.component';
import {EmitterService} from 'ngx-day-feed/services/emitter.service';

@Component({
  selector: 'ngx-day-feed',
  template: `

    <div class="feed-container">
      <div class="hours-container">
        <div *ngFor="let hour of hours; let i = index" class="feed-moment">
          {{ hour }}
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
        item.index = index;
        item.top = (item.startHour - this.minHour) / (this.maxHour - this.minHour) * 100;
        item.height = (item.endHour - item.startHour) / (this.maxHour - this.minHour) * 100;
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

}
