import {AfterContentInit, Component, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList} from '@angular/core';
import {AvailabilityComponent} from './availability/availability.component';
import {EmitterService} from 'ngx-day-feed/services/emitter.service';
import {DayFeedConfig} from 'ngx-day-feed/models/config.model';
import {setItemNeededValues} from 'ngx-day-feed/utils/defaults-setter';
import {ItemConfig} from 'ngx-day-feed/models/item-config.model';

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
  styleUrls: ['./ngx-day-feed.component.scss']
})
export class NgxDayFeedComponent implements OnInit, AfterContentInit {

  @ContentChildren(AvailabilityComponent) inputTabs: QueryList<AvailabilityComponent>;

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
    const items: AvailabilityComponent[] = this.inputTabs.toArray();
    this.inputTabs.changes.subscribe(() => {
      this.change(this.inputTabs.toArray());
    });
    this.change(items);

  }

  setLimits(items: AvailabilityComponent[]) {
    let min = Infinity;
    let max = -Infinity;
    for (const item of items) {
      if (item.itemConfig.startHour < min) {
        min = item.itemConfig.startHour;
      }
      if (item.itemConfig.endHour > max) {
        max = item.itemConfig.endHour;
      }
    }
    this.minHour = (this.config.hours.min) ? this.config.hours.min : min;
    this.maxHour = (this.config.hours.max) ? this.config.hours.max + 1 : max + 1;
  }

  change(items: AvailabilityComponent[]) {

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

  sortItems(items) {
    items.sort((item1, item2) => {
      const startDiff: number = (item2.itemConfig.startHour - item1.itemConfig.startHour) * 60
        + (item2.itemConfig.startMinute - item1.itemConfig.startMinute);
      const endDiff: number = (item2.itemConfig.endHour - item1.itemConfig.endHour) * 60
        + (item2.itemConfig.endMinute - item1.itemConfig.endMinute);
      if (endDiff === 0) {
        return startDiff;
      }
      return endDiff;
    });
  }

  setTotalMinutes() {
    this.totalMinutes = (this.maxHour - this.minHour) * 60;
  }

  setBasicInfo(items: AvailabilityComponent[]) {
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

  setHorizontalDimensions(items: AvailabilityComponent[]) {
    // Setting Horizontal Dimensions 'width related to count' && 'left related to position'

    items.forEach((item, index, mItems) => {
      const intersectedItems = this.getIntersectedItems(item, mItems);
      const notParallelCount = this.getNotInersectedCount(intersectedItems);
      const count = intersectedItems.length - notParallelCount + 1;
      const position = this.getPosition(intersectedItems);
      item.dimensions.count = count;
      item.dimensions.position = position;
    });

  }

  setStandardWidth(items: AvailabilityComponent[]) {
    const itemsParallels: { item: AvailabilityComponent, intersectedItems: AvailabilityComponent[] }[] = [];
    items.sort((item1, item2) => -item1.dimensions.position + item2.dimensions.position);
    items.forEach((item, index) => {
      item.sortIndex = index;
    });
    items.forEach((item, index, mItems) => {
      const intersectedItems = this.getIntersectedItems(item, mItems);
      const maxCount = this.getMaxCount([item, ...intersectedItems]);
      item.dimensions.width = ((100 - (maxCount - 1) * item.gap) / maxCount);
      item.dimensions.left = ((100 - (maxCount - 1) * item.gap) / maxCount) * (item.dimensions.position - 1)
        + (item.dimensions.position - 1) * item.gap;

      [item, ...intersectedItems].forEach((mItem) => {
        mItem.dimensions.count = maxCount;
      });
      itemsParallels.push({item, intersectedItems});
    });

    itemsParallels.forEach((item) => {
      const span = this.getSpan(item.item, item.intersectedItems);
      if (span > 1) {
        const array = this.getItemsToExpand(item.item, item.intersectedItems, itemsParallels);
        console.log(array.map((it) => {
          return (it.map(itm => itm.index));
        }));
        array.reverse();
        const count = array.length + 1;
        items[item.item.sortIndex].dimensions.preWidth = items[item.item.sortIndex].dimensions.width;
        items[item.item.sortIndex].dimensions.width = this.getWidth(items[item.item.sortIndex], count, span);
        items[item.item.sortIndex].dimensions.left = this.getLeft(items[item.item.sortIndex], count, span, array.length);

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

  getWidth(item: AvailabilityComponent, count, span) {
    return ((count + span - 1) * item.dimensions.width + (span - 1) * item.gap) / count;
  }

  getLeft(item: AvailabilityComponent, count, span, i: number) {
    const left = item.dimensions.left;

    return left + (count - (i + 1) + 1) * (item.dimensions.preWidth - item.dimensions.width)
      + (span - 1) * (item.dimensions.preWidth + item.gap);
  }

  getSpan(item: AvailabilityComponent, itemParallels: AvailabilityComponent[]): number {
    const positions = itemParallels.map((it) => it.dimensions.position);
    // console.log(positions);
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

  getItemArrayIndexByItemIndex(items: AvailabilityComponent[], item: AvailabilityComponent) {
    return items.findIndex((mItem) => mItem.index === item.index);
  }

  getItemsToExpand(item: AvailabilityComponent,
                   itemParallels: AvailabilityComponent[],
                   itemsParallels: { item: AvailabilityComponent, intersectedItems: AvailabilityComponent[] }[]) {

    const parallelArrays = [];
    const blackList = [];
    for (let i = item.dimensions.position - 1; i >= 1; i--) {
      const currentPositionItems = this.findItemsByPosition(itemParallels, i);
      if (currentPositionItems.length > 0) {
        const positionItems: AvailabilityComponent[] = [];
        for (const postionItem of currentPositionItems) {
          const a = itemsParallels[postionItem.sortIndex].intersectedItems
            .filter((mItem) => mItem.dimensions.position > postionItem.dimensions.position);
          const b = itemParallels
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

  hasParallel(items: AvailabilityComponent[], item2: AvailabilityComponent) {
    if (this.getIntersectedItems(item2, items).length > 0) {
      return true;
    }
    return false;
  }

  findItemsByPosition(items: AvailabilityComponent[], position: number) {
    const positionItems = [];
    for (const item of items) {
      if (item.dimensions.position === position) {
        positionItems.push(item);
      }
    }
    return positionItems;
  }

  getMaxCount(items: AvailabilityComponent[]) {
    let max = 0;
    for (const item of items) {
      if (item.dimensions.count > max) {
        max = item.dimensions.count;
      }
    }
    return max;
  }

  getIntersectedItems(currentItem: AvailabilityComponent, items: AvailabilityComponent[]): AvailabilityComponent[] {
    return items.filter((item) => {
      return currentItem.index !== item.index && item.dimensions.top < currentItem.dimensions.top + currentItem.dimensions.height
        && item.dimensions.top + item.dimensions.height > currentItem.dimensions.top;
    });
  }

  getNotInersectedCount(items: AvailabilityComponent[]): number {
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

  private getPosition(items: AvailabilityComponent[]) {
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
