'use client';

import { useState } from 'react';
import useCloseModal from '@/hooks/useCloseModal';
import { DownArrow } from '..';

import styles from './DropDownStyles.module.scss';

const DropDown = ({
  options,
  name,
  initiallySelectedOption = options[0],
  makeTheChange,
  disabled,
}: IDropDownProps) => {
  const className = `${name}Dropdown`;
  if (!initiallySelectedOption) initiallySelectedOption = options[0];

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(initiallySelectedOption);
  const handleOptionChange = (option: IDropDownOption) => {
    makeTheChange && makeTheChange(option);
    setSelectedOption(option);
    setDropdownOpen(false);
  };

  const optionComponents = options.map((option) => (
    <div
      key={option.value}
      className={`${styles.dropdownOption} ${
        selectedOption?.value === option.value ? styles.active : ''
      }`}
      onClick={() => handleOptionChange(option)}
    >
      {option.label}
    </div>
  ));

  useCloseModal(dropdownOpen, setDropdownOpen, 'dialog');

  const handleDropdownOpenState = () => {
    if (disabled) return;
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-expanded={dropdownOpen ? 'true' : 'false'}
      className={`${styles.dropdownCtn} ${styles[className]} ${
        disabled ? styles.disabled : ''
      }`}
      onClick={handleDropdownOpenState}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          handleDropdownOpenState();
          event.preventDefault();
        }
      }}
    >
      <div
        className={`${styles.dropdownHeader} ${
          dropdownOpen ? styles.open : ''
        }`}
      >
        {selectedOption?.label}
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
