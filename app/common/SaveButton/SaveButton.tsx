'use client';

import styles from './SaveButtonStyles.module.scss';

const SaveButton = ({
  handleSave,
  from,
}: {
  from?: string;
  handleSave: () => void;
}) => {
  const btnClassName = `save${from}Btn`;

  return (
    <div
      className={`${styles.saveBtnCtn} ${
        from === 'Transport' ? styles[btnClassName] : ''
      }`}
    >
      <button className={styles.saveBtn} onClick={handleSave}>
        Сохранить
      </button>
    </div>
  );
};

export default SaveButton;
