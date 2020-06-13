import {AfterContentInit, Component, ContentChildren, Input, OnInit, QueryList} from '@angular/core';
import {AvailabilityComponent} from './availability/availability.component';

@Component({
  selector: 'lib-ngx-day-feed',
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
  public hours: string[];


  @Input() startTime = 8;
  @Input() endTime = 20;

  constructor() {
  }

  ngAfterContentInit(): void {
    this.setTopDistances();
  }

  setTopDistances() {
    this.inputTabs.forEach((item) => {
      item.top = (item.startHour - this.startTime) / (20 - 8) * 100;
    });
  }

  ngOnInit() {
    this.generateHours(this.startTime, this.endTime, 60);
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

}
