import schedulePeriods from '@/data/schedulePeriod';
import { DISPLAY } from '@/data/stepConstants';

export function getActivePeriods(periods: ISchedule[]) {
  return periods?.map(({ start_time }) =>
    parseInt(start_time.split(':')[0], 10)
  );
}

export function processPeriodsForRequest(hourIndexes: number[]) {
  return hourIndexes.map((hour) => ({
    start_time: `${String(hour).padStart(2, '0')}:00:00`,
    end_time: `${String((hour + 1) % 24).padStart(2, '0')}:00:00`,
  }));
}

function findTwoMinNumbers(numbers: number[]) {
  if (numbers.length < 2) {
    return [numbers[0]];
  }

  let min1 = Infinity;
  let min2 = Infinity;

  for (let num of numbers) {
    if (num < min1) {
      min2 = min1;
      min1 = num;
    } else if (num < min2) {
      min2 = num;
    }
  }

  return [min1, min2];
}

export const getActivePeriodsForShow = (time_table: ISchedule[]) => {
  const activeIndexes = getActivePeriods(time_table);
  const [min1, min2] = findTwoMinNumbers(activeIndexes);

  return [schedulePeriods[min1], schedulePeriods[min2]];
};

export const getScheduleForShow = (transport: ITransportFromBack) => {
  const activePeriods = getActivePeriodsForShow(transport.time_table);

  const scheduleForShow = activePeriods?.map((period) => {
    if (!period?.start) return;
    return ` ${period?.start.slice(0, -3)} - ${period?.end.slice(0, -3)}`;
  });

  return scheduleForShow;
};

interface MyObject {
  key: string;
  [index: string]: any;
}

export const removeProperties = (object: MyObject, properties: string[]) => {
  const result = { ...object };
  for (const property of properties) {
    delete result[property];
  }
  return result;
};

export const getFullNameParts = (fullName: string) => {
  const splittedFullName = fullName.split(' ');

  return {
    username: splittedFullName[0],
    first_name: splittedFullName[1],
    last_name: splittedFullName[0],
    middle_name: splittedFullName[2] ? splittedFullName[2] : null,
  };
};

export const getDisplayOrDataEditRqBody = (
  info: string,
  checked: boolean
) => {
  const editingKey = info === DISPLAY ? 'isactive' : 'islock';
  const editingValue = info === DISPLAY ? !checked : checked ? 0 : 1;

  return {
    [editingKey]: editingValue,
  };
};
