import { SUPER_ADMIN } from '@/data/stepConstants';
import { selectUserRole } from '@/redux/features/auth/authSlice';
import { useAppSelector } from '@/redux/hooks';

import styles from './WaitingTransportStyles.module.scss';

const WaitingTransport = ({
  transport,
  lastChild,
}: {
  transport: ITransportFromBack;
  lastChild: boolean;
}) => {
  const userRole = useAppSelector(selectUserRole);

  return (
    <article
      className={`${lastChild ? styles.lastChild : ''} ${
        styles.waitingTransport
      } ${userRole !== SUPER_ADMIN ? styles.userVersion : ''}`}
    >
      <div className={styles.gosNumber}>{transport.gos_number}</div>
      {userRole === SUPER_ADMIN && (
        <button className={styles.onOffBtn}>Подключить</button>
      )}
      <div className={styles.connectionDate}>
        {/* {transport.connectionDate} */} (от date)
      </div>
    </article>
  );
};

export default WaitingTransport;
