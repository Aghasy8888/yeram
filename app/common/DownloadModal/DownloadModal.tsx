'use client';

import { useDispatch } from 'react-redux';
import {
  PDF,
  XLS,
  CSV,
  csvForRequest,
  xlsForRequest,
  pdfForRequest,
} from '../../../data/stepConstants';
import { reportDownload } from '@/store/actions/transport/transportActions';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/store/store';
import { getStartAndEndDates } from '@/helpers/helpers_2';
import { RadioButton } from '..';

import styles from './DownloadModalStyles.module.scss';

const DownloadModal = ({
  setDownloadModalIsOpen,
  fromActiveCar,
  value,
  stepValue,
  transportId,
}: DownloadModalProps) => {
  const dispatch = useDispatch<TDispatch>();
  const navigate = useRouter();
  const user: IUserInfo = useAppSelector((state) => state.authReducer.userInfo);
  const companyId = user?.company_id;
  const submittedTransports: ITransport[] = useAppSelector(
    (state) => state.transportReducer.submittedTransports
  );
  const submittedTransportIds = submittedTransports.map(
    (transport) => transport.id
  );

  const { startDate, endDate } = getStartAndEndDates(
    (value as Date[])[1] ? (value as Date[]) : ((value as Date[])[0] as Date)
  );

  const handleDownload = (event: TMouseEvent, fileType: string) => {
    dispatch(
      reportDownload(
        navigate,
        String(companyId),
        startDate as string,
        (endDate as { forRequest: string })?.forRequest,
        stepValue as string,
        fileType,
        fromActiveCar ? [transportId as string] : submittedTransportIds
      )
    );
    event.stopPropagation();
    setDownloadModalIsOpen(false);
  };

  return (
    <aside
      className={`${styles.downloadModal} ${
        fromActiveCar && styles.fromActiveCar
      }`}
    >
      <form className={styles.form}>
        <RadioButton
          id={XLS}
          handleDownload={handleDownload}
          name={'downloadType'}
          nameForRequest={xlsForRequest}
        />

        <RadioButton
          id={CSV}
          handleDownload={handleDownload}
          name={'downloadType'}
          nameForRequest={csvForRequest}
        />

        <RadioButton
          id={PDF}
          handleDownload={handleDownload}
          name={'downloadType'}
          nameForRequest={pdfForRequest}
        />
      </form>
    </aside>
  );
};

export default DownloadModal;
