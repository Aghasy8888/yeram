'use client';

import { useEffect, useState } from 'react';
import {
  CalculationResult,
  CalculatorModal,
  SalaryInputGroup,
  TimeInputGroup,
} from '..';
import { TotalTransportedInfo } from '@/app/common';
import useMediaWidth from '@/hooks/useMediaWidth';
import { useWindowWidth } from '@/hooks/useWindowWidth';
import useCloseModal from '@/hooks/useCloseModal';
import { getCalculationResult } from '@/helpers/helpers_3';
import { selectReports } from '@/redux/features/transport/transportSlice';
import { useAppSelector } from '@/redux/hooks';

import styles from './CalculatorSectionStyles.module.scss';

const CalculatorSection = () => {
  const windowWidth = useWindowWidth();
  const shouldInputGroupRender = useMediaWidth(windowWidth > 745);
  const shouldOpenCalcBtnRender = useMediaWidth(windowWidth <= 745);
  const [calculatorIsOpen, setCalculatorIsOpen] = useState(false);
  const [shiftStart, setShiftStart] = useState('00:00');
  const [shiftEnd, setShiftEnd] = useState('00:00');
  const [startTimeError, setStartTimeError] = useState<string | null>(null);
  const [endTimeError, setEndTimeError] = useState<string | null>(null);
  const [incomeInput, setIncome] = useState(0);
  const [salaryInput, setSalary] = useState(0);
  const [calculationResult, setCalculationResult] =
    useState<ICalculationResult>({
      income: 0,
      salary: 0,
      profit: 0,
    });
  const reportData: IReportEntry[] = useAppSelector(selectReports);

  useCloseModal(calculatorIsOpen, setCalculatorIsOpen);

  useEffect(() => {
    if (!shouldOpenCalcBtnRender) {
      handleSubmit();
    }
  }, [incomeInput, salaryInput, JSON.stringify(reportData)]);

  const handleSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    if (event) {
      event.preventDefault();
    }

    if (startTimeError || endTimeError) return;
    const { profit, income, salary } = getCalculationResult(
      reportData,
      incomeInput,
      salaryInput
    );

    setCalculationResult({
      income,
      profit,
      salary,
    });

    if (calculatorIsOpen) {
      setCalculatorIsOpen(false);
    }
  };

  return (
    <section className={styles.calculatorSection}>
      <div className={styles.container}>
        <TotalTransportedInfo />
        <div className={styles.formAndOpenCalcCtn}>
          <form className={styles.calculator}>
            {shouldInputGroupRender && (
              <SalaryInputGroup
                income={incomeInput}
                salary={salaryInput}
                setIncome={setIncome}
                setSalary={setSalary}
              />
            )}

            <div className={styles.resultsAndOpenCalcCtn}>
              <CalculationResult
                calculationResult={calculationResult}
                setCalculationResult={setCalculationResult}
                income={incomeInput}
                salary={salaryInput}
              />
            </div>

            {/* {shouldInputGroupRender && (
              <div className={styles.shiftStartOrEndCtn}>
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
              </div>
            )} */}
          </form>

          {calculatorIsOpen && (
            <CalculatorModal
              income={incomeInput}
              salary={salaryInput}
              setIncome={setIncome}
              setSalary={setSalary}
              handleSubmit={handleSubmit}
              startTimeError={startTimeError}
              endTimeError={endTimeError}
              setEndTimeError={setEndTimeError}
              setShiftEnd={setShiftEnd}
              setShiftStart={setShiftStart}
              setStartTimeError={setStartTimeError}
              shiftEnd={shiftEnd}
              shiftStart={shiftStart}
            />
          )}

          {shouldOpenCalcBtnRender && (
            <button
              className={styles.openCalculatorBtn}
              onClick={() => setCalculatorIsOpen(true)}
            >
              Открыть калькулятор
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default CalculatorSection;
