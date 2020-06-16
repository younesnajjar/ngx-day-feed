export class DayFeedConfig {
  display?: {
    gap?: number,
    items?: {
      backgroundColor?: string,
      opacity?: number;
      hoverOpacity?: number
    }

  };
  animations?: {
    itemPop?: boolean
  };
  hours?: {
    callback?: (value: string) => string,
  };
}
