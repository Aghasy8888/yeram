import { ReactNode } from 'react';

import styles from './LeftPanelStyles.module.scss';

export default function LeftPanel({
  children,
  fromPersonalAccount,
}: {
  children: ReactNode;
  fromPersonalAccount?: boolean;
}) {
  return (
    <section
      className={`${styles.leftPanel} ${
        fromPersonalAccount ? styles.fromPersonalAccount : ''
      }`}
    >
      <div className={styles.container}>{children}</div>
    </section>
  );
}
