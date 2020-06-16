import {DayFeedConfig} from 'ngx-day-feed/models';
import {BACKGROUND, DEFAULT_HOVER_OPACITY, DEFAULT_OPACITY} from 'ngx-day-feed/utils/consts';
import {ItemConfig} from 'ngx-day-feed/models/item-config.model';

export const defaultConfig: DayFeedConfig = {
  display: {
    gap: 1,
    items: {
      backgroundColor: BACKGROUND,
      opacity: DEFAULT_OPACITY,
      hoverOpacity: DEFAULT_HOVER_OPACITY
    },
  }
};
export const defaultItemConfig: ItemConfig = {};
