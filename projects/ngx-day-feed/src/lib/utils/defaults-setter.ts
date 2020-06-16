import {AvailabilityComponent} from 'ngx-day-feed/availability/availability.component';
import {DayFeedConfig} from 'ngx-day-feed/models';
import {defaultConfig} from 'ngx-day-feed/utils/default-config';
import {ItemConfig} from 'ngx-day-feed/models/item-config.model';

export function setItemNeededValues(item: AvailabilityComponent, config: DayFeedConfig) {
  const itemConfig: ItemConfig = item.itemConfig;
  itemConfig.startMinute = (itemConfig.startMinute) ? itemConfig.startMinute : 0;
  itemConfig.endMinute = (itemConfig.endMinute) ? itemConfig.endMinute : 0;
  const defaultConfigCopy: DayFeedConfig = JSON.parse(JSON.stringify(defaultConfig));

  setConfigDefaults(config, defaultConfigCopy);


  item.gap = (config.display.gap) ? config.display.gap : defaultConfig.display.gap;


  setConfigDisplayItems(item, config, 'backgroundColor');
  setConfigDisplayItems(item, config, 'opacity');
  setConfigDisplayItems(item, config, 'hoverOpacity');
  setConfigDisplayItems(item, config, 'disableHoverAnimation');
  setConfigDisplayItems(item, config, 'disableNewAnimation');
}

function setConfigDisplayItems(item: AvailabilityComponent, config: DayFeedConfig, attr: string) {
  const itemConfig: ItemConfig = item.itemConfig;
  item.itemConfig[attr] = (itemConfig[attr] || typeof itemConfig[attr] === 'boolean')
    ? itemConfig[attr]
    : (config.display.items[attr])
      ? config.display.items[attr]
      : defaultConfig.display.items[attr];
}

function setConfigDefaults(config: DayFeedConfig, defaultConfigCopy: DayFeedConfig) {
  if (!config.display) {
    config.display = defaultConfigCopy.display;
  } else if (!config.display.items) {
    config.display.items = defaultConfigCopy.display.items;
  }
  if (!config.hours) {
    config.hours = defaultConfigCopy.hours;
  }
}
