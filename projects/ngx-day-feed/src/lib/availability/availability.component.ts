import {Component, HostListener, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {EmitterService} from 'ngx-day-feed/services/emitter.service';
import {growAnimation} from 'ngx-day-feed/animations/grow.animation';
import {ItemConfig} from 'ngx-day-feed/models/item-config.model';

@Component({
  selector: 'ngx-availability',
  template: `
    <div [@Grow]="!itemConfig.disableNewAnimation && stateGrow" (click)="itemClick()"
         class="one-availability-container horizontal-animation"
         [style.width]=""
         [style.left]=""
         [ngStyle]="{
            'opacity': (isHovered) ? itemConfig.hoverOpacity : itemConfig.opacity,
            'height': dimensions.height + '%',
            'top': dimensions.top + '%',
            'width': ((100 - (dimensions.count - 1)  * gap ) / dimensions.count) + '%',
            'left': ((100 - (dimensions.count - 1) * gap) / dimensions.count) * (dimensions.position - 1)
                                                                                + (dimensions.position - 1) * gap + '%'}"
         [ngClass]="{'hover-animation': !itemConfig.disableHoverAnimation,
                       'full-animation': activateUpdateAnimation}"
    >
      <div class="availability-content"
           [ngStyle]="{
            'background': itemConfig.backgroundColor
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
export class AvailabilityComponent implements OnInit, OnChanges {

  @Input() itemConfig: ItemConfig;
  @Input() dimensions: { top?: number, height?: number, count?: number, position?: number, span?: number };
  @Input() index: number;
  @Input() gap: number;


  private stateGrow: string;
  public isHovered: boolean;
  private activateUpdateAnimation: boolean;

  constructor(private emitterService: EmitterService) {

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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.itemConfig && changes.itemConfig.previousValue) {
      this.activateUpdateAnimation = true;
    }
  }

  ngOnInit() {
    setTimeout(() => {
      this.stateGrow = 'active';
    });
  }

  itemClick() {
    this.emitterService.itemClick(this.index);
  }

  @HostListener('mouseover') mouseOver() {
    this.isHovered = true;
  }

  @HostListener('mouseout') mouseOut() {
    this.isHovered = false;
  }
}
