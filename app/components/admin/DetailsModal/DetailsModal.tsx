'use client';

import { memo } from 'react';

import styles from './DetailsModalStyles.module.scss';

const DetailsModal = ({
  setDetailsModalIsOpen,
  fromNotConnected,
  detailsClickHandler,
}: DetailsModalProps) => {

  return (
    <aside
      className={`${styles.detailsModal} ${
        fromNotConnected ? styles.fromNotConnected : ''
      }`}
    >
      <div className={styles.detailsButtonGroup}>
        <button className={styles.details} onClick={detailsClickHandler}>
          Подробнее
        </button>
        <button
          className={styles.turnOff}
          onClick={() => setDetailsModalIsOpen(false)}
        >
          {fromNotConnected ? 'Подключить' : 'Отключить'}
        </button>
      </div>
    </aside>
  );
};

export default memo(DetailsModal);
