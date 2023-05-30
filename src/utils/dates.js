export const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

export function getWeekStart(date) {
  const dayNumber = new Date(date).getDay();
  const hours = new Date(date).getHours();
  const minutes = new Date(date).getMinutes();
  const seconds = new Date(date).getSeconds();
  return new Date(new Date(date).getTime() - (dayNumber - 1) * 24 * 60 * 60 * 1000 - hours * 60 * 60 * 1000 - minutes * 60 * 1000 - seconds * 1000);
}

export function getLastWeekEnd(date) {
  const dayNumber = new Date(date).getDay();
  const hours = new Date(date).getHours();
  const minutes = new Date(date).getMinutes();
  const seconds = new Date(date).getSeconds();
  return new Date(new Date(date).getTime() - (dayNumber - 1) * 24 * 60 * 60 * 1000 - hours * 60 * 60 * 1000 - minutes * 60 * 1000 - seconds * 1000 - 1000);
}

export function getLastWeekStart(date) {
  const dayNumber = new Date(date).getDay();
  const hours = new Date(date).getHours();
  const minutes = new Date(date).getMinutes();
  const seconds = new Date(date).getSeconds();
  return new Date(new Date(date).getTime() - (dayNumber + 6) * 24 * 60 * 60 * 1000 - hours * 60 * 60 * 1000 - minutes * 60 * 1000 - seconds * 1000);
}

export function getOldestEnd(date) {
  const dayNumber = new Date(date).getDay();
  const hours = new Date(date).getHours();
  const minutes = new Date(date).getMinutes();
  const seconds = new Date(date).getSeconds();
  return new Date(new Date(date).getTime() - (dayNumber + 6) * 24 * 60 * 60 * 1000 - hours * 60 * 60 * 1000 - minutes * 60 * 1000 - seconds * 1000 - 1000)
}

export function getOldestStart(date) {
  const dayNumber = new Date(date).getDay();
  const hours = new Date(date).getHours();
  const minutes = new Date(date).getMinutes();
  const seconds = new Date(date).getSeconds();
  return new Date(new Date(date).getTime() - (dayNumber + 6 + 7) * 24 * 60 * 60 * 1000 - hours * 60 * 60 * 1000 - minutes * 60 * 1000 - seconds * 1000)
}