'use client';

import { useEffect, useState } from 'react';
import { CarNumbers, LeftPanel, Navbar, PassengerTraffic } from '..';
import { useAppSelector } from '@/store/store';
import { TechSupport } from '@/app/common';
import { useWindowWidth } from '@/hooks/useWindowWidth';
import getDefaultValues from '@/hooks/getDefaultValues';
import useMediaWidth from '@/hooks/useMediaWidth';

import styles from './ServiceSectionStyles.module.scss';

const ServiceSection = ({
  endDate,
  setEndDate,
  startDate,
  setStartDate,
  startAndEndDate,
  setStartAndEndDate,
}: IServiceSectionProps) => {
  const { defaultStepValue } = getDefaultValues();
  const [stepValue, setStepValue] = useState<string>(defaultStepValue);
  const user: IUserInfo = useAppSelector((state) => state.authReducer.userInfo);
  const windowWidth = useWindowWidth();
  const [shouldRenderTechSupport, setShouldRenderTechSupport] = useState(false);
  const isMobile = useMediaWidth(windowWidth <= 690);

  useEffect(() => {
    setShouldRenderTechSupport(windowWidth > 690);
  }, [windowWidth]);

  const handleDateChange = (date: Date | undefined) => {
    const startDateWithoutTime = startDate?.setHours(0, 0, 0, 0);
    const dateWithoutTime = date?.setHours(0, 0, 0, 0);
    const dateIsLessThanStartDate =
      dateWithoutTime &&
      startDateWithoutTime &&
      startDateWithoutTime > dateWithoutTime;

    if (!startDate) {
      setStartDate(date);
    } else if (dateIsLessThanStartDate && !endDate) {
      setStartDate(date);
    } else if (!endDate) {
      setEndDate(date);
    } else {
      setStartDate(date);
      setEndDate(undefined);
    }
  };

  return (
    <section className={styles.serviceSection}>
      <div className={styles.container}>
        <LeftPanel>
          <h1 className={styles.companyTitle}>
            {user?.company_name && String(user?.company_name)}
          </h1>
          {isMobile && <Navbar />}
          <CarNumbers value={[startDate, endDate]} stepValue={stepValue} />
          {shouldRenderTechSupport && <TechSupport />}
        </LeftPanel>
        <PassengerTraffic
          startAndEndDate={startAndEndDate}
          setStartAndEndDate={setStartAndEndDate}
          onChange={handleDateChange}
          value={[startDate, endDate]}
          setStepValue={setStepValue}
          stepValue={stepValue}
        />
      </div>
    </section>
  );
};

export default ServiceSection;
