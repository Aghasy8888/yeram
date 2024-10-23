'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import useRenderIfAuthenticated from '@/hooks/useRenderIfAuthenticated';
import { LeftPanel, Navbar, TransportComponents } from '../components/home';
import { getTransports } from '@/redux/features/transport/transportService';
import { getUserInfo } from '@/redux/features/auth/userService';
import { TechSupport } from '../common';
import { logout } from '@/helpers/auth';
import { useWindowWidth } from '@/hooks/useWindowWidth';
import useMediaWidth from '@/hooks/useMediaWidth';
import Loading from '../loading';
import useGetCompanyFromStorage from '@/hooks/useGetCompanyFromStorage';
import { SUPER_ADMIN, USER } from '@/data/stepConstants';
import { logo } from '@/public/assets';
import useGetOwnCompany from '@/hooks/useGetOwnCompany';
import {
  selectAuthLoading,
  selectUserInfo,
  selectUserRole,
} from '@/redux/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  selectCompanyLoading,
  selectOwnCompany,
} from '@/redux/features/company/companySlice';

import styles from './layout.module.scss';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const showAuthSpinner = useAppSelector(selectAuthLoading);
  const user: IUserInfo | null | undefined = useAppSelector(selectUserInfo);
  const showCompanySpinner = useAppSelector(selectCompanyLoading);
  const userRole = useAppSelector(selectUserRole);
  const isSuperAdmin = userRole === SUPER_ADMIN;
  const navigate = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const windowWidth = useWindowWidth();
  const isSmallerThan1640 = useMediaWidth(windowWidth <= 1640);
  const isMobile = useMediaWidth(windowWidth <= 690);
  const screenIsLessThan_940 = useMediaWidth(windowWidth <= 940);
  const [shouldRenderHeader, setShouldRenderHeader] = useState(false);
  const ownCompany: ICompany = useAppSelector(selectOwnCompany) as ICompany;

  useGetOwnCompany();
  useGetCompanyFromStorage();

  useEffect(() => {
    setShouldRenderHeader(windowWidth > 690);
  }, [windowWidth]);

  useRenderIfAuthenticated(setLoading);

  useEffect(() => {
    if (userRole === USER) {
      navigate.push('/');
    }
  }, [userRole]);

  useEffect(() => {
    dispatch(getUserInfo({ navigate, dispatch }));
  }, []);

  useEffect(() => {
    const companyId = user?.company;

    if (companyId) {
      dispatch(
        getTransports({
          navigate,
          company_id: String(companyId),
          parsedData: undefined,
          fromPersonalAccount: true,
          dispatch
        })
      );
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
                  {ownCompany?.name && String(ownCompany?.name)}
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
                  {ownCompany?.name && String(ownCompany?.name)}
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

          <button className={styles.logoutBtn} onClick={() => logout(navigate, dispatch)}>
            Выйти
          </button>
        </div>
      </main>

      {(showCompanySpinner || showAuthSpinner) && <Loading />}
    </>
  );
}
