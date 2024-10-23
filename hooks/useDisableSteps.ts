import { DAYS, HOURS, MONTHS, WEEKS } from '@/data/stepConstants';
import { numOfDaysSelected } from '@/helpers/helpers_2';
import { useEffect } from 'react';

const useDisableSteps = (
  setDisabledSteps: TSetDisabledSteps,
  value: TValue
) => {
  useEffect(() => {
    
    setDisabledSteps([ WEEKS, MONTHS]);

    if (value[1]) {
      const daysSelected = numOfDaysSelected(value as Date[]);      
      if (daysSelected > 3) {
        setDisabledSteps([HOURS, WEEKS, MONTHS]);
      }
      if (daysSelected > 6) {
        setDisabledSteps([HOURS, MONTHS]);
      }
      if (daysSelected > 21) {
        setDisabledSteps([HOURS, DAYS, MONTHS]);
      }
      if (daysSelected > 29) {
        setDisabledSteps([HOURS, DAYS]);
      }
      if (daysSelected > 92) {
        setDisabledSteps([HOURS, DAYS, WEEKS]);
      }
    }
  }, [JSON.stringify(value)]);
};

export default useDisableSteps;
