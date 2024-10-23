'use client';

import { useEffect, useState } from 'react';
import {
  ActiveCarsInfo,
  CalculatorSection,
  InfoDiagram,
  InfoTable,
  Navbar,
  SelectedPeriodSection,
} from '..';
import { useWindowWidth } from '@/hooks/useWindowWidth';

import styles from './PassengerTrafficStyles.module.scss';
import { useAppSelector } from '@/redux/hooks';
import { selectOwnCompany } from '@/redux/features/company/companySlice';

export default function PassengerTraffic({
  stepValue,
  setStepValue,
  onChange,
  value,
  setStartAndEndDate,
  startAndEndDate,
}: IPassengerTrafficProps) {
  const windowWidth = useWindowWidth();
  const [shouldRenderTechSupport, setShouldRenderTechSupport] = useState(false);
  const [tableIsOpen, setTableIsOpen] = useState(true);
  const diagramIsOpenFromStorage = localStorage.getItem('diagramIsOpen');
  const showData = (useAppSelector(selectOwnCompany) as ICompany).isactive;

  useEffect(() => {
    setShouldRenderTechSupport(windowWidth > 690);
  }, [windowWidth]);

  useEffect(() => {
    if (diagramIsOpenFromStorage) {
      setTableIsOpen(false);
    }
  }, []);

  return (
    <section className={styles.passengerTraffic}>
      {shouldRenderTechSupport && <Navbar />}
      <SelectedPeriodSection
        onChange={onChange}
        value={value}
        startAndEndDate={startAndEndDate}
        setStartAndEndDate={setStartAndEndDate}
        tableIsOpen={tableIsOpen}
        setStepValue={setStepValue}
        stepValue={stepValue}
        setTableIsOpen={setTableIsOpen}
      />
      <CalculatorSection />
      {showData ? (
        <>
          {tableIsOpen ? <InfoTable /> : <InfoDiagram />}
          <ActiveCarsInfo
            stepValue={stepValue}
            value={value}
            startAndEndDate={startAndEndDate}
          />
        </>
      ) : (
        <p className={styles.noData}>Данных о перевозках нет</p>
      )}
    </section>
  );
}
