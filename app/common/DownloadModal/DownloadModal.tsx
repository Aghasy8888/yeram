'use client';

import {
  PDF,
  XLS,
  CSV,
  csvForRequest,
  xlsForRequest,
  pdfForRequest,
} from '../../../data/stepConstants';
import { reportDownload } from '@/redux/features/transport/transportService';
import { useRouter } from 'next/navigation';
import { getStartAndEndDates } from '@/helpers/helpers_2';
import { RadioButton } from '..';
import { selectSubmittedTransports } from '@/redux/features/transport/transportSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectUserInfo } from '@/redux/features/auth/authSlice';

import styles from './DownloadModalStyles.module.scss';

const DownloadModal = ({
  setDownloadModalIsOpen,
  fromActiveCar,
  value,
  stepValue,
  transportId,
}: DownloadModalProps) => {
  const dispatch = useAppDispatch();
  const navigate = useRouter();
  const user: IUserInfo | null | undefined = useAppSelector(selectUserInfo);
  const companyId = user?.company;
  const submittedTransports: ITransport[] = useAppSelector(
    selectSubmittedTransports
  );
  const submittedTransportIds = submittedTransports.map(
    (transport) => transport.id
  );

  const { startDate, endDate } = getStartAndEndDates(
    (value as Date[])[1] ? (value as Date[]) : ((value as Date[])[0] as Date)
  );

  const handleDownload = (event: TMouseEvent, fileType: string) => {
    
    dispatch(
      reportDownload({
        dispatch,
        company_id: String(companyId),
        fileType,
        end: (endDate as { forRequest: string })?.forRequest,
        navigate,
        report_type: stepValue as string,
        start: startDate as string,
        transport: fromActiveCar
          ? [transportId as string]
          : submittedTransportIds,
      })
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
