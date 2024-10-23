'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { closeBtn } from '@/public/assets';
import { Checkbox } from '@/app/common';
import schedulePeriods from '@/data/schedulePeriod';
import { editTransport } from '@/redux/features/transport/transportService';
import {
  getActivePeriods,
  processPeriodsForRequest,
} from '@/helpers/helpers_6';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectOwnCompany } from '@/redux/features/company/companySlice';

import styles from './ScheduleModalStyles.module.scss';

interface IScheduleModalProps extends IAddUserModalProps {
  transport: ITransportFromBack | null;
}

const ScheduleModal = ({ setModalIsOpen, transport }: IScheduleModalProps) => {
  const navigate = useRouter();
  const dispatch = useAppDispatch();
  const [activePeriods, setActivePeriods] = useState<number[]>(
    getActivePeriods(transport?.time_table as ISchedule[])
  );
  const ownCompany: ICompany = useAppSelector(selectOwnCompany) as ICompany;

  const handleApply = () => {
    if (!transport?.id) return;

    const time_table = processPeriodsForRequest(activePeriods);

    const requestBody = {
      gos_number: transport.gos_number,
      id: transport.id,
      channels: transport.channels,
      time_table,
    };

    dispatch(
      editTransport({
        dispatch,
        navigate,
        company_id: ownCompany.id,
        transport_id: transport.id,
        requestBody,
      })
    );
    setModalIsOpen(false);
  };

  const schedulePeriodsComponents = schedulePeriods.map((period, index) => {
    const periodIsActive = activePeriods?.includes(index);

    return (
      <tr key={index}>
        <td className={`${styles.column} ${styles.start}`}>{period.start}</td>

        <td className={`${styles.column} ${styles.end}`}>{period.end}</td>

        <td className={`${styles.column} ${styles.connection}`}>
          <Checkbox
            activePeriods={activePeriods}
            index={index}
            setActivePeriods={setActivePeriods}
            defaultChecked={periodIsActive}
          />
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
                <tbody>{schedulePeriodsComponents}</tbody>
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
