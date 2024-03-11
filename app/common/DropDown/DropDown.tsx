'use client';

import { useState } from 'react';
import useCloseModal from '@/hooks/useCloseModal';
import { DownArrow } from '..';

import styles from './DropDownStyles.module.scss';

const DropDown = ({ options, name }: IDropDownProps) => {
  const className = `${name}Dropdown`;

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const handleOptionChange = (option: IDropDownOption) => {
    setSelectedOption(option);
    setDropdownOpen(false);
  };
  const optionComponents = options.map((option) => (
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

  useCloseModal(dropdownOpen, setDropdownOpen, 'dialog');

  return (
    <div
      role="button"
      tabIndex={0}
      aria-expanded={dropdownOpen ? 'true' : 'false'}
      className={`${styles.dropdownCtn} ${styles[className]}`}
      onClick={() => setDropdownOpen(!dropdownOpen)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          setDropdownOpen(!dropdownOpen);
          event.preventDefault(); 
        }
      }}
    >
      <div
        className={`${styles.dropdownHeader} ${
          dropdownOpen ? styles.open : ''
        }`}
      >
        {selectedOption.label}
      </div>

      {dropdownOpen && (
        <dialog className={styles.dropdownOptions}>{optionComponents}</dialog>
      )}

      <div className={styles.downArrow}>
        <DownArrow />
      </div>
    </div>
  );
};

export default DropDown;
