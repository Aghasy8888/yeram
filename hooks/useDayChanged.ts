import { getDayValue } from '@/helpers';
import { useEffect, useRef } from 'react';

const useDayChanged = (value: Value) => {
  const previousDayRef = useRef<number | undefined>(undefined);
  const currentDay = getDayValue(value);

  useEffect(() => {
    if (value instanceof Date) {
      previousDayRef.current = currentDay;
    }
  }, [value]);

  return previousDayRef.current !== undefined && previousDayRef.current !== currentDay;
};

export default useDayChanged;
