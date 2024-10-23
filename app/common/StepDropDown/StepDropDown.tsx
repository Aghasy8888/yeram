'use client';

import { useState } from 'react';
import stepOptions from '@/data/stepOptions';
import useCloseModal from '@/hooks/useCloseModal';
import { DownArrow } from '..';

import styles from './StepDropDownStyles.module.scss';

const StepDropDown = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(stepOptions[2]);
  const handleOptionChange = (option: IStepOption) => {
    setSelectedOption(option);
    setDropdownOpen(false);
  };
  const stepOptionComponents = stepOptions.map((option) => (
    <div
      key={option.value}
      className={`${styles.dropdownOption} ${
        selectedOption.value === option.value ? styles.active : ''
      }`}
      onClick={() => handleOptionChange(option)}
    >
      {option.label}
    </div>
  ));

  useCloseModal(dropdownOpen, setDropdownOpen);

  return (
    <button
      className={styles.dropdownCtn}
      onClick={() => setDropdownOpen(!dropdownOpen)}
    >
      <div
        className={`${styles.dropdownHeader} ${
          dropdownOpen ? styles.open : ''
        }`}
      >
        {selectedOption.label}
      </div>

      {dropdownOpen && (
        <div className={styles.dropdownOptions}>{stepOptionComponents}</div>
      )}

      <div className={styles.downArrow}>
        <DownArrow />
      </div>
    </button>
  );
};

export default StepDropDown;
