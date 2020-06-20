import {AfterContentInit, Component, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList} from '@angular/core';
import {CalendarItemComponent} from './calendar-item/calendar-item.component';
import {EmitterService} from 'ngx-day-feed/services/emitter.service';
import {DayFeedConfig} from 'ngx-day-feed/models/config.model';
import {setItemNeededValues} from 'ngx-day-feed/utils/defaults-setter';
import {ItemConfig} from 'ngx-day-feed/models/item-config.model';
import {generateHours} from 'ngx-day-feed/utils/setters';

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
      this.hours = generateHours(this.minHour, this.maxHour, 60);
      this.setBasicInfo(items);
      this.sortItems(items);
      this.setHorizontalDimensions(items);
      this.sortByPosition(items);
      this.setStandardWidth(items);
      this.setFlexedWidth(items);
    });
  }

  update() {
    this.change(this.inputTabs.toArray());
  }

  sortByPosition(items: CalendarItemComponent[]) {
    items.sort((item1, item2) => item2.dimensions.position - item1.dimensions.position);
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
      const horizontalIntersectedItems = this.getHorizontalIntersectedItems(item, mItems);
      const verticalLinksCount = this.getVerticalLinksCount(horizontalIntersectedItems);

      item.horizontalIntersectedItems = horizontalIntersectedItems;
      item.dimensions.count = horizontalIntersectedItems.length - verticalLinksCount + 1;
      item.dimensions.position = this.getFirstAvailablePosition(horizontalIntersectedItems);
    });
  }

  setStandardWidth(items: CalendarItemComponent[]) {
    items.forEach((item, index) => {
      item.sortIndex = index;
      const maxCount = this.getMaxCount([item, ...item.horizontalIntersectedItems]);
      item.dimensions.width = ((100 - (maxCount - 1) * item.gap) / maxCount);
      item.dimensions.left = ((100 - (maxCount - 1) * item.gap) / maxCount) * (item.dimensions.position - 1)
        + (item.dimensions.position - 1) * item.gap;

      [item, ...item.horizontalIntersectedItems].forEach((mItem) => {
        mItem.dimensions.count = maxCount;
      });
    });
  }

  setFlexedWidth(items: CalendarItemComponent[]) {
    items.forEach((item) => {
      const span = this.getSpan(item, item.horizontalIntersectedItems);
      if (span > 1) {
        const itemsToExpand = this.getItemsToExpand(item, items, span);
        const count = itemsToExpand.length + 1;
        items[item.sortIndex].dimensions.preWidth = items[item.sortIndex].dimensions.width;
        items[item.sortIndex].dimensions.width = this.getWidth(items[item.sortIndex], count, span);
        items[item.sortIndex].dimensions.left = this.getLeft(items[item.sortIndex], count, span, itemsToExpand.length);

        for (let i = 0; i < itemsToExpand.length; i++) {
          for (const it of itemsToExpand[i]) {
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

  getItemsToExpand(item: CalendarItemComponent, items: CalendarItemComponent[], span: number) {

    const parallelArrays = [];
    const blackList = [];
    for (let currentPosition = item.dimensions.position - 1; currentPosition >= 1; currentPosition--) {
      // Horizontal Intersected Items that comes before the the candidate item (position < current)
      // Interval(X: CalendarItemComponent): between X.position AND item.position
      const currentPositionItems = this.findItemsByPosition(item.horizontalIntersectedItems, currentPosition);
      if (currentPositionItems.length > 0) {
        const positionItems: CalendarItemComponent[] = [];
        const itemIntervalHorizontalItems =
          this.getIntervalItems(item.horizontalIntersectedItems, currentPosition + 1, item.dimensions.position + span);
        for (const positionItem of currentPositionItems) {

          const positionItemIntervalHorizontalItems =
            this.getIntervalItems(
              items[positionItem.sortIndex].horizontalIntersectedItems,
              currentPosition + 1,
              item.dimensions.position + span);

          const positionIntervalHorizontalItemsCount = positionItemIntervalHorizontalItems.length;
          const itemIntervalHorizontalItemsCount = itemIntervalHorizontalItems.length + 1;
          if (!this.hasParallel(blackList, positionItem)) {
            if (positionIntervalHorizontalItemsCount <= itemIntervalHorizontalItemsCount) {
              positionItems.push(positionItem);
            } else {
              blackList.push(positionItem);
            }
          } else {
            blackList.push(positionItem);
          }
        }
        if (positionItems.length > 0) {
          parallelArrays.push(positionItems);
        } else {
          break;
        }

      }
    }
    return parallelArrays.reverse();

  }

  getIntervalItems(items: CalendarItemComponent[], firstPosition, lastPosition) {
    return items
      .filter(
        (item) =>
          item.dimensions.position >= firstPosition && item.dimensions.position <= lastPosition
      );
  }

  hasParallel(items: CalendarItemComponent[], item2: CalendarItemComponent) {
    return this.getHorizontalIntersectedItems(item2, items).length > 0;

  }

  findItemsByPosition(items: CalendarItemComponent[], position: number) {
    // Finding Intersected items by position
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

  getHorizontalIntersectedItems(currentItem: CalendarItemComponent, items: CalendarItemComponent[]): CalendarItemComponent[] {
    return items.filter((item) => {
      return currentItem.index !== item.index && item.dimensions.top < currentItem.dimensions.top + currentItem.dimensions.height
        && item.dimensions.top + item.dimensions.height > currentItem.dimensions.top;
    });
  }

  getVerticalLinksCount(items: CalendarItemComponent[]): number {
    // Get the number of vertically aligned items Links (Ex: 1 <-> 2 <-> 5 <-> 6, 3 <-> 4 links: 4)

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

  private getFirstAvailablePosition(items: CalendarItemComponent[]) {
    let firstAvailablePosition = 1;
    let alreadyUsedPositions = items.filter((item) => item.dimensions.position)
      .map((item) => item.dimensions.position)
      .sort((position1, position2) => position1 - position2);
    alreadyUsedPositions = alreadyUsedPositions.filter((position, i) => alreadyUsedPositions.indexOf(position) === i);
    for (const usedPosition of alreadyUsedPositions) {
      if (firstAvailablePosition === usedPosition) {
        firstAvailablePosition++;
      } else {
        break;
      }
    }
    return firstAvailablePosition;
  }

  ngOnInit() {
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
