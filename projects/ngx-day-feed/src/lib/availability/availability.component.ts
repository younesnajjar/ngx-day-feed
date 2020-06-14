import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ngx-availability',
  template: `
    <div [style.height]="height + '%'" class="one-availability-container" [style.top]="top + '%'">
      <div class="availability-content">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styleUrls: ['./availability.component.scss']
})
export class AvailabilityComponent implements OnInit {
  @Input() startHour: number;
  @Input() endHour: number;
  @Input() top: number;
  @Input() height: number;

  constructor() {
  }

  ngOnInit() {
  }

}
