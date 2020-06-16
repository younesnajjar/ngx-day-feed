import {Component, Input, OnInit} from '@angular/core';
import {EmitterService} from 'ngx-day-feed/services/emitter.service';
import {growAnimation} from 'ngx-day-feed/animations/grow.animation';
import {BACKGROUND} from 'ngx-day-feed/utils/consts';
import {ItemConfig} from 'ngx-day-feed/models/item-config.model';

@Component({
  selector: 'ngx-availability',
  template: `
    <div [@Grow]="stateGrow" (click)="itemClick()"
         class="one-availability-container hover-animation"
         [style.width]=""
         [style.left]=""
         [ngStyle]="{
            'height': dimensions.height + '%',
            'top': dimensions.top + '%',
            'width': ((100 - (dimensions.count - 1)  * gap ) / dimensions.count) + '%',
            'left': ((100 - (dimensions.count - 1) * gap) / dimensions.count) * (dimensions.position - 1)
                                                                                + (dimensions.position - 1) * gap + '%'}"
    >
      <div class="availability-content"
           [ngStyle]="{
            'background': backgroundColor
      }">
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
  @Input() itemConfig: ItemConfig;
  @Input() dimensions: { top?: number, height?: number, count?: number, position?: number, span?: number };
  @Input() index: number;
  @Input() gap: number;
  @Input() backgroundColor: string = BACKGROUND;

  private stateGrow: string;

  constructor(private emitterService: EmitterService) {
    this.startMinute = 0;
    this.endMinute = 0;
    this.itemConfig = {
      startHour: 0,
      startMinute: 0,
      endHour: 0,
      endMinute: 0,
    };
    this.gap = 1;
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
