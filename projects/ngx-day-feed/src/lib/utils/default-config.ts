import {DayFeedConfig} from '../models';
import {BACKGROUND, DEFAULT_HOVER_OPACITY, DEFAULT_OPACITY} from './consts';
import {ItemConfig} from '../models/item-config.model';

export const defaultConfig: DayFeedConfig = {
  display: {
    gap: 1,
    items: {
      backgroundColor: BACKGROUND,
      opacity: DEFAULT_OPACITY,
      hoverOpacity: DEFAULT_HOVER_OPACITY,
    },
  },
  hours: {}

};
export const defaultItemConfig: ItemConfig = {};
