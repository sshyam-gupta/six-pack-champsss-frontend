export function minutesToHours(num: number) {
  const hours = Math.floor(num / 60);
  const minutes = num % 60;
  const hoursLabel = hours > 1 ? 'hours' : 'hour';
  const minutesLabel = minutes > 1 ? 'mins' : 'min';
  if (hours < 1) return `${minutes}${minutesLabel}`;
  return `${hours}${hoursLabel} ${minutes}${minutesLabel}`;
}
