import { useAppSelector } from '@/store/store';
import { sumCameIns } from '@/helpers/helpers_2';

import styles from './TotalTransportedInfoStyles.module.scss';

const TotalTransportedInfo = () => {
  const reportData: IReportEntry[] = useAppSelector(
    (state) => state.transportReducer.reports
  );
  const dateIsSelected = useAppSelector((state) => state.otherReducer.dateIsSelected);

  return (
    <div className={styles.totalTransportedInfo}>
      <p className={styles.totalTransported}>Всего перевезено:</p>
      <p className={styles.totalTransportedCount}>
        {sumCameIns(reportData)}
      </p>
      <p className={styles.entered}>Зашедшие</p>
      {sumCameIns(reportData) === 0 && (
        <p className={styles.noDataTryAgain}>
          Данные отсутствуют, выберите другой период
        </p>
      )}
    </div>
  );
};

export default TotalTransportedInfo;
