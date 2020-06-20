export function generateHours(startHour: number, endHour: number, stepSizeMinutes: number): string[] {
  const hours: string[] = [];
  let i = startHour * 60;
  while (i < endHour * 60) {
    hours.push(('0' + Math.floor(i / 60)).slice(-2) + ':' + ('0' + (i % 60)).slice(-2));
    i = i + stepSizeMinutes;
  }
  return hours;
}
