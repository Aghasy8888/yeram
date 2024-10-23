'use client';

import styles from './SaveButtonStyles.module.scss';

const SaveButton = ({
  handleSubmit,
  from,
  saveBtnDisabled,
}: ISaveButtonProps) => {
  const btnClassName = `save${from}Btn`;

  return (
    <div
      className={`${styles.saveBtnCtn} ${
        from === 'Transport' ? styles[btnClassName] : ''
      }`}
    >
      <button
        disabled={saveBtnDisabled}
        className={styles.saveBtn}
        onClick={handleSubmit}
      >
        Сохранить
      </button>
    </div>
  );
};

export default SaveButton;
