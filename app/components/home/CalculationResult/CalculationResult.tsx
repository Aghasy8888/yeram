'use client';

import { useEffect } from 'react';
import { useWindowWidth } from '@/hooks/useWindowWidth';
import { getCalculationResult } from '@/helpers/helpers_3';
import { selectReports } from '@/redux/features/transport/transportSlice';
import { useAppSelector } from '@/redux/hooks';

import styles from './CalculationResultStyles.module.scss';


const CalculationResult = ({
  income: incomeInput,
  salary: salaryInput,
  calculationResult,
  setCalculationResult,
}: ICalculationResultProps) => {
  const reportData: IReportEntry[] = useAppSelector(selectReports);
  const windowWidth = useWindowWidth();

  const { profit, income, salary } = calculationResult;

  useEffect(() => {
    const { profit, income, salary } = getCalculationResult(
      reportData,
      incomeInput,
      salaryInput
    );

    if (windowWidth > 745) {
      setCalculationResult({
        income,
        profit,
        salary,
      });
    }
  }, [incomeInput, salaryInput]);

  return (
    <div className={styles.resultsCtn}>
        <div className={styles.incomeBlock}>
          <p className={styles.incomeText}>Выручка</p>
          <p className={styles.incomeResult}>{income} ₽</p>
        </div>
        <div className={styles.salaryBlock}>
          <p className={styles.incomeText}>Зарплата</p>
          <p className={styles.result}>{salary} ₽</p>
        </div>

      <div className={styles.totalBlock}>
        <p className={styles.incomeText}>Итого</p>
        <p className={styles.result}>{profit} ₽</p>
      </div>
    </div>
  );
};

export default CalculationResult;
