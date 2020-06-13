import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'lib-availability',
  template: `
    <div class="one-availability-container" [style.top]="top + '%'">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./availability.component.css']
})
export class AvailabilityComponent implements OnInit {
  @Input() startHour: number;
  @Input() endHour: number;
  @Input() top: number;
  constructor() { }
  test() {
    console.log('Hello Boy' + this.startHour);
  }
  ngOnInit() {
  }

}
