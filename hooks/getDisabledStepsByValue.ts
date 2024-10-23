import { DAYS, HOURS, MONTHS, WEEKS } from '@/data/stepConstants';
import { numOfDaysSelected } from '@/helpers/helpers_2';

const getDisabledStepsByValue = (value: TValue) => {
  if (value[1]) {
    const daysSelected = numOfDaysSelected(value as Date[]);

    if (daysSelected > 3) {
      return [HOURS, WEEKS, MONTHS];
    }
    if (daysSelected > 6) {
      return [HOURS, MONTHS];
    }
    if (daysSelected > 21) {
      return [HOURS, DAYS, MONTHS];
    }
    if (daysSelected > 29) {
      return [HOURS, DAYS];
    }
    if (daysSelected > 92) {
      return [HOURS, DAYS, WEEKS];
    }

    return [WEEKS, MONTHS];
  }
};

export default getDisabledStepsByValue;
