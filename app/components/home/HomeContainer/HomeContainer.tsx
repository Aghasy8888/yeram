'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { TechSupport } from '@/app/common';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectTransportLoading } from '@/redux/features/transport/transportSlice';
import { logout } from '@/helpers/auth';
import { useWindowWidth } from '@/hooks/useWindowWidth';

import ServiceSection from '../ServiceSection/ServiceSection';
import Loading from '@/app/loading';
import useMediaWidth from '@/hooks/useMediaWidth';
import getDefaultValues from '@/hooks/getDefaultValues';
import useHomePageEffect from '@/hooks/useHomePageEffect';

import styles from './HomeContainerStyles.module.scss';

const HomeContainer = () => {
    const navigate = useRouter();
    const dispatch = useAppDispatch();
    const windowWidth = useWindowWidth();
    const shouldRenderTechSupport = useMediaWidth(windowWidth <= 690);
    const [loading, setLoading] = useState(true);
    const showTransportSpinner = useAppSelector(selectTransportLoading);
    const { defaultStartAndEndDate, defaultStartDate, defaultEndDate } =
      getDefaultValues();
    const [startDate, setStartDate] = useState<Date | undefined>(
      defaultStartDate
    );
    const [endDate, setEndDate] = useState<Date | undefined>(defaultEndDate);
    const [startAndEndDate, setStartAndEndDate] = useState<IStartAndEndDate>(
      defaultStartAndEndDate as IStartAndEndDate
    );
  
    useHomePageEffect(setLoading);
  
    if (loading) {
      return null;
    }

  return (
    <>      
      <main className={styles.main}>
        <ServiceSection
          startAndEndDate={startAndEndDate}
          setStartAndEndDate={setStartAndEndDate}
          setStartDate={setStartDate}
          endDate={endDate}
          startDate={startDate}
          setEndDate={setEndDate}
        />

        {shouldRenderTechSupport && (
          <footer>
            <TechSupport />
          </footer>
        )}

        <button className={styles.logoutBtn} onClick={() => logout(navigate, dispatch)}>
          Выйти
        </button>
      </main>
      {showTransportSpinner && <Loading />}
    </>
  )
}

export default HomeContainer