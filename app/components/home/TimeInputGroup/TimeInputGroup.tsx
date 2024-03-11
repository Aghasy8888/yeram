import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import styles from './TimeInputGroupStyles.module.scss';

const TimeInputGroup = ({
  shiftStart,
  setShiftStart,
  setStartTimeError,
  startTimeError,
  shiftEnd,
  setShiftEnd,
  setEndTimeError,
  endTimeError,
}: ITimeInputGroupProps) => {
  const handleTimeInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    setterFunction: Dispatch<SetStateAction<string>>,
    errorSetter: Dispatch<SetStateAction<string | null>>
  ) => {
    const inputText = e.target.value;
    if(!inputText.includes(':')) return;
    setterFunction(inputText);

    if (/^(2[0-3]|[0-1]?[0-9]):([0-5][0-9])$/.test(inputText)) {
      errorSetter(null);
    } else {
      errorSetter('Invalid time');
    }
  };

  return (
      <div className={styles.inputGroup}>
        <div className={styles.income}>
          <label htmlFor="shiftStart">
            Начало смены
            <input
              type="text"
              id="shiftStart"
              name="shiftStart"
              value={shiftStart}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleTimeInputChange(e, setShiftStart, setStartTimeError)
              }
              placeholder="ЧЧ:мм"
              maxLength={5}
              required
            />
            <div className={styles.error}>{startTimeError}</div>
          </label>
        </div>

        <div className={styles.salary}>
          <label htmlFor="shiftEnd">
            Окончание смены
            <input
              type="text"
              id="shiftEnd"
              name="shiftEnd"
              value={shiftEnd}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleTimeInputChange(e, setShiftEnd, setEndTimeError)
              }
              placeholder="ЧЧ:мм"
              maxLength={5}
              required
            />
            <div className={styles.error}>{endTimeError}</div>
          </label>
        </div>
      </div>
  );
};

export default TimeInputGroup;
