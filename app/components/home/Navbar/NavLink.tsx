'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useWindowWidth } from '@/hooks/useWindowWidth';
import useMediaWidth from '@/hooks/useMediaWidth';
import { useAppSelector } from '@/store/store';
import { USER } from '@/data/stepConstants';

import styles from './NavbarStyles.module.scss';

const NavLink = ({
  mobileMenuActive,
  setMobileMenuActive,
  dynamicClassName,
  path,
  title
}: INavLinkProps) => {
  const userRole = useAppSelector((state) => state.authReducer.userRole);
  const windowWidth = useWindowWidth();
  const mobileScreen = useMediaWidth(windowWidth <= 690);
  const pathname = usePathname();

  return (
    <h1
      className={`${styles.link} ${dynamicClassName} ${
        pathname === path && userRole !== USER ? styles.active : ''
      }`}
    >
      <Link
        onClick={() => {
          if (mobileScreen) {
            setMobileMenuActive(!mobileMenuActive);
          }
        }}
        href={path}
        className={pathname === path && userRole !== USER ? styles.activeLink : ''}
      >
        {title}
      </Link>
      {mobileMenuActive && <hr />}
    </h1>
  );
};

export default NavLink;
