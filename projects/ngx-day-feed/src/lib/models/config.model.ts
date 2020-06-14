export interface DayFeedConfig {
  animations?: {
    itemPop?: boolean
  };
  hours?: {
    callback?: (value: string) => string,
  };
}
