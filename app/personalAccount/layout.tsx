'use client';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import useRenderIfAuthenticated from '@/hooks/useRenderIfAuthenticated';
import { LeftPanel, Navbar, TransportComponents } from '../components/home';
import { useAppSelector } from '@/store/store';
import { getTransports } from '@/store/actions/transport/transportActions';
import { getUserInfo } from '@/store/actions/user/userActions';
import { TechSupport } from '../common';
import { logout } from '@/helpers/auth';
import { useWindowWidth } from '@/hooks/useWindowWidth';
import useMediaWidth from '@/hooks/useMediaWidth';
import Loading from '../loading';
import useGetCompanyFromStorage from '@/hooks/useGetCompanyFromStorage';
import { SUPER_ADMIN, USER } from '@/data/stepConstants';
import { logo } from '@/public/assets';

import styles from './layout.module.scss';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const showAuthSpinner: boolean = useAppSelector(
    (state) => state.authReducer.loading
  );
  const showCompanySpinner = useAppSelector(
    (state) => state.transportReducer.loading
  );
  let companyInDetails: ICompany | null = useAppSelector(
    (state) => state.companyReducer.companyInDetails
  );
  const userRole = useAppSelector((state) => state.authReducer.userRole);
  const isSuperAdmin = userRole === SUPER_ADMIN;
  const navigate = useRouter();
  const dispatch = useDispatch<TDispatch>();
  const user: IUserInfo = useAppSelector((state) => state.authReducer.userInfo);
  const [loading, setLoading] = useState(true);
  const windowWidth = useWindowWidth();
  const isSmallerThan1640 = useMediaWidth(windowWidth <= 1640);
  const isMobile = useMediaWidth(windowWidth <= 690);
  const screenIsLessThan_940 = useMediaWidth(windowWidth <= 940);
  const [shouldRenderHeader, setShouldRenderHeader] = useState(false);

  useGetCompanyFromStorage(companyInDetails);

  useEffect(() => {
    setShouldRenderHeader(windowWidth > 690);
  }, [windowWidth]);

  useRenderIfAuthenticated(setLoading);

  useEffect(() => {
    if (userRole === USER) navigate.push('/');
  }, [userRole]);

  useEffect(() => {
    dispatch(getUserInfo(navigate));
  }, []);

  useEffect(() => {
    const companyId = user?.company_id;

    if (companyId) {
      dispatch(getTransports(navigate, String(companyId), undefined, true));
    }
  }, [user]);

  if (loading) {
    return null;
  }

  return (
    <>
      <main className={styles.main}>
        <div className={styles.container}>
          {screenIsLessThan_940 && (
            <>
              {isSuperAdmin ? (
                <div
                  className={`${styles.imgCtn} ${styles.screenIsLessThan_940}`}
                >
                  <Image
                    alt="logo"
                    src={logo}
                    width={isSmallerThan1640 ? (isMobile ? 320 : 160) : 250}
                    height={isSmallerThan1640 ? (isMobile ? 60 : 30) : 47.443}
                    priority
                  />
                </div>
              ) : (
                <h1
                  className={`${styles.companyTitle} ${styles.companyTitleOutside}`}
                >
                  {user?.company_name && String(user?.company_name)}
                </h1>
              )}
            </>
          )}

          <LeftPanel fromPersonalAccount>
            {isSuperAdmin ? (
              <div className={styles.imgCtn}>
                <Image
                  alt="logo"
                  src={logo}
                  width={isSmallerThan1640 ? (isMobile ? 320 : 160) : 250}
                  height={isSmallerThan1640 ? (isMobile ? 60 : 30) : 47.443}
                  priority
                />
              </div>
            ) : (
              <>
                <h1 className={styles.companyTitle}>
                  {user?.company_name && String(user?.company_name)}
                </h1>
                <TransportComponents />

                {shouldRenderHeader && <TechSupport />}
              </>
            )}
          </LeftPanel>

          <section className={styles.mainSection}>
            <Navbar fromPersonalAccount />

            {children}
          </section>

          {isMobile && (
            <footer>
              <TechSupport />
            </footer>
          )}

          <button className={styles.logoutBtn} onClick={() => logout(navigate)}>
            Выйти
          </button>
        </div>
      </main>

      {(showCompanySpinner || showAuthSpinner) && <Loading />}
    </>
  );
}
