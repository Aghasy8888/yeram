'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { setClassNameByPathname } from '@/helpers/helpers_4';
import { NavLink, OpenMobileMenuBtn } from '..';
import { SUPER_ADMIN, USER } from '@/data/stepConstants';
import { goBackBtn } from '@/public/assets';
import { selectUserRole } from '@/redux/features/auth/authSlice';
import { useAppSelector } from '@/redux/hooks';

import styles from './NavbarStyles.module.scss';

export default function Navbar({
  fromPersonalAccount,
}: {
  fromPersonalAccount?: boolean;
}) {
  const navigate = useRouter();
  const userRole = useAppSelector(selectUserRole);
  const isSuperAdmin = userRole === SUPER_ADMIN;
  const isUser = userRole === USER;
  const pathname = usePathname();
  const [mobileMenuActive, setMobileMenuActive] = useState(false);

  const goBack = () => {
    navigate.push('/adminOfConnected')
  };

  return (
    <nav
      className={`${styles.nav} ${isSuperAdmin ? styles.isSuperAdmin : ''} ${
        isUser ? styles.isUser : ''
      }`}
    >
      <div
        className={`${styles.container} ${setClassNameByPathname(
          pathname,
          styles
        )}`}
      >
        <OpenMobileMenuBtn
          fromPersonalAccount={fromPersonalAccount}
          mobileMenuActive={mobileMenuActive}
          setMobileMenuActive={setMobileMenuActive}
        />

        <div
          className={`${styles.linksCtn} ${
            mobileMenuActive ? styles.mobileMenuActive : ''
          } ${fromPersonalAccount ? styles.fromPersonalAccount : ''}`}
        >
          {!isSuperAdmin ? (
            <NavLink
              dynamicClassName={styles.passengers}
              mobileMenuActive={mobileMenuActive}
              setMobileMenuActive={setMobileMenuActive}
              path="/"
              title="Пассажиропоток"
            />
          ) : (
            <button className={styles.goBackBtn} onClick={goBack}>
              <Image
                alt="goBackBtn"
                src={goBackBtn}
                width={14}
                height={23}
                priority
              />
            </button>
          )}

          {userRole !== USER && (
            <>
              <NavLink
                dynamicClassName={styles.data}
                mobileMenuActive={mobileMenuActive}
                setMobileMenuActive={setMobileMenuActive}
                path="/personalAccount/data"
                title="Данные"
              />

              <NavLink
                dynamicClassName={styles.transports}
                mobileMenuActive={mobileMenuActive}
                setMobileMenuActive={setMobileMenuActive}
                path="/personalAccount/transports"
                title="ТС"
              />

              <NavLink
                dynamicClassName={styles.users}
                mobileMenuActive={mobileMenuActive}
                setMobileMenuActive={setMobileMenuActive}
                path="/personalAccount/users"
                title="Пользователи"
              />
            </>
          )}
        </div>

        {!mobileMenuActive && <hr />}
      </div>
    </nav>
  );
}
