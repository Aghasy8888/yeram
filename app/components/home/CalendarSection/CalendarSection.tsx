'use client';

import { memo, useEffect, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import ru from 'date-fns/locale/ru';

import 'react-datepicker/dist/react-datepicker.css';
import './Calendar.scss';
import styles from './CalendarSectionStyles.module.scss';

const CalendarSection = ({ value, onChange }: ICalendarSectionProps) => {
  registerLocale('ru', ru);
  const [isOpen, setIsOpen] = useState<boolean>(true);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  return (
    <section className={styles.calendarSection}>
      <article translate="no" className={styles.dateSelection}>
        <DatePicker
          selected={value[0]}
          onChange={onChange}
          selectsStart
          startDate={value[0]}
          endDate={value[1]}
          showTimeSelect
          selectsEnd
          maxDate={new Date()}
          timeIntervals={15}
          dateFormat="MMMM d, yyyy h:mm aa"
          locale={'ru'}
          popperPlacement="bottom"
          popperModifiers={{
            flip: {
              behavior: ['bottom'],
            },
            preventOverflow: {
              enabled: false,
            },
            hide: {
              enabled: false,
            },
          }}
          inline
          isOpen={isOpen}
          showYearDropdown
          showMonthDropdown
          formatWeekDay={(nameOfDay: string) => nameOfDay.slice(0, 1)}
        />
      </article>
    </section>
  );
};

export default memo(CalendarSection);
