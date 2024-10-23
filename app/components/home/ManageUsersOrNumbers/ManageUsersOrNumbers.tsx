'use client';

import { useState } from 'react';
import {
  GREEN_COLOR,
  TRANSPORT_MANAGEMENT,
  USER_MANAGEMENT,
  WHITE_COLOR,
} from '@/data/stepConstants';
import { DoubleArrowRight } from '@/app/common';

import styles from './ManageUsersOrNumbersStyles.module.scss';


const ManageUsersOrNumbers = () => {
  const [userManagement, setUserManagement] = useState(false);
  const handleDummyChange = () => {
    // Dummy change handler to satisfy the warning
  };

  return (
    <section className={styles.management}>
      <div className={styles.radioButtonsCtn}>
        <input
          className={styles.radioBtn}
          type="radio"
          id={TRANSPORT_MANAGEMENT}
          name="downloadType"
          value={TRANSPORT_MANAGEMENT}
          translate="no"
          checked={!userManagement}
          onChange={handleDummyChange}
        />
        <label
          translate="no"
          htmlFor={TRANSPORT_MANAGEMENT}
          onClick={() => {
            setUserManagement(false);
          }}
        >
          Транспортное средство{'\u00A0'}
          <DoubleArrowRight
            color={!userManagement ? GREEN_COLOR : WHITE_COLOR}
          />
        </label>

        <input
          className={styles.radioBtn}
          type="radio"
          id={USER_MANAGEMENT}
          name="downloadType"
          value={USER_MANAGEMENT}
          translate="no"
          checked={userManagement}
          onChange={handleDummyChange}
        />
        <label
          translate="no"
          htmlFor={USER_MANAGEMENT}
          onClick={() => {
            setUserManagement(true);
          }}
        >
          Пользователи{'\u00A0'}
          <DoubleArrowRight
            color={userManagement ? GREEN_COLOR : WHITE_COLOR}
          />
        </label>
      </div>
    </section>
  );
};

export default ManageUsersOrNumbers;
