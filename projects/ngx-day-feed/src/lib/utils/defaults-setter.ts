import {AvailabilityComponent} from 'ngx-day-feed/availability/availability.component';
import {DayFeedConfig} from 'ngx-day-feed/models';
import {defaultConfig} from 'ngx-day-feed/utils/default-config';
import {ItemConfig} from 'ngx-day-feed/models/item-config.model';

export function setItemNeededValues(item: AvailabilityComponent, config: DayFeedConfig) {
  const itemConfig: ItemConfig = item.itemConfig;
  itemConfig.startMinute = (itemConfig.startMinute) ? itemConfig.startMinute : 0;
  itemConfig.endMinute = (itemConfig.endMinute) ? itemConfig.endMinute : 0;
  item.gap = (config.display.gap) ? config.display.gap : defaultConfig.display.gap;
  item.backgroundColor = (itemConfig.backgroundColor) ? itemConfig.backgroundColor : (config.display.itemsBackGroundColor)
    ? config.display.itemsBackGroundColor
    : defaultConfig.display.itemsBackGroundColor;
}
