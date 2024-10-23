'use client';

import { useEffect, useState } from 'react';
import { CarNumbers, LeftPanel, Navbar, PassengerTraffic } from '..';
import { TechSupport } from '@/app/common';
import { useWindowWidth } from '@/hooks/useWindowWidth';
import getDefaultValues from '@/hooks/getDefaultValues';
import useMediaWidth from '@/hooks/useMediaWidth';
import { selectOwnCompany } from '@/redux/features/company/companySlice';
import { useAppSelector } from '@/redux/hooks';

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
  const windowWidth = useWindowWidth();
  const [shouldRenderTechSupport, setShouldRenderTechSupport] = useState(false);
  const isMobile = useMediaWidth(windowWidth <= 690);
  const ownCompany: ICompany = useAppSelector(selectOwnCompany) as ICompany;

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
            {ownCompany?.name && String(ownCompany?.name)}
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
