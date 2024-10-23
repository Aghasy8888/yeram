'use client';

import { Search } from '@/app/components/home';
import styles from './layout.module.scss';

export default function TransportsAndUsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={styles.main}>
      <div className={styles.search}>
        <Search />
      </div>
      {children}
    </main>
  );
}
