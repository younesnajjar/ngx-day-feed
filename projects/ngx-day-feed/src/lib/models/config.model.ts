export class DayFeedConfig {
  display?: {
    gap?: number,
    items?: {
      backgroundColor?: string,
      opacity?: number;
      hoverOpacity?: number,
      disableHoverAnimation?: boolean,
      disableNewAnimation?: boolean;
    }

  };
  animations?: {
  };
  hours?: {
    min?: number,
    max?: number,
    callback?: (value: string) => string,
  };
}
