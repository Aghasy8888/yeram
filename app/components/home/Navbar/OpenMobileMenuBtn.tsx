'use client';

import Image from 'next/image';
import { threeDots } from '@/public/assets';
import { useWindowWidth } from '@/hooks/useWindowWidth';
import useMediaWidth from '@/hooks/useMediaWidth';

import styles from './NavbarStyles.module.scss';


const OpenMobileMenuBtn = ({
  mobileMenuActive,
  setMobileMenuActive,
  fromPersonalAccount,
}: IOpenMobileMenuBtnProps) => {
  const windowWidth = useWindowWidth();
  const mobileScreen = useMediaWidth(windowWidth <= 690);

  return (
    <button
      className={styles.openMobileMenuBtn}
      onClick={() => {
        if (mobileScreen) {
          setMobileMenuActive(!mobileMenuActive);
        }
      }}
    >
      <Image
        alt="threeDots"
        src={threeDots}
        width={25}
        height={7}
        className={`${styles.threeDots} ${
          fromPersonalAccount ? styles.fromPersonalAccount : ''
        }`}
        priority
      />
    </button>
  );
};

export default OpenMobileMenuBtn;
