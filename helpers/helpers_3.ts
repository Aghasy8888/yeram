import {
  DAYS,
  HOURS,
  MONTHS,
  TRANSPORT_ID,
  WEEKS,
  week,
} from '@/data/stepConstants';
import { formatGosNumbers } from '.';
import {
  formatDateRussian,
  getRussianMonthName,
  getStartAndEndDates,
  sumCameIns,
} from './helpers_2';
import hourPeriods from '@/data/hourPeriods';
import { HeaderGroup } from 'react-table';
import { AppDispatch } from '@/redux/store';
import { setVideoLoading } from '@/redux/features/video/videoSlice';

export function removeTransportPlate(entries: IReportEntry[]): IReportSingle[] {
  return entries.map(({ transport_plate, ...rest }) => rest);
}

export function getDefaultReportType() {
  let reportData;

  if (typeof window !== 'undefined') {
    reportData = localStorage.getItem('reportData');
  }

  if (!reportData) {
    return HOURS;
  }

  const parsedData: IReportBody = JSON.parse(reportData);

  return parsedData.report_type;
}

export function sumReportDataEntries(
  sortedReportData: IReportEntry[]
): IReportSingle[] {
  const result: IReportSingle[] = [];

  const aggregatedDataMap = new Map<string, IReportSingle>();

  for (const entry of sortedReportData) {
    const { time, exited, entered } = entry;

    if (aggregatedDataMap.has(time)) {
      const existingEntry = aggregatedDataMap.get(time)!;
      existingEntry.exited += exited;
      existingEntry.entered += entered;
    } else {
      aggregatedDataMap.set(time, { time, exited, entered });
    }
  }

  result.push(...Array.from(aggregatedDataMap.values()));

  return result;
}

export const sortReportData = (reportData: IReportEntry[]): IReportEntry[] => {
  return reportData.sort((a, b) => {
    const timeA = new Date(a.time).getTime();
    const timeB = new Date(b.time).getTime();
    return timeA - timeB;
  });
};

export const sortHeaders = (
  headerGroup: HeaderGroup<Record<string, number | string>>
) => {
  headerGroup?.headers.sort((a, b) => {
    const timeA = new Date(a.id).getTime();
    const timeB = new Date(b.id).getTime();
    return timeA - timeB;
  });

  return headerGroup?.headers;
};

export const processPeriods = (
  headerGroups: HeaderGroup<Record<string, number | string>>[],
  reportType: string
) => {
  const sortedHeaders = sortHeaders(headerGroups[0]);

  const sortedPeriods = sortedHeaders.map((header) => header.id).slice(1);
  const formattedPeriods = sortedPeriods.map((column, index: number) => {
    const tableHeaderCell = getTableHeaderByStep(column, reportType, index + 1);

    return tableHeaderCell;
  });

  return formattedPeriods;
};

export const getTableHeaderByStep = (
  date: string,
  reportType: string,
  weekIndex?: number
): string => {
  if (!date || date === TRANSPORT_ID) {
    return '';
  }

  let dateByStep: string = '';

  const dayMonthOfDate = formatDateRussian(date.split('T')[0])?.slice(0, 5);
  const yearPart = date.split('-')[0];
  const timePart = date.split('T')[1].slice(0, 2);
  const hourIndex = parseInt(timePart, 10);
  const hour = hourPeriods[hourIndex];

  switch (reportType) {
    case HOURS:
      dateByStep = `${dayMonthOfDate}, ${hour}`;
      break;
    case DAYS:
      dateByStep = dayMonthOfDate as string;
      break;
    case WEEKS:
      dateByStep = `${week.slice(0, 3)} ${weekIndex}`;
      break;
    case MONTHS:
      dateByStep = `${getRussianMonthName(
        dayMonthOfDate as string
      )},${yearPart}`;
      break;

    default:
      break;
  }

  return dateByStep;
};

export function createTransportQueryString(strings: string[]): string {
  if (strings.length === 0) {
    return '';
  }

  const queryString = strings.map((str) => `&transport=${str}`).join('');

  return queryString;
}

interface MyObject {
  [date: string]: number;
}

export function sortObjectByDates(obj: MyObject): MyObject {
  const sortedObject: MyObject = {};

  const sortedDates = Object.keys(obj).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );

  sortedDates.forEach((date) => {
    sortedObject[date] = obj[date];
  });

  return sortedObject;
}

export function getColumnStyle(columnStyles: IColumnStyles, index: number) {
  switch (index) {
    case 0:
      return columnStyles.nameHeader;
    case 1:
      return columnStyles.transported;
    case 2:
      return columnStyles.control;
    default:
      return columnStyles.empty;
  }
}

export const formatCreationDate = (date: string): string => {
  const formattedString = date.replace('T', ' ').replace('Z', ' (UTC)');
  return formattedString;
};

export const getVideoRequestData = (
  value: TValue,
  videosTransportId: string | undefined
) => {
  const { startDate, endDate } = getStartAndEndDates(
    value[1] ? (value as Date[]) : (value[0] as Date)
  );

  const videoRequestData = {
    transport: videosTransportId,
    start: startDate as string,
    end: (endDate as { forRequest: string })?.forRequest,
  };

  return videoRequestData;
};

export const getCalculationResult = (
  totalCameInOut: IReportEntry[],
  incomeInput: number,
  salaryInput: number
): ICalculationResult => {
  const income = sumCameIns(totalCameInOut) * incomeInput;
  const salary = (income * salaryInput) / 100;
  const profit = income - salary;

  return {
    income,
    salary,
    profit,
  };
};

export const downloadByUrl = (
  url: string,
  setVideoModalIsOpen: setBoolean,
  name: string,
  dispatch: AppDispatch
) => {
  dispatch(setVideoLoading(true));

  fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      const blobUrl = window.URL.createObjectURL(new Blob([blob]));
      const fileName = name;
      const aTag = document.createElement('a');
      aTag.href = blobUrl;
      aTag.setAttribute('download', fileName);
      document.body.appendChild(aTag);
      aTag.click();
      aTag.remove();
      setVideoModalIsOpen(true);
      dispatch(setVideoLoading(false));
    })
    .catch((err) => {
      dispatch(setVideoLoading(false));
      console.log(err);
      setVideoModalIsOpen(true);
    });
};

export const getVideoName = (
  gosNumber: string,
  startAndEndDate: IStartAndEndDate
) => {
  const videoName = `${formatGosNumbers(gosNumber)} (${
    startAndEndDate.end
      ? `${startAndEndDate.start}-${startAndEndDate.end}`
      : startAndEndDate.start
  }).mp4`;

  return videoName;
};
