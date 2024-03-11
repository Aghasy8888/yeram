'use client';

import { usePathname } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { formatGosNumbers } from '@/helpers';
import { SET_NUMBER_IS_ACTIVE } from '@/store/actions/transport/transportActionTypes';
import { useAppSelector } from '@/store/store';

import styles from './TransportComponentsStyles.module.scss';

const TransportComponents = () => {
  const pathname = usePathname();
  const dispatch = useDispatch<TDispatch>();
  const transports = useAppSelector((state) => state.transportReducer.transports);
  const handleActiveStatus = (transportId: string) => {
    dispatch({ type: SET_NUMBER_IS_ACTIVE, transportId });
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
