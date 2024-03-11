'use client';

import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { SET_COMPANY_IN_DETAILS } from '@/store/actions/company/companyActionTypes';

import styles from './DetailsModalStyles.module.scss';

const DetailsModal = ({
  setDetailsModalIsOpen,
  fromNotConnected,
  companyInDetails,
}: DetailsModalProps) => {
  const dispatch = useDispatch<TDispatch>();
  const navigate = useRouter();

  const detailsClickHandler = () => {
    setDetailsModalIsOpen(false);
    localStorage.setItem('companyInDetails', JSON.stringify(companyInDetails));
    
    dispatch({ type: SET_COMPANY_IN_DETAILS, companyInDetails });
    navigate.push('/personalAccount/data');
  };

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
