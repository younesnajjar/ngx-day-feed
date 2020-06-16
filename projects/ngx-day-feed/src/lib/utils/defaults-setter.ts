import {AvailabilityComponent} from 'ngx-day-feed/availability/availability.component';
import {DayFeedConfig} from 'ngx-day-feed/models';
import {defaultConfig} from 'ngx-day-feed/utils/default-config';

export function setItemNeededValues(item: AvailabilityComponent, config: DayFeedConfig) {
  item.startMinute = (item.startMinute) ? item.startMinute : 0;
  item.endMinute = (item.endMinute) ? item.endMinute : 0;
  item.gap = (config.display.gap) ? config.display.gap : defaultConfig.display.gap;
  item.backgroundColor = (config.display.itemsBackGroundColor)
    ? config.display.itemsBackGroundColor
    : defaultConfig.display.itemsBackGroundColor;
}
