import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectUserRole } from '@/redux/features/auth/authSlice';
import { selectCompanyInDetails } from '@/redux/features/company/companySlice';
import { SUPER_ADMIN } from '@/data/stepConstants';

import styles from './WaitingForConnectionStyles.module.scss';
import { editTransport } from '@/redux/features/transport/transportService';

const WaitingForConnection = () => {
  const dispatch = useAppDispatch();
  const navigate = useRouter();
  const userRole = useAppSelector(selectUserRole);
  const company: ICompany = useAppSelector(selectCompanyInDetails) as ICompany;
  let transports: ITransportFromBack[] = company?.transports?.filter(
    (t) => !t.confirmed
  );

  const onConfirm = (transport_id: string) => {
    const requestBody = {
      confirmed: true,
    };

    dispatch(
      editTransport({
        dispatch,
        navigate,
        company_id: company.id,
        transport_id,
        requestBody,
      })
    );
  };

  return (
    <section className={styles.waitingForConnection}>
      <h3 className={styles.title}>Ожидают подключения</h3>
      {transports?.map((transport, index) => (
        <article
          key={transport.id}
          className={`${
            index === transports.length - 1 ? styles.lastChild : ''
          } ${styles.waitingTransport} ${
            userRole !== SUPER_ADMIN ? styles.userVersion : ''
          }`}
        >
          <div className={styles.gosNumber}>{transport.gos_number}</div>
          {userRole === SUPER_ADMIN && (
            <button onClick={() => onConfirm(transport.id)} className={styles.onOffBtn}>
              Подключить
            </button>
          )}
          <div className={styles.connectionDate}>
            {/* {transport.connectionDate} */} (от date)
          </div>
        </article>
      ))}
    </section>
  );
};

export default WaitingForConnection;
