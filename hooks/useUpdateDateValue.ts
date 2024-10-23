import { getMonthValue, getYearValue } from '@/helpers';
import { useEffect } from 'react'

const useUpdateDateValue = (value: Value, setSelectedYear: TSetNumber, setSelectedMonth: TSetNumber) => {
    useEffect(() => {    
        let year;
        let month;
        if (value instanceof Date) {
          year = getYearValue(value);
          month = getMonthValue(value);
        } else if (value instanceof Array) {
          year = getYearValue(value[0]);
          month = getMonthValue(value[0]);
        }
    
        if (year !== undefined) {
          setSelectedYear(year);
        }
    
        if (month !== undefined) {
          setSelectedMonth(month);
        }
      }, [value]);
}

export default useUpdateDateValue;