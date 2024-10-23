'use client';

import { useRouter } from 'next/navigation';
import { formatDateArrayForRequest } from '@/helpers/helpers_2';
import { reportTransportsInfo } from '@/redux/features/transport/transportService';
import { TransportComponents } from '..';
import { selectTransports } from '@/redux/features/transport/transportSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectUserInfo } from '@/redux/features/auth/authSlice';

import styles from './CarNumbersStyles.module.scss';

export default function CarNumbers({ stepValue, value }: ICarNumbersProps) {
  const dispatch = useAppDispatch();
  const navigate = useRouter();
  const user: IUserInfo | null | undefined = useAppSelector(selectUserInfo);
  const transports = useAppSelector(selectTransports);
  const activeTransports: ITransport[] = transports.filter(
    (transport: ITransport) => transport.isActive && transport.isactive
  );
  const activeTransportsIds = activeTransports.map((transport) => transport.id);

  const handleApply = () => {
    if (!activeTransportsIds[0]) return;

    let startDate;
    let endDate;
    const companyId = user?.company;

    const dateArrayForRequest = formatDateArrayForRequest(
      value[1] ? (value as Date[]) : (value[0] as Date)
    );

    if (dateArrayForRequest) {
      const [start, end] = dateArrayForRequest;
      startDate = start;
      endDate = end;
    }

    const reportData = {
      transport: [...activeTransportsIds],
      start: startDate, //example '2023-11-26 0'
      end: (endDate as { forRequest: string })?.forRequest, //example '2023-11-26 0'
      report_type: stepValue,
    };

    // localStorage.setItem('reportData', JSON.stringify(reportData));

    dispatch(
      reportTransportsInfo({
        dispatch,
        navigate,
        company_id: String(companyId),
        data: reportData,
      })
    );
  };

  return (
    <>
      <div className={styles.carNumbers} translate="no">
        <TransportComponents />
      </div>
      <button className={styles.applyBtn} onClick={handleApply}>
        Применить
      </button>
    </>
  );
}
