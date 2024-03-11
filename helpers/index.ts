import * as authConstants from '../app/(auth)/constants';
import * as constants from '../data/stepConstants';

export const removeLastUndefineds = (
  numbersToShow: (ITransport | undefined)[]
): (ITransport | undefined)[] => {
  if (
    numbersToShow.length === 0 ||
    numbersToShow[numbersToShow.length - 1] !== undefined
  ) {
    return numbersToShow;
  } else {
    return removeLastUndefineds(numbersToShow.slice(0, -1));
  }
};

export const shortenNumbersToShow = (
  submittedTransportsLength: number,
  submittedTransports: ITransport[],
  lastSubmittedTransport: ITransport
): (ITransport | undefined)[] => {
  switch (submittedTransportsLength) {
    case 0:
      return [];
    case 1:
      return [submittedTransports[0]];
    case 2:
    case 3:
      return [submittedTransports[0], lastSubmittedTransport];

    default:
      return [undefined];
      break;
  }
};

export const englishStepToRussian = (stepValue: string): string => {
  switch (stepValue) {
    case constants.HOURS:
      return constants.hour;
    case constants.WEEKS:
      return constants.week;
    case constants.MONTHS:
      return constants.month;
    case constants.DAYS:
      return constants.day;
    default:
      return '';
  }
};

export const formatGosNumbers = (
  inputString: string | undefined
): string | undefined => {
  if (inputString) {
    const pattern = /([^\d]|^)(\d+)(?=[^\d]|$)/g;
    const result = inputString?.replace(pattern, '$1 $2 ');

    return result?.trim() as string;
  }
};

export const setAuthInstructions = (page: string) => {
  let authInstructions = '';

  switch (page) {
    case authConstants.login:
      authInstructions = 'Введите Ваш логин и пароль';
      break;

    case authConstants.register:
      authInstructions = 'Введите данные';
      break;

    case authConstants.resetPassword:
      authInstructions =
        'Введите email, указанный при регистрации. На Ваш email будут высланы инструкции по восстановлению пароля.';
      break;
  }

  return authInstructions;
};

export const setValueToLast7Days = (
  selectedDay: Date,
  onChange: (value: Value) => void
) => {
  if (selectedDay instanceof Date) {
    let startOfLastSevenDays = new Date(selectedDay);
    startOfLastSevenDays.setDate(selectedDay.getDate() - 6);
    if (selectedDay.getDate() !== new Date().getDate()) {
      selectedDay.setDate(selectedDay.getDate() + 1);
      onChange([startOfLastSevenDays, selectedDay]);
      return;
    }

    selectedDay.setDate(selectedDay.getDate() + 1);

    onChange([startOfLastSevenDays, selectedDay]);
  }
};

export const setValueToLastMonth = (
  selectedDay: Date,
  onChange: (value: Value) => void
) => {
  if (selectedDay instanceof Date) {
    let startOfPreviousMonth = new Date(selectedDay);
    startOfPreviousMonth = new Date(
      selectedDay.getFullYear(),
      selectedDay.getMonth() - 1,
      selectedDay.getDate()
    );

    selectedDay.setDate(selectedDay.getDate() + 1);
    onChange([startOfPreviousMonth, selectedDay]);
  }
};

export const setSelectedDay = (value: Value): Date => {
  let selectedDay: Date = new Date();
  if (value instanceof Date) {
    selectedDay = new Date(value as Date);
  } else if (value instanceof Array) {
    selectedDay = new Date(value[1] as Date);
  }

  return selectedDay;
};

export function formatDateForRequest(date: Date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
  const day = date.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export const formatDate = (value: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };

  const date = new Intl.DateTimeFormat('ru-RU', options)
    .format(value)
    .replace(/\//g, '.');

  return date;
};

export const getMonthValue = (value: Value) => {
  if (value instanceof Date) {
    return value.getMonth() + 1;
  }
};
export const getYearValue = (value: Value) => {
  if (value instanceof Date) {
    return value.getFullYear();
  }
};

export const getDayValue = (value: Value) => {
  if (value instanceof Date) {
    return value.getDate();
  }
};

export const formatShortWeekDay = (locale: string | undefined, date: Date) =>
  new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(date).charAt(0);
