import Image from 'next/image';
import { useState } from 'react';
import { checkbox } from '@/public/assets';

import styles from './Checkbox_2Styles.module.scss';

//{checked, setChecked}: {checked: boolean, setChecked: setBoolean}

interface ICheckboxProps {
  defaultChecked?: boolean;
  index?: number;
  makeAction?: () => void;
}

const Checkbox_2 = ({
  defaultChecked,
  index,
  makeAction
}: ICheckboxProps) => {
  const [checked, setChecked] = useState(defaultChecked);
  if (index === undefined) return;
  
  const onChange = () => {
    makeAction && makeAction();
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

export default Checkbox_2;
