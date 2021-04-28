export function minutesToHours(num: number) {
  const hours = Math.floor(num / 60);
  const minutes = num % 60;
  const hoursLabel = hours > 1 ? 'hours' : 'hour';
  const minutesLabel = minutes > 1 ? 'mins' : 'min';

  const minutesValue = minutes > 1 ? `${minutes}${minutesLabel}` : '';
  if (hours < 1) return `${minutesValue}`;
  return `${hours}${hoursLabel} ${minutesValue}`;
}
