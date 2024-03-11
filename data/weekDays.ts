interface Day {
  day: string;
}

export const todayAndYesterday: string[] = [
  'Сегодня',
  'Вчера',
];

export const weekDaysWholeNames: string[] = [
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
  'Воскресенье',
];

const weekDays: Day[] = [
  {
    day: 'П',
  },
  {
    day: 'В',
  },
  {
    day: 'С',
  },
  {
    day: 'Ч',
  },
  {
    day: 'П',
  },
  {
    day: 'С',
  },
  {
    day: 'В',
  },
];

export default weekDays;
