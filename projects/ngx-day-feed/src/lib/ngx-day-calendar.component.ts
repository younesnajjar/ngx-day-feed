import {AfterContentInit, Component, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList} from '@angular/core';
import {CalendarItemComponent} from './calendar-item/calendar-item.component';
import {EmitterService} from 'ngx-day-feed/services/emitter.service';
import {DayFeedConfig} from 'ngx-day-feed/models/config.model';
import {setItemNeededValues} from 'ngx-day-feed/utils/defaults-setter';
import {ItemConfig} from 'ngx-day-feed/models/item-config.model';
import {ItemParallels} from 'ngx-day-feed/models/types';

@Component({
  selector: 'ngx-day-feed',
  template: `

    <div class="feed-container">
      <div class="hours-container">
        <div *ngFor="let hour of hours; let i = index" class="feed-moment">
          <div>          {{ hourFormatter(hour) }} </div>
        </div>
      </div>

      <div class="availabilities-container">
        <ng-content></ng-content>
      </div>
    </div>

  `,
  styleUrls: ['./ngx-day-calendar.component.scss']
})
export class NgxDayCalendarComponent implements OnInit, AfterContentInit {

  @ContentChildren(CalendarItemComponent) inputTabs: QueryList<CalendarItemComponent>;

  @Input() config: DayFeedConfig;

  @Output() itemClick = new EventEmitter<{ index: number }>();
  public hours: string[];
  private minHour = 5;
  private totalMinutes: number;
  private maxHour = 21;


  constructor(private emitterService: EmitterService) {
    this.setItemClickEvent();
  }


  ngAfterContentInit(): void {
    const items: CalendarItemComponent[] = this.inputTabs.toArray();
    this.inputTabs.changes.subscribe(() => {
      this.change(this.inputTabs.toArray());
    });
    this.change(items);

  }

  setLimits(items: CalendarItemComponent[]) {
    let min = Infinity;
    let max = -Infinity;
    if (!this.config.hours.min || !this.config.hours.max) {
      for (const item of items) {
        if (item.itemConfig.startHour < min) {
          min = item.itemConfig.startHour;
        }
        if (item.itemConfig.endHour > max) {
          max = item.itemConfig.endHour;
        }
      }
    }
    this.minHour = (this.config.hours.min) ? this.config.hours.min : min;
    this.maxHour = (this.config.hours.max) ? this.config.hours.max + 1 : max + 1;
  }

  change(items: CalendarItemComponent[]) {

    setTimeout(() => {
      this.setLimits(items);
      this.setTotalMinutes();
      this.generateHours(this.minHour, this.maxHour, 60);
      this.setBasicInfo(items);
      this.sortItems(items);
      this.setHorizontalDimensions(items);
      this.setStandardWidth(items);
    });
  }

  update() {
    this.change(this.inputTabs.toArray());
  }

  sortItems(items: CalendarItemComponent[]) {
    items.sort((item1, item2) => {
      const startDiff: number = item2.dimensions.top - item1.dimensions.top;
      const endDiff: number = (item2.dimensions.top + item2.dimensions.height) - (item1.dimensions.top + item1.dimensions.height);
      if (endDiff === 0) {
        return startDiff;
      }
      return endDiff;
    });
  }

  setTotalMinutes() {
    this.totalMinutes = (this.maxHour - this.minHour) * 60;
  }

  setBasicInfo(items: CalendarItemComponent[]) {
    // Setting the availability Index
    // Setting Vertical Dimensions 'height' && 'top'

    items.forEach((item, index) => {
      const itemConfig: ItemConfig = item.itemConfig;
      setItemNeededValues(item, this.config);
      item.index = index;
      item.dimensions = {
        top: ((itemConfig.startHour - this.minHour) * 60 + itemConfig.startMinute) / this.totalMinutes * 100,
        height: ((itemConfig.endHour - itemConfig.startHour) * 60 + itemConfig.endMinute - itemConfig.startMinute)
          / this.totalMinutes * 100,
      };
    });
  }

  setHorizontalDimensions(items: CalendarItemComponent[]) {
    // Setting Horizontal Dimensions 'width related to count' && 'left related to position'

    items.forEach((item, index, mItems) => {
      const intersectedItems = this.getIntersectedItems(item, mItems);
      const notParallelCount = this.getNotInersectedCount(intersectedItems);

      item.dimensions.count = intersectedItems.length - notParallelCount + 1;
      item.dimensions.position = this.getPosition(intersectedItems);
    });

  }

  setStandardWidth(items: CalendarItemComponent[]) {
    const itemsParallels: ItemParallels[] = [];
    items.sort((item1, item2) => -item1.dimensions.position + item2.dimensions.position);
    items.forEach((item, index, mItems) => {
      item.sortIndex = index;
      const intersectedItems = this.getIntersectedItems(item, mItems);
      const maxCount = this.getMaxCount([item, ...intersectedItems]);
      item.dimensions.width = ((100 - (maxCount - 1) * item.gap) / maxCount);
      item.dimensions.left = ((100 - (maxCount - 1) * item.gap) / maxCount) * (item.dimensions.position - 1)
        + (item.dimensions.position - 1) * item.gap;

      [item, ...intersectedItems].forEach((mItem) => {
        mItem.dimensions.count = maxCount;
      });
      // itemsParallels.push({item, intersectedItems});
      item.intersectedItems = intersectedItems;
    });

    items.forEach((item) => {
      const span = this.getSpan(item, item.intersectedItems);
      if (span > 1) {
        const array = this.getItemsToExpand(item, items);
        array.reverse();
        const count = array.length + 1;
        items[item.sortIndex].dimensions.preWidth = items[item.sortIndex].dimensions.width;
        items[item.sortIndex].dimensions.width = this.getWidth(items[item.sortIndex], count, span);
        items[item.sortIndex].dimensions.left = this.getLeft(items[item.sortIndex], count, span, array.length);

        for (let i = 0; i < array.length; i++) {
          for (const it of array[i]) {
            items[it.sortIndex].dimensions.preWidth = items[it.sortIndex].dimensions.width;
            items[it.sortIndex].dimensions.width = this.getWidth(it, count, span);
            items[it.sortIndex].dimensions.left = this.getLeft(it, count, span, i);
          }
        }
      }
    });
  }

  getWidth(item: CalendarItemComponent, count, span) {
    return ((count + span - 1) * item.dimensions.width + (span - 1) * item.gap) / count;
  }

  getLeft(item: CalendarItemComponent, count, span, i: number) {
    const left = item.dimensions.left;

    return left + (count - (i + 1) + 1) * (item.dimensions.preWidth - item.dimensions.width)
      + (span - 1) * (item.dimensions.preWidth + item.gap);
  }

  getSpan(item: CalendarItemComponent, itemParallels: CalendarItemComponent[]): number {
    const positions = itemParallels.map((it) => it.dimensions.position);
    let span = 1;
    for (let i = item.dimensions.position + 1; i <= item.dimensions.count; i++) {
      if (!positions.includes(i)) {
        span = span + 1;
      } else {
        return span;
      }
    }
    return span;
  }

  getItemsToExpand(item: CalendarItemComponent,
                   items: CalendarItemComponent[]) {

    const parallelArrays = [];
    const blackList = [];
    for (let i = item.dimensions.position - 1; i >= 1; i--) {
      const currentPositionItems = this.findItemsByPosition(item.intersectedItems, i);
      if (currentPositionItems.length > 0) {
        const positionItems: CalendarItemComponent[] = [];
        for (const postionItem of currentPositionItems) {
          const a = items[postionItem.sortIndex].intersectedItems
            .filter((mItem) => mItem.dimensions.position > postionItem.dimensions.position);
          const b = item.intersectedItems
            .filter((mItem) => mItem.dimensions.position > postionItem.dimensions.position);
          const counta = a.length;
          const countb = b.length + 1;
          if (!this.hasParallel(blackList, postionItem)) {
            if (counta <= countb) {
              positionItems.push(postionItem);
            } else {
              blackList.push(postionItem);
            }
          }


        }
        if (positionItems.length > 0) {
          parallelArrays.push(positionItems);
        }

      }
    }
    return parallelArrays;

  }

  hasParallel(items: CalendarItemComponent[], item2: CalendarItemComponent) {
    if (this.getIntersectedItems(item2, items).length > 0) {
      return true;
    }
    return false;
  }

  findItemsByPosition(items: CalendarItemComponent[], position: number) {
    const positionItems = [];
    for (const item of items) {
      if (item.dimensions.position === position) {
        positionItems.push(item);
      }
    }
    return positionItems;
  }

  getMaxCount(items: CalendarItemComponent[]) {
    let max = 0;
    for (const item of items) {
      if (item.dimensions.count > max) {
        max = item.dimensions.count;
      }
    }
    return max;
  }

  getIntersectedItems(currentItem: CalendarItemComponent, items: CalendarItemComponent[]): CalendarItemComponent[] {
    return items.filter((item) => {
      return currentItem.index !== item.index && item.dimensions.top < currentItem.dimensions.top + currentItem.dimensions.height
        && item.dimensions.top + item.dimensions.height > currentItem.dimensions.top;
    });
  }

  getNotInersectedCount(items: CalendarItemComponent[]): number {
    let count = 0;
    const forbiddenListIndexes: number[] = [];
    for (let i = 0; i < items.length; i++) {
      for (let j = i + 1; j < items.length; j++) {
        if ((items[j].dimensions.top >= items[i].dimensions.top + items[i].dimensions.height
          || items[j].dimensions.top + items[j].dimensions.height <= items[i].dimensions.top) && !forbiddenListIndexes.includes(j)) {
          forbiddenListIndexes.push(j);
          count++;
          break;
        }
      }
    }

    return count;
  }

  private getPosition(items: CalendarItemComponent[]) {
    let position = 1;
    let positions = items.filter((item) => item.dimensions.position)
      .map((item) => item.dimensions.position)
      .sort((position1, position2) => position1 - position2);
    positions = positions.filter((arrayPosition, i) => positions.indexOf(arrayPosition) === i);
    for (const arrayPosition of positions) {
      if (arrayPosition) {
        if (position === arrayPosition) {
          position++;
        } else {
          break;
        }
      }
    }
    if (items.length > 0 && position === items[items.length - 1].dimensions.position) {
      return position + 1;
    }
    return position;
  }

  ngOnInit() {
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

  hourFormatter(hour: string) {
    const {hours} = this.config;
    return (hours.callback) ? hours.callback(hour) : hour;
  }


}
