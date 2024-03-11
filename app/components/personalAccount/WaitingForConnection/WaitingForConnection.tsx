'use client';

import waitingTransports from '@/data/temporary/waitingTransports';
import { WaitingTransport } from '..';
import { useAppSelector } from '@/store/store';

import styles from './WaitingForConnectionStyles.module.scss';

const WaitingForConnection = () => {
  let unActiveTransports: ITransportFromBack[] | [] = useAppSelector(
    (state) => state.companyReducer.unActiveTransports
  );
  
  unActiveTransports = [
    {
      channels: 'CH1 CH2 CH3 CH4',
      gos_number: '4462211208',
      id: '4462211208',
      isactive: false,
    },
  ];

  const waitingTransportComponents = unActiveTransports.map(
    (transport, index) => (
      <WaitingTransport
        lastChild={index === unActiveTransports.length - 1}
        key={transport.gos_number}
        transport={transport}
      />
    )
  );

  return (
    <section className={styles.waitingForConnection}>
      <h3 className={styles.title}>Ожидают подключения</h3>
      {waitingTransportComponents}
    </section>
  );
};

export default WaitingForConnection;
