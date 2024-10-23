import { DAYS, HOURS, MONTHS, WEEKS } from '@/data/stepConstants';
import { useEffect } from 'react';

const useSetStepsAutomatically = (
  disabledSteps: string[],
  stepValue: string,
  setStepValue: TSetString
) => {

  useEffect(() => {
    const stepOptions = [HOURS, DAYS, WEEKS, MONTHS];
    const activeStepOptions = stepOptions.filter(
      (option) => !disabledSteps.includes(option)
    );

    setStepValue(activeStepOptions[0]);
  }, [JSON.stringify(disabledSteps)]);
  
  useEffect(() => {
    setTimeout(() => {
      setStepValue(stepValue);
    }, 1000);
  }, []);
};

export default useSetStepsAutomatically;
