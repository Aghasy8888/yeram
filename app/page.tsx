'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ServiceSection } from './components/home';
import { logout } from '@/helpers/auth';
import { useAppSelector } from '@/store/store';
import Loading from './loading';
import useHomePageEffect from '@/hooks/useHomePageEffect';
import { useWindowWidth } from '@/hooks/useWindowWidth';
import useMediaWidth from '@/hooks/useMediaWidth';
import { TechSupport } from './common';
import getDefaultValues from '@/hooks/getDefaultValues';

import styles from './page.module.scss';

function Home() {
  const navigate = useRouter();
  const windowWidth = useWindowWidth();
  const shouldRenderTechSupport = useMediaWidth(windowWidth <= 690);
  const [loading, setLoading] = useState(true);
  const showTransportSpinner = useAppSelector(
    (state) => state.transportReducer.loading
  );
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

        <button className={styles.logoutBtn} onClick={() => logout(navigate)}>
          Выйти
        </button>
      </main>
      {showTransportSpinner && <Loading />}
    </>
  );
}

export default Home;
