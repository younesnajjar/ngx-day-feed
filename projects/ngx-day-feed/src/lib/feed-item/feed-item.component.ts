import {Component, HostListener, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {EmitterService} from '../services/emitter.service';
import {growAnimation} from '../animations/grow.animation';
import {ItemConfig} from '../models/item-config.model';

@Component({
  selector: 'ngx-feed-item',
  template: `
    <div [@Grow]="!itemConfig.disableNewAnimation && stateGrow" (click)="itemClick()"
         class="one-availability-container horizontal-animation"
         [style.width]=""
         [style.left]=""
         [ngStyle]="{
            'opacity': (isHovered) ? itemConfig.hoverOpacity : itemConfig.opacity,
            'height': dimensions.height + '%',
            'top': dimensions.top + '%',
            'width': dimensions.width + '%',
            'left': dimensions.left + '%'}"
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
  styleUrls: ['./feed-item.component.scss'],
  animations: [
    growAnimation
  ]
})
export class FeedItemComponent implements OnInit, OnChanges {

  @Input() itemConfig: ItemConfig;
  @Input() dimensions: {
    top?: number,
    height?: number,
    count?: number,
    position?: number,
    span?: number,
    left?: number,
    width?: number,
    preWidth?: number
  };
  @Input() index: number;
  @Input() sortIndex: number;
  @Input() gap: number;
  @Input() horizontalIntersectedItems: FeedItemComponent[];


  public stateGrow: string;
  public isHovered: boolean;
  public activateUpdateAnimation: boolean;

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
