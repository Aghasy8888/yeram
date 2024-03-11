import { DropDown, Ellipse } from '@/app/common';
import stepOptions from '@/data/stepOptions';
import { OnOffButtons } from '../../admin';
import { USER } from '@/data/stepConstants';
import { useAppSelector } from '@/store/store';

import styles from './TransportCardMobileStyles.module.scss';


const TransportCardMobile = ({
  transport,
  setScheduleModalIsOpen,
}: ITransportCardMobileProps) => {
  const userRole = useAppSelector((state) => state.authReducer.userRole);

  return (
    <article className={styles.transportCard}>
      <header className={styles.cardHeader}>
        <div className={styles.gosNumber}>
          <div className={styles.ellipse}>
            <Ellipse object={transport} />
          </div>

          {transport.gos_number}
        </div>
        <div className={styles.cardBody}>
          <div className={styles.transportedCtn}>
            <p className={styles.transportedCount}>200000</p>
            <DropDown name="inTransportCardStep" options={stepOptions} />
          </div>
          <OnOffButtons isUser={userRole === USER} name="MobileTransportCard" />
        </div>
      </header>
      <button
        onClick={() => setScheduleModalIsOpen(true)}
        className={styles.selectScheduleBtn}
      >
        {/* {transport?.schedule} */} schedule
      </button>
      <button className={styles.onOffBtn} disabled={userRole === USER}>
        Отключить
      </button>
    </article>
  );
};

export default TransportCardMobile;
