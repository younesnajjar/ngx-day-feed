export class DayFeedConfig {
  display?: {
    gap?: number,
    items?: {
      backgroundColor?: string,
      opacity?: number;
      hoverOpacity?: number,
      disableHoverAnimation?: boolean,
    }

  };
  animations?: {
  };
  hours?: {
    callback?: (value: string) => string,
  };
}
