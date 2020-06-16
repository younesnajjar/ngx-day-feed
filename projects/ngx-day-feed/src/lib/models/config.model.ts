export class DayFeedConfig {
  display?: {
    gap?: number,
    itemsBackGroundColor?: string,
  };
  animations?: {
    itemPop?: boolean
  };
  hours?: {
    callback?: (value: string) => string,
  };
}
