export class DayFeedConfig {
  display?: {
    gap?: number
  };
  animations?: {
    itemPop?: boolean
  };
  hours?: {
    callback?: (value: string) => string,
  };
}
