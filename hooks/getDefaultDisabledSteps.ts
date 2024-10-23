import useDisableSteps from './useDisableSteps';

const useDefaultDisabledSteps = (setDisabledSteps: TSetDisabledSteps) => {
  let defaultDisabledSteps: string[] = [];
  let reportDataFromStorage: IReportBody | null = null;
  let value: TValue = [new Date(), new Date()];

  if (typeof window !== 'undefined') {
    reportDataFromStorage = JSON.parse(
      window.localStorage.getItem('reportData') as string
    );

    if (reportDataFromStorage) {

      value = [
        new Date(reportDataFromStorage.start as string),
        new Date(reportDataFromStorage.end as string),
      ];
    }
  }
  useDisableSteps(setDisabledSteps, value);

  return defaultDisabledSteps;
};

export default useDefaultDisabledSteps;
