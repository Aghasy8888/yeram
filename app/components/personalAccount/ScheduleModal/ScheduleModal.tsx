'use client';

import Image from 'next/image';
import { closeBtn } from '@/public/assets';
import { Checkbox } from '@/app/common';
import schedulePeriods from '@/data/schedulePeriod';
import { useState } from 'react';

import styles from './ScheduleModalStyles.module.scss';

const ScheduleModal = ({ setModalIsOpen }: IAddUserModalProps) => {
  const [checked, setChecked] = useState(false);
  const handleApply = () => {
    setModalIsOpen(false);
  };

  const transportComponents = schedulePeriods.map((period, index) => {

    return (
      <tr key={index}>
        <td className={`${styles.column} ${styles.start}`}>{period.start}</td>

        <td className={`${styles.column} ${styles.end}`}>{period.end}</td>

        <td className={`${styles.column} ${styles.connection}`}>
          <Checkbox />
        </td>
      </tr>
    );
  });

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalCustom}>
        <aside className={styles.scheduleModal}>
          <button
            className={styles.closeBtn}
            onClick={() => setModalIsOpen(false)}
          >
            <Image
              alt="closeBtn"
              src={closeBtn}
              width={19.5}
              height={19.5}
              priority
            />
          </button>

          <h2 className={styles.title}>График работы</h2>

          <main className={styles.main}>
            <p>Укажите график работы водителя этого ТС</p>

            <section className={styles.tableCtn}>
              <table className={styles.table}>
                <tbody>{transportComponents}</tbody>
              </table>
            </section>

            <button className={styles.applyBtn} onClick={handleApply}>
              Применить
            </button>
          </main>
        </aside>
      </div>
    </div>
  );
};

export default ScheduleModal;
