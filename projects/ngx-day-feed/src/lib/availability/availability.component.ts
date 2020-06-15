import {Component, Input, OnInit} from '@angular/core';
import {EmitterService} from 'ngx-day-feed/services/emitter.service';
import {growAnimation} from 'ngx-day-feed/animations/grow.animation';

@Component({
  selector: 'ngx-availability',
  template: `
    <div [@Grow]="stateGrow" (click)="itemClick()" [style.height]="dimensions.height + '%'"
         class="one-availability-container hover-animation"
         [style.top]="dimensions.top + '%'" [style.width]="90 / dimensions.count + '%'"
         [style.left]="(10 / dimensions.count )*(dimensions.position - 1) + (100 / dimensions.count) * (dimensions.position - 1) + '%'">
      <div class="availability-content">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styleUrls: ['./availability.component.scss'],
  animations: [
    growAnimation
  ]
})
export class AvailabilityComponent implements OnInit {
  @Input() startHour: number;
  @Input() startMinute: number;
  @Input() endHour: number;
  @Input() endMinute: number;
  @Input() dimensions: { top?: number, height?: number, count?: number, position?: number, span?: number };
  @Input() index: number;
  private stateGrow: string;

  constructor(private emitterService: EmitterService) {
    this.startMinute = 0;
    this.endMinute = 0;
    this.dimensions = {};
    this.stateGrow = 'inactive';
  }

  ngOnInit() {
    setTimeout(() => {
      this.stateGrow = 'active';
    });
  }

  itemClick() {
    this.emitterService.itemClick(this.index);
  }
}
