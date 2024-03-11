'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { LeftPanel, Search } from '../components/home';
import { logo } from '@/public/assets';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import useMediaWidth from '@/hooks/useMediaWidth';
import { useWindowWidth } from '@/hooks/useWindowWidth';
import useRenderIfAuthenticated from '@/hooks/useRenderIfAuthenticated';
import { logout } from '@/helpers/auth';
import useAdminEffect from '@/hooks/useAdminEffect';
import { useAppSelector } from '@/store/store';
import Loading from '../loading';

import styles from './layout.module.scss';
import { SUPER_ADMIN } from '@/data/stepConstants';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const windowWidth = useWindowWidth();
  const isSmallerThan1640 = useMediaWidth(windowWidth <= 1640);
  const isMobile = useMediaWidth(windowWidth <= 690);
  const navigate = useRouter();
  const [loading, setLoading] = useState(true);
  const showCompanySpinner = useAppSelector(
    (state) => state.companyReducer.loading
  );
  const userRole = useAppSelector((state) => state.authReducer.userRole);
  useRenderIfAuthenticated(setLoading);
  useAdminEffect();

  useEffect(() => {
    if (userRole !== SUPER_ADMIN) navigate.push('/');
  }, [userRole]);

  if (loading) {
    return null;
  }

  return (
    <>
      <main className={styles.main}>
        <div className={styles.container}>
          <LeftPanel>
            <div className={styles.imgCtn}>
              <Image
                alt="logo"
                src={logo}
                width={isSmallerThan1640 ? (isMobile ? 320 : 160) : 250}
                height={isSmallerThan1640 ? (isMobile ? 60 : 30) : 47.443}
                priority
              />
            </div>

            <div className={styles.adminLinks}>
              <Link
                href={'/adminOfConnected'}
                className={
                  pathname === '/adminOfConnected'
                    ? `${styles.activeLink} ${styles.adminLink}`
                    : styles.adminLink
                }
              >
                В работе
              </Link>

              <Link
                href={'/adminOfNotConnected'}
                className={
                  pathname === '/adminOfNotConnected'
                    ? `${styles.activeLink} ${styles.adminLink}`
                    : styles.adminLink
                }
              >
                Не подключенные
              </Link>
            </div>
          </LeftPanel>
          <div className={styles.searchAndChildCtn}>
            <div className={styles.search}>
              <Search />
            </div>
            {children}
          </div>
        </div>
        <button className={styles.logoutBtn} onClick={() => logout(navigate)}>
          Выйти
        </button>
      </main>

      {showCompanySpinner && <Loading />}
    </>
  );
}
