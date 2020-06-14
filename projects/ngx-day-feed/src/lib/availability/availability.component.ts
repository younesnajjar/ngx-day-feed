import {Component, Input, OnInit} from '@angular/core';
import {EmitterService} from 'ngx-day-feed/services/emitter.service';

@Component({
  selector: 'ngx-availability',
  template: `
    <div (click)="itemClick()" [style.height]="height + '%'" class="one-availability-container" [style.top]="top + '%'">
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
  @Input() index: number;

  constructor(private emitterService: EmitterService) {
  }

  ngOnInit() {
  }

  itemClick() {
    this.emitterService.itemClick(this.index);
  }
}
