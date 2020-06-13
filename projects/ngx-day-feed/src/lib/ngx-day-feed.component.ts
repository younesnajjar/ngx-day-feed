import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'lib-ngx-day-feed',
  template: `

    <div class="feed-container">
      <div *ngFor="let hour of hours; let i = index" class="feed-moment">
        <div>{{ hour }}</div>
      </div>
    </div>

  `,
  styleUrls: ['./ngx-day-feed.component.scss']
})
export class NgxDayFeedComponent implements OnInit {
  @Input() startTime = 8;
  @Input() endTime = 20;
  hours: string[];

  constructor() {
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
