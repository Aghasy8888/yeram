import Image from 'next/image';
import { useState } from 'react';
import { checkbox } from '@/public/assets';

import styles from './CheckboxStyles.module.scss';

//{checked, setChecked}: {checked: boolean, setChecked: setBoolean}

interface ICheckboxProps {
  defaultChecked?: boolean;
  index?: number;
  activePeriods?: number[];
  setActivePeriods?: TSetActivePeriods;
}

const Checkbox = ({
  defaultChecked,
  index,
  setActivePeriods,
  activePeriods,
}: ICheckboxProps) => {
  const [checked, setChecked] = useState(defaultChecked);
  if (index === undefined || !setActivePeriods || !activePeriods) return;
  const activePeriodsCopy = [...(activePeriods as number[])];

  const onChange = () => {
    const removeIndex = (activePeriodsCopy as number[]).indexOf(
      index as number
    );
    if (removeIndex !== -1) {
      activePeriodsCopy.splice(removeIndex, 1);

      setActivePeriods(activePeriodsCopy);
    } else {
      activePeriodsCopy.push(index as number);
      setActivePeriods(activePeriodsCopy);
    }

    setChecked(!checked);
  };

  return (
    <div className={styles.checkboxCtn}>
      <input
        type="checkbox"
        className={styles.checkbox}
        onChange={onChange}
        checked={checked}
      />
      {checked && (
        <button onClick={onChange}>
          <Image
            alt="checkbox"
            src={checkbox}
            width={18}
            height={18}
            priority
            className={styles.checkedBox}
          />
        </button>
      )}
    </div>
  );
};

export default Checkbox;
