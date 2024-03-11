'use client';

import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/store/store';
import { formatDateArrayForRequest } from '@/helpers/helpers_2';
import { SET_DATE_IS_SELECTED } from '@/store/actions/other/otherActionTypes';
import { reportTransportsInfo } from '@/store/actions/transport/transportActions';
import { TransportComponents } from '..';

import styles from './CarNumbersStyles.module.scss';

export default function CarNumbers({ stepValue, value }: ICarNumbersProps) {
  const dispatch = useDispatch<TDispatch>();
  const navigate = useRouter();
  const user: IUserInfo = useAppSelector((state) => state.authReducer.userInfo);
  const transports = useAppSelector((state) => state.transportReducer.transports);
  const activeTransports: ITransport[] = transports.filter(
    (transport: ITransport) => transport.isActive
  );
  const activeTransportsIds = activeTransports.map((transport) => transport.id);
 
  const handleApply = () => {
    if(!activeTransportsIds[0]) return;
    
    let startDate;
    let endDate;
    const companyId = user?.company_id;

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

    dispatch(reportTransportsInfo(navigate, reportData, String(companyId)));
    dispatch({ type: SET_DATE_IS_SELECTED, dateIsSelected: true });
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
