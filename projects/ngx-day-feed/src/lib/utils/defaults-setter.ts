import {AvailabilityComponent} from 'ngx-day-feed/availability/availability.component';
import {DayFeedConfig} from 'ngx-day-feed/models';
import {defaultConfig} from 'ngx-day-feed/utils/default-config';
import {ItemConfig} from 'ngx-day-feed/models/item-config.model';

export function setItemNeededValues(item: AvailabilityComponent, config: DayFeedConfig) {
  const itemConfig: ItemConfig = item.itemConfig;
  itemConfig.startMinute = (itemConfig.startMinute) ? itemConfig.startMinute : 0;
  itemConfig.endMinute = (itemConfig.endMinute) ? itemConfig.endMinute : 0;
  if (config.display) {
    item.gap = (config.display.gap) ? config.display.gap : defaultConfig.display.gap;
    if (config.display.items) {
      item.itemConfig.backgroundColor = (itemConfig.backgroundColor) ? itemConfig.backgroundColor : (config.display.items.backgroundColor)
        ? config.display.items.backgroundColor
        : defaultConfig.display.items.backgroundColor;
      item.itemConfig.opacity = (itemConfig.opacity)
        ? itemConfig.opacity
        : (config.display.items.opacity)
          ? config.display.items.opacity
          : defaultConfig.display.items.opacity;
      item.itemConfig.hoverOpacity = (itemConfig.hoverOpacity)
        ? itemConfig.hoverOpacity
        : (config.display.items.hoverOpacity)
          ? config.display.items.hoverOpacity
          : defaultConfig.display.items.hoverOpacity;
    }
  }


}
