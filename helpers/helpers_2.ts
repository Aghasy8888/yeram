import hourPeriods from '@/data/hourPeriods';
import { formatDateForRequest } from '.';
import * as constants from '@/data/stepConstants';
const { HOURS, DAYS, WEEKS, MONTHS, week } = constants;

export const getRussianMonthName = (dateString: string): string => {
  const monthNumber: number = parseInt(dateString.split('.')[1]);
  const monthNames: string[] = [
    'январь',
    'февраль',
    'март',
    'апрель',
    'май',
    'июнь',
    'июль',
    'август',
    'сентябрь',
    'октябрь',
    'ноябрь',
    'декабрь',
  ];

  if (monthNumber >= 1 && monthNumber <= 12) {
    return monthNames[monthNumber - 1].slice(0, 3);
  } else {
    return 'Invalid month number';
  }
};

export const getReportsArrayWithDates = (
  reportData: ReportData | undefined,
  from: string
): ISingleReport[] => {
  if (!reportData) {
    return [];
  }

  const reportsArray: ISingleReport[] = Object.keys(reportData).map(
    (date, index) => {
      let dateByStep: string | undefined;
      const dayMonthOfDate = formatDateRussian(date)?.slice(0, 5);
      const timePart = date.split(' ')[1];
      const yearPart = date.split('-')[0];

      const hourIndex = parseInt(timePart, 10);
      const hour = hourPeriods[hourIndex];

      switch (from) {
        case HOURS:
          dateByStep = `${dayMonthOfDate}, ${hour}`;
          break;
        case DAYS:
          dateByStep = dayMonthOfDate;
          break;
        case WEEKS:
          dateByStep = `${week.slice(0, 3)} ${index + 1}`;
          break;
        case MONTHS:
          dateByStep = `${getRussianMonthName(
            dayMonthOfDate as string
          )},${yearPart}`;
          break;

        default:
          break;
      }

      return {
        date: dateByStep,
        camein: reportData[date].camein,
        cameout: reportData[date].cameout,
      };
    }
  );

  return reportsArray;
};

export const setPeriods = (
  reportBySteps: ISingleReport[] | undefined
): string[] | undefined => {
  const dayOrWeekPeriods = reportBySteps?.map((report) => {
    if (report.date) {
      return report.date;
    }
    return '';
  });

  return dayOrWeekPeriods;
};

export const getPeriodsExample = (count: number): ISingleReport[] => {
  const reportPeriodsExample: ISingleReport[] = Array.from(
    { length: count },
    () => ({ camein: 0, cameout: 0 })
  );

  return reportPeriodsExample;
};

export const formatDateRussian = (
  date: string | undefined
): string | undefined => {
  if (date) {
    const [datePart, timePart] = date.split(' ');
    const [year, month, day] = datePart.split('-');

    const dateObject = new Date(
      Date.UTC(Number(year), Number(month) - 1, Number(day))
    );

    const formattedDate = `${dateObject
      .getUTCDate()
      .toString()
      .padStart(2, '0')}.${(dateObject.getUTCMonth() + 1)
      .toString()
      .padStart(2, '0')}.${dateObject.getUTCFullYear().toString()}`;

    return formattedDate;
  }
};

export const sumCameIns = (data: IReportEntry[]): number => {
  return data.reduce((total, entry) => total + entry.entered, 0);
};

export const calculateTotal = (
  data: (number | ISingleReport[])[]
): ISingleReport[] => {
  const firstArray = data.find((item) => Array.isArray(item)) as
    | ISingleReport[]
    | undefined;

  if (!firstArray) {
    return [];
  }

  const totalPerStep: ISingleReport[] = Array.from(
    { length: firstArray.length },
    () => ({
      camein: 0,
      cameout: 0,
    })
  );

  for (const stepArray of data as ISingleReport[][]) {
    for (let i = 0; i < stepArray.length; i++) {
      totalPerStep[i].camein += stepArray[i].camein;
      totalPerStep[i].cameout += stepArray[i].cameout;
    }
  }

  return totalPerStep;
};

export const aggregateHourlyData = (data: ReportData | undefined) => {
  const resultArray = Array.from({ length: 24 }, () => ({
    camein: 0,
    cameout: 0,
  }));

  for (const timestamp in data) {
    if (data.hasOwnProperty(timestamp)) {
      const hour = parseInt(timestamp.split(' ')[1]);

      if (!isNaN(hour) && hour >= 0 && hour <= 23) {
        const camein = data[timestamp].camein;
        const cameout = data[timestamp].cameout;

        resultArray[hour].camein += camein;
        resultArray[hour].cameout += cameout;
      } else {
        throw new Error(
          'Invalid hour: the hour should be between [0,23] (can be 0 or 23 too)'
        );
      }
    }
  }

  return resultArray;
};

export const getTotalReportInfo = (
  reportData: IReportEntry[] | undefined
): TotalReportInfo => {
  let totalCameIn = reportData?.reduce(
    (total, entry) => total + entry.entered,
    0
  );
  let totalCameOut = reportData?.reduce(
    (total, entry) => total + entry.exited,
    0
  );

  return {
    totalCameIn: totalCameIn,
    totalCameOut: totalCameOut,
  };
};

export const getStartAndEndDates = (value: Date | Date[]) => {
  let startDate;
  let endDate;

  const dateArrayForRequest = formatDateArrayForRequest(value);

  if (dateArrayForRequest) {
    const [start, end] = dateArrayForRequest;
    startDate = start as string;
    endDate = end;
  }

  return {
    startDate,
    endDate,
  };
};

export const formatDateArrayForRequest = (
  value: Date[] | Date
): (string | { forRequest: string; forShow?: string })[] | undefined => {
  if (Array.isArray(value)) {
    const [firstValuePiece, secondValuePiece] = value as [
      ValuePiece,
      ValuePiece
    ];

    if (firstValuePiece && secondValuePiece) {
      return [
        formatDateForRequest(firstValuePiece),
        {
          forRequest: formatDateForRequest(secondValuePiece),
          forShow: formatDateForRequest(secondValuePiece),
        },
      ];
    }
  } else {
    const today = new Date(value);

    return [
      formatDateForRequest(value),
      { forRequest: formatDateForRequest(today) },
    ];
  }
};

export const numOfDaysSelected = ([startDate, endDate]: Date[]): number => {
  const timeDifference = endDate.getTime() - startDate.getTime();
  const daysSelected = timeDifference / (1000 * 60 * 60 * 24) + 1;

  return daysSelected;
};
