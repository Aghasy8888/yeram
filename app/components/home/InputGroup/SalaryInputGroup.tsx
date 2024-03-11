import { ChangeEvent } from 'react';
import { INCOME, SALARY } from '@/data/stepConstants';

import styles from './SalaryInputGroupStyles.module.scss';


const SalaryInputGroup = ({
  income,
  setIncome,
  salary,
  setSalary,
  incomeInputRef,
}: ISalaryInputGroupProps) => {
  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    setterFunction: TSetNumber,
    from: string
  ) => {
    if (Number(e.target.value) > 100 && from === SALARY) return;
    let inputValue = e.target.value.replace(/^0+(?=\d*\.)|(\.\d*?)$/, '$1');

    if (inputValue.includes('.')) {
      inputValue = e.target.value;
    }

    setterFunction(Number(inputValue));
  };

  return (
    <div className={styles.inputGroup}>
      <div className={styles.income}>
        <label htmlFor="income">
          Стоимость, ₽
          <input
            ref={incomeInputRef}
            type="number"
            value={income.toString()}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange(e, setIncome, INCOME)
            }
            id="income"
            name="income"
            required
          />
        </label>
      </div>
      <div className={styles.salary}>
        <label htmlFor="salary">
          Процент, %
          <input
            type="number"
            value={salary.toString()}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange(e, setSalary, SALARY)
            }
            id="salary"
            name="salary"
            required
          />
        </label>
      </div>
    </div>
  );
};

export default SalaryInputGroup;
