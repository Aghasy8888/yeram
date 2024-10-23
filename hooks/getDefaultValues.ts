import { HOURS, MONTHS, WEEKS } from '@/data/stepConstants';
import { formatDate } from '@/helpers';
import getDisabledStepsByValue from './getDisabledStepsByValue';

const getDefaultValues = () => {
  let defaultStepValue = HOURS;
  let defaultDisabledSteps = [WEEKS, MONTHS];
  let reportDataFromStorage: IReportBody | null = null;
  let startAndEndDateFromStorage: IStartAndEndDate | null = null;
  let defaultStartAndEndDate: IStartAndEndDate | null = null;
  let defaultStartDate: Date | undefined = new Date();
  let defaultEndDate: Date | undefined = undefined;
  const today = {
    start: formatDate(new Date()),
    end: '',
  };

  let value: TValue = [];

  if (typeof window !== 'undefined') {
    reportDataFromStorage = JSON.parse(
      window.localStorage.getItem('reportData') as string
    );

    if (reportDataFromStorage) {
      const endDate = new Date(reportDataFromStorage.end as string);
      const startDate = new Date(reportDataFromStorage.start as string);

      startAndEndDateFromStorage = {
        start: formatDate(startDate),
        end: formatDate(endDate),
      };
      defaultStepValue = reportDataFromStorage.report_type;

      value = [
        new Date(reportDataFromStorage.start as string),
        new Date(reportDataFromStorage.end as string),
      ];

      defaultDisabledSteps = getDisabledStepsByValue(value) as string[];
    }

    defaultStartAndEndDate = reportDataFromStorage
      ? startAndEndDateFromStorage
      : today;
    defaultStartDate = reportDataFromStorage
      ? new Date(reportDataFromStorage?.start as string)
      : new Date();
    defaultEndDate = reportDataFromStorage
      ? reportDataFromStorage?.end
        ? new Date(reportDataFromStorage?.end as string)
        : undefined
      : undefined;
  }

  // console.log('defaultEndDate', defaultEndDate);

  return {
    defaultStartAndEndDate,
    defaultStartDate,
    defaultEndDate,
    defaultStepValue,
    defaultDisabledSteps,
  };
};

export default getDefaultValues;
