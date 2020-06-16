export class DayFeedConfig {
  display?: {
    gap?: number,
    items?: {
      backgroundColor?: string,
      opacity?: number;
      hoverOpacity?: number,
      animations?: {
        hover?: boolean
      }
    }

  };
  animations?: {
  };
  hours?: {
    callback?: (value: string) => string,
  };
}
