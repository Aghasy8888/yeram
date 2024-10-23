import { useRouter } from 'next/navigation';
import { DropDown, Ellipse } from '@/app/common';
import stepOptions from '@/data/stepOptions';
import { OnOffButtons } from '../../admin';
import { USER } from '@/data/stepConstants';
import { selectUserRole } from '@/redux/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getDisplayOrDataEditRqBody } from '@/helpers/helpers_6';

import styles from './TransportCardMobileStyles.module.scss';
import { editTransport } from '@/redux/features/transport/transportService';
import { selectCompanyInDetails } from '@/redux/features/company/companySlice';

const TransportCardMobile = ({
  transport,
  onSetSchedule,
  onSetReportStep,
  scheduleForShow,
}: ITransportCardMobileProps) => {
  const userRole = useAppSelector(selectUserRole);
  const dispatch = useAppDispatch();
  const navigate = useRouter();
  const companyInDetails = useAppSelector(selectCompanyInDetails) as ICompany;

  const onDataOrDisplayClick = (checked: boolean, info: string) => {
    const requestBody = getDisplayOrDataEditRqBody(info, checked);

    dispatch(
      editTransport({
        dispatch,
        navigate,
        company_id: companyInDetails.id,
        transport_id: transport.id,
        requestBody,
      })
    );
  };

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
            <p className={styles.transportedCount}>{transport?.totalCameIns}</p>
            <DropDown
              makeTheChange={onSetReportStep}
              name="inTransportCardStep"
              options={stepOptions}
            />
          </div>
          <OnOffButtons
            dataChecked={Boolean(transport.islock)}
            displayChecked={transport.isactive}
            onChange={onDataOrDisplayClick}
            isUser={userRole === USER}
            name="MobileTransportCard"
          />
        </div>
      </header>
      <button
        onClick={() => onSetSchedule(transport)}
        className={styles.selectScheduleBtn}
      >
        {scheduleForShow[0] ? scheduleForShow : '-'}
      </button>
      <button className={styles.onOffBtn} disabled={userRole === USER}>
        Отключить
      </button>
    </article>
  );
};

export default TransportCardMobile;
