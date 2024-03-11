'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { CalendarSection, Steps } from '..';
import { reportTransportsInfo } from '@/store/actions/transport/transportActions';
import { useAppSelector } from '@/store/store';
import { formatDateRussian, getStartAndEndDates } from '@/helpers/helpers_2';
import * as constants from '@/data/stepConstants';
import {
  SET_DATE_IS_SELECTED,
  SET_SHORTENED_SELECTED_PERIOD,
} from '@/store/actions/other/otherActionTypes';
import { englishStepToRussian } from '@/helpers';
import { closeXBtn } from '@/public/assets';
import useDisableSteps from '@/hooks/useDisableSteps';

import styles from './DateModalStyle.module.scss';

const DateModal = ({
  setModalIsOpen,
  onChange,
  value,
  stepValue,
  setStepValue,
  setStartAndEndDate,
  disabledSteps,
  setDisabledSteps,
}: IDateModalProps) => {
  const navigate = useRouter();
  const dispatch = useDispatch<TDispatch>();
  const transports = useAppSelector((state) => state.transportReducer.transports);
  const user: IUserInfo = useAppSelector((state) => state.authReducer.userInfo);
  const activeTransports: ITransport[] = transports.filter(
    (transport: ITransport) => transport.isActive
  );
  const activeTransportsIds = activeTransports.map((transport) => transport.id);

  useDisableSteps(setDisabledSteps, value);

  useEffect(() => {
    setTimeout(() => {
      setStepValue(stepValue);
    }, 0);
  }, []);

  const handleApply = () => {
    if(!activeTransportsIds[0]) return;
    const companyId = user?.company_id;
    const { startDate, endDate } = getStartAndEndDates(
      value[1] ? (value as Date[]) : (value[0] as Date)
    );

    setStartAndEndDate({
      start: formatDateRussian(startDate as string),
      end: value[1]
        ? formatDateRussian((endDate as { forShow: string })?.forShow)
        : undefined,
    });

    const reportData = {
      transport: [...activeTransportsIds],
      start: startDate, //example '2023-11-26 0'
      end: (endDate as { forRequest: string })?.forRequest, //example '2023-11-26 0'
      report_type: stepValue,
    };

    // localStorage.setItem('reportData', JSON.stringify(reportData));

    dispatch(reportTransportsInfo(navigate, reportData, String(companyId)));
    dispatch({ type: SET_DATE_IS_SELECTED, dateIsSelected: true });
    let shortenedPeriodSelected = englishStepToRussian(
      reportData.report_type
    ).slice(0, 3);
    if (reportData.report_type === constants.DAYS)
      shortenedPeriodSelected = constants.shortDay;
    dispatch({
      type: SET_SHORTENED_SELECTED_PERIOD,
      shortenedPeriodSelected,
    });

    setModalIsOpen(false);
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalCustom}>
        <aside className={styles.dateModal}>
          <button
            className={styles.closeXBtn}
            onClick={() => setModalIsOpen(false)}
          >
            <Image
              src={closeXBtn}
              alt={'closeXBtn'}
              width={30}
              height={30}
              priority={true}
            />
          </button>
          <CalendarSection onChange={onChange} value={value} />
          <Steps
            disabledSteps={disabledSteps}
            stepValue={stepValue}
            setStepValue={setStepValue}
          />
          <div className={styles.applyBtnCtn}>
            <button className={styles.applyBtn} onClick={handleApply}>
              Применить
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default DateModal;
