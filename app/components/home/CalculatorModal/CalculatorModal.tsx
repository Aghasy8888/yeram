'use client';

import { useEffect, useRef } from 'react';
import { SalaryInputGroup, TimeInputGroup } from '..';

import styles from './CalculatorModalStyles.module.scss';

const CalculatorModal = ({
  shiftStart,
  setShiftStart,
  setStartTimeError,
  startTimeError,
  shiftEnd,
  setShiftEnd,
  setEndTimeError,
  endTimeError,
  handleSubmit,
  income,
  setIncome,
  salary,
  setSalary,
}: ICalculatorModalProps) => {
  const incomeInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (incomeInputRef.current) {
      incomeInputRef.current.focus();
    }
  }, []);

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalCustom}>
        <aside className={styles.calculatorModal}>
          <form className={styles.calculator} onSubmit={handleSubmit}>
            <SalaryInputGroup
              incomeInputRef={incomeInputRef}
              income={income}
              salary={salary}
              setIncome={setIncome}
              setSalary={setSalary}
            />
            {/* <div className={styles.shiftStartOrEndCtn}>
              <TimeInputGroup
                startTimeError={startTimeError}
                endTimeError={endTimeError}
                setEndTimeError={setEndTimeError}
                setShiftEnd={setShiftEnd}
                setShiftStart={setShiftStart}
                setStartTimeError={setStartTimeError}
                shiftEnd={shiftEnd}
                shiftStart={shiftStart}
              />
            </div> */}
            <button
              className={styles.applyBtn}
              onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                handleSubmit(event)
              }
            >
              Применить
            </button>
          </form>
        </aside>
      </div>
    </div>
  );
};

export default CalculatorModal;
