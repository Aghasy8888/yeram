import Image from 'next/image';
import { useState } from 'react';
import { checkbox } from '@/public/assets';

import styles from './CheckboxStyles.module.scss';

//{checked, setChecked}: {checked: boolean, setChecked: setBoolean}

const Checkbox = () => {
  const [checked, setChecked] = useState(false);
  
  return (
    <div className={styles.checkboxCtn}>
      <input
        type="checkbox"
        className={styles.checkbox}
        onChange={() => setChecked(!checked)}
        checked={checked}
      />
      {checked && (
        <button onClick={() => setChecked(!checked)}>
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
