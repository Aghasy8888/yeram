'use client';

import { usePathname } from 'next/navigation';
import { formatGosNumbers } from '@/helpers';
import {
  selectTransports,
  setNumberIsActive,
} from '@/redux/features/transport/transportSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

import styles from './TransportComponentsStyles.module.scss';

const TransportComponents = () => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const transports = useAppSelector(selectTransports);
  const handleActiveStatus = (transportId: string) => {
    dispatch(setNumberIsActive(transportId));
  };

  const transportComponents = transports?.map(
    (transport: ITransport, index: number) => (
      <div
        translate="no"
        key={transport?.gos_number ? transport?.gos_number : index}
        className={`${styles.carNumber} ${
          transport.isActive || pathname !== '/' ? styles.active : ''
        }`}
      >
        <div className={styles.gosNumberCtn}>
          <h3>{formatGosNumbers(transport.gos_number)}</h3>
        </div>

        <button
          className={styles.plusOrMinus}
          onClick={() => handleActiveStatus(transport.id)}
        >
          {pathname === '/' ? (transport.isActive ? '-' : '+') : ''}
        </button>
      </div>
    )
  );

  return (
    <div className={styles.carNumbers} translate="no">
      {transportComponents}
    </div>
  );
};

export default TransportComponents;
