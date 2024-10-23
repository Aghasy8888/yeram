import { sumCameIns } from '@/helpers/helpers_2';
import { useAppSelector } from '@/redux/hooks';
import { selectReports } from '@/redux/features/transport/transportSlice';

import styles from './TotalTransportedInfoStyles.module.scss';

const TotalTransportedInfo = () => {
  const reportData: IReportEntry[] = useAppSelector(selectReports);

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
