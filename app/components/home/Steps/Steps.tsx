import { memo } from 'react';
import * as constants from '../../../../data/stepConstants';
import styles from './StepsStyles.module.scss';

const Steps = ({ stepValue, setStepValue, disabledSteps }: IStepsProps) => {
  const { WEEKS, HOURS, MONTHS, DAYS } = constants;
  const hourIsDisabled = disabledSteps.includes(HOURS);
  const weekIsDisabled = disabledSteps.includes(WEEKS);
  const monthIsDisabled = disabledSteps.includes(MONTHS);
  const dayIsDisabled = disabledSteps.includes(DAYS);

  const handleDummyChange = () => {
    // Dummy change handler to satisfy the warning
  };

  return (
    <div className={styles.steps}>
      <div className={styles.container}>
        <div className={styles.stepTitle}>Шаг:</div>
        <form className={styles.form}>
          <input
            disabled={hourIsDisabled}
            type="radio"
            id="hour"
            name="step"
            value="hour"
            checked={stepValue === HOURS}
            onClick={() => setStepValue(HOURS)}
            onChange={handleDummyChange}
          />
          <label htmlFor="hour">час</label>

          <input
            disabled={dayIsDisabled}
            id="day"
            type="radio"
            name="step"
            value="day"
            checked={stepValue === DAYS}
            onClick={() => setStepValue(DAYS)}
            onChange={handleDummyChange}
          />
          <label htmlFor="day">день</label>

          <input
            disabled={weekIsDisabled}
            type="radio"
            id="week"
            name="step"
            value="week"
            checked={stepValue === WEEKS}
            onClick={() => setStepValue(WEEKS)}
            onChange={handleDummyChange}
          />
          <label htmlFor="week">неделя</label>

          <input
            disabled={monthIsDisabled}
            type="radio"
            id="month"
            name="step"
            value="month"
            checked={stepValue === MONTHS}
            onClick={() => setStepValue(MONTHS)}
            onChange={handleDummyChange}
          />
          <label htmlFor="month">месяц</label>
        </form>
      </div>
    </div>
  );
};

export default memo(Steps);
